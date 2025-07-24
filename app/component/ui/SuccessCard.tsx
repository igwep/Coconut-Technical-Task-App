import { Card, CardContent } from "./Card";
import { CheckCircle2 } from "lucide-react";

export default function SuccessCard() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="border-[#334155] bg-[#1E293B] w-full max-w-xl">
        <CardContent className="space-y-6 text-center py-12">
          <div className="flex justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-white text-2xl font-semibold">
            Thank You!
          </h2>
          <p className="text-[#CBD5E1]">
            Your message has been submitted successfully.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
