import "./globals.css";
import { DataProvider } from "./context/Datacontext";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          {children}
        </DataProvider>
        <Toaster />
      </body>
    </html>
  );
}
