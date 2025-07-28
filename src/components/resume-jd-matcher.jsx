'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Zap, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"


export function ResumeJdMatcher({ setData }) {
  const { toast } = useToast()
  const router = useRouter()
  const [file, setFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!file || !jobDescription) {
      setIsLoading(false);
      alert('Please upload a resume and provide a job description.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error processing the file');
      }

      const result = await response.json();
      setData(result);
      if (result) {
        router.replace('/match')
      }


    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || 'An error occurred while processing your request.');
        toast({
          title: 'An error occurred while processing your request.',
          description: error.message,
        })
      } else {
        toast({
          title: 'An error occurred while processing your request.',
          description: 'An error occurred while processing your request.',
        })
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">ResuMatch AI</span>
          </div>   
        </div>
      </motion.header>

      <main className="flex-grow p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-2">AI Resume Matcher</h1>
          <p className="text-xl text-center mb-8 text-gray-600">
            Upload your resume and enter a job description to see how well they match!
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Resume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF (MAX. 5MB)</p>
                      </div>
                      <Input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.docx"
                      />
                    </label>
                  </div>
                  {file && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 text-sm text-gray-500 flex items-center"
                    >
                      <FileText className="mr-2" size={16} />
                      {file.name}
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Paste the job description here..."
                    className="w-full h-64 resize-none"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                size="lg"
                disabled={!file || !jobDescription || isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                  </motion.div>
                ) : (
                  <Zap className="mr-2 h-4 w-4" />
                )}
                {isLoading ? "Analyzing..." : "Match Resume"}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>

      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">ResuMatch AI</h2>
              <p className="text-gray-600">Empowering your job search with AI</p>
            </div>
            <div className="flex space-x-6">
              <Link href="https://github.com/vivekshs07" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </Link>
              <Link href="https://www.linkedin.com/in/vivek-singh-sisodiya-b7392a273?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2023 ResuMatch AI. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}