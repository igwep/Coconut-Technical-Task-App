"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useContactStore } from '../stores/contactStore';
import { useProtectedPage } from '../hook/useProtectPage';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../component/ui/Card';

export default function SubmissionHistory() {
  const submissions = useContactStore((state) => state.submissions);
  const checkingAuth = useProtectedPage();
  if (checkingAuth) return null;

  if (submissions.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10">
        No submissions yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 my-10 sm:grid-cols-2 lg:grid-cols-3 px-4">
      {submissions.map((submission, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-[#1E293B] text-white border border-[#334155] shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">{submission.name}</CardTitle>
              <CardDescription className="text-[#94A3B8]">
                {submission.subject}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="font-semibold text-[#CBD5E1]">Email:</span>{' '}
                {submission.email}
              </div>
              <div>
                <span className="font-semibold text-[#CBD5E1]">Phone:</span>{' '}
                {submission.phone}
              </div>
              <div>
                <span className="font-semibold text-[#CBD5E1]">Message:</span>
                <p className="mt-1 text-sm text-[#E2E8F0]">{submission.message}</p>
              </div>
            </CardContent>
            <CardFooter className="justify-end text-xs text-[#94A3B8]">
              Submission #{index + 1}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
