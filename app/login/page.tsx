"use client";

import React, { useState, FormEvent } from "react";
import { Card, CardContent, CardTitle } from "../component/ui/Card";
import Button from "../component/ui/Button";
import Label from "../component/ui/Label";
import { Input } from "../component/ui/Input";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useAuthStore } from "../stores/userStores";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e:FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const setUser = useAuthStore.getState().setUser;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMsg =
          res.status === 401
            ? "Invalid credentials"
            : errorData.message || "Login failed";

        toast.error(`${errorMsg}`);
        return;
      }

      const user = await res.json();

      await new Promise((resolve) => setTimeout(resolve, 3000));

      toast.success("Logged in successfully");
      console.log("Logged in user:", user);
      setUser(user);
        router.push("/contact");
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (error instanceof Error) {
        message = error.message;
      }
      console.error("Unexpected error:", message);
      toast.error(`Unexpected error: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="border-[#334155] bg-[#1E293B] w-full max-w-md p-4">
        <CardContent className="space-y-6">
          <CardTitle className="text-white text-2xl font-semibold text-center">
            Log in
          </CardTitle>
          </CardContent>
        <CardContent className="space-y-6">
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#334155] border-[#475569] text-white placeholder-[#94A3B8] focus:border-brand-500 focus:ring-brand-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-[#334155] border-[#475569] text-white placeholder-[#94A3B8] focus:border-brand-500 focus:ring-brand-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-[#94A3B8]" />
                  ) : (
                    <Eye className="w-4 h-4 text-[#94A3B8]" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2563EB] hover:bg-[#4681ff] flex items-center justify-center gap-3 text-white h-12"
            >
              <span>Sign In</span>
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
