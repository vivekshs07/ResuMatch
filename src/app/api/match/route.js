import {
  AzureKeyCredential,
  DocumentAnalysisClient,
} from "@azure/ai-form-recognizer";
import { Readable } from "stream";
import { AzureOpenAI } from "openai";

// -----------------------------
// Cosine Similarity Function
// -----------------------------
const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a ** 2, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b ** 2, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

// -----------------------------
// Embedding Function (Azure OpenAI)
// -----------------------------
const em = async (text) => {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_API_KEY;
  const apiVersion = "2024-04-01-preview";
  const deployment = "text-embedding-3-small";
  const modelName = "text-embedding-3-small";

  const client = new AzureOpenAI({ endpoint, apiKey, deployment, apiVersion });

  const response = await client.embeddings.create({
    input: text,
    model: modelName,
  });
  return response?.data[0].embedding;
};

// -----------------------------
// Gemini Completion Function
// -----------------------------


async function gpt(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to call Gemini API");
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

// -----------------------------
// Azure Form Recognizer Setup
// -----------------------------
const formRecognizerEndpoint = process.env.FORM_RECOGNIZER_ENDPOINT;
const formRecognizerApiKey = process.env.FORM_RECOGNIZER_API_KEY;

const formRecognizerClient = new DocumentAnalysisClient(
  formRecognizerEndpoint,
  new AzureKeyCredential(formRecognizerApiKey)
);

// -----------------------------
// Extract Text from File
// -----------------------------
async function extractTextFromFile(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const stream = new Readable();
  stream._read = () => { };
  stream.push(buffer);
  stream.push(null);

  const poller = await formRecognizerClient.beginAnalyzeDocument(
    "prebuilt-read",
    stream
  );
  const result = await poller.pollUntilDone();

  if (!result || !result.content) {
    throw new Error("Failed to extract text from resume.");
  }

  return result.content;
}

function stripCodeFence(text) {
  return text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();
}
// -----------------------------
// Main API Route Handler
// -----------------------------
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const jobDescription = formData.get("jobDescription");

    if (!file || !jobDescription) {
      return new Response(
        JSON.stringify({ error: "File and JD are required." }),
        { status: 400 }
      );
    }

    // 1. Extract full resume text
    const resumeText = await extractTextFromFile(file);

    // 2. Compute embeddings & similarity
    const resumeEmbedding = await em(resumeText);
    const jdEmbedding = await em(jobDescription);
    const similarity = cosineSimilarity(resumeEmbedding, jdEmbedding);
    const similarityScore = (similarity * 100).toFixed(2);

    // 3. Compose prompt for Gemini
    const systemPrompt = `
You are an expert AI specializing in resume and job description matching. 
You will receive a parsed resume (in structured JSON format), the full job description text, and a similarity score (computed from embeddings).
Generate a JSON report as follows:
{
  "match_score": (0-100),
  "summary": "Brief explanation of the match.",
  "missing_criteria": ["Skill1", "Skill2"],
  "strengths": ["Skill3", "Skill4"],
  "suggested_resume_improvements": ["Improvement1", "Improvement2"]
}
`;

    const userPrompt = `
Parsed Resume JSON: ${resumeText}
Job Description: ${jobDescription}
Similarity Score: ${similarityScore}
`;

    const combinedPrompt = `
${systemPrompt.trim()}

${userPrompt.trim()}
`;

    // 4. Call Gemini to get report
    const rawGptResponse = await gpt(combinedPrompt);
    const cleanedJson = stripCodeFence(rawGptResponse);

    let parsed;
    try {
      parsed = JSON.parse(cleanedJson);
    } catch (err) {
      console.error("Invalid JSON from Gemini:", cleanedJson);
      return new Response(
        JSON.stringify({ error: "Gemini returned invalid JSON." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(parsed),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in resume match handler:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error." }),
      { status: 500 }
    );
  }
}

