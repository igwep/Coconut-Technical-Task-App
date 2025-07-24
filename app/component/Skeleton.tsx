import React from 'react'
import { Card, CardContent } from './ui/Card'

export const Skeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
  <Card className="border-[#334155] bg-[#1E293B] w-full max-w-xl animate-pulse">
    <CardContent className="space-y-6">
      <div className="h-6 bg-[#334155] rounded w-32" /> {/* Heading */}
      
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 bg-[#334155] rounded" />
            <div className="h-10 bg-[#334155] rounded w-full" />
          </div>
        ))}

        {/* Message Box */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-[#334155] rounded" />
          <div className="h-28 bg-[#334155] rounded w-full" />
        </div>

        {/* Button */}
        <div className="h-12 bg-[#334155] rounded w-full" />
      </div>
    </CardContent>
  </Card>
</div>

  )
}
