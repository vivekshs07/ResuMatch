'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Zap, ChevronLeft} from 'lucide-react'
import Link from 'next/link'

export function MatchUnavailableComponent() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">ResuMatch AI</span>
          </div>
          <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center">
            <ChevronLeft className="mr-1" />
            Back to Matcher
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl flex items-center justify-center">
                <AlertCircle className="mr-2 h-6 w-6 text-yellow-500" />
                Match Data Unavailable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600 mb-6">
                We&apos;re sorry, but we couldn&apos;t retrieve your match data at this time. This could be due to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>A temporary server issue</li>
                <li>Network connectivity problems</li>
                <li>The matching process hasn&apos;t been completed yet</li>
                <li>The results have expired or been deleted</li>
              </ul>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button variant="outline" asChild>
                  <Link href="/" className="flex items-center justify-center">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Return to Matcher
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What can you do?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Try refreshing the page or clicking the Retry button above.</li>
                <li>Check your internet connection and try again.</li>
                <li>If you haven&apos;t submitted your resume for matching yet, return to the main page and start the process.</li>
                <li>If the problem persists, please contact our support team for assistance.</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <footer className="bg-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500">
          <p>&copy; 2023 ResuMatch AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}