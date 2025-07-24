"use client";
import React,{ useState, useEffect} from 'react'
import { Card, CardContent } from "../component/ui/Card";
import Label from "../component/ui/Label";
import { Input } from "../component/ui/Input";
import Button from "../component/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from '../lib/contactSchema';
import { useAuthStore } from '../stores/userStores';
import { useProtectedPage } from '../hook/useProtectPage';
import { Skeleton } from '../component/Skeleton';
import { useContactMutation } from '../hook/useContactMutation';
import { toast } from 'react-hot-toast';
import { type FieldErrors } from "react-hook-form";
import SuccessCard from '../component/ui/SuccessCard';

const Contact = () => {
    
    // State to manage form data and loading state
  const [formData, setFormData] = useState<ContactFormData>({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
});

    const [isSkeletonVisible, setIsSkeletonVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const { user, hasHydrated } = useAuthStore();
    
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSkeletonVisible(false)
    }, 2000) // 2 seconds

    return () => clearTimeout(timer) // Clean up
  }, [])



const {
    register,
    handleSubmit,
    reset,
     formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: user?.email || "",
    },
  });
    useEffect(() => {
  if (hasHydrated && user?.email) {
    reset((prev) => ({
      ...prev,
      email: user.email,
    }));
  }
}, [hasHydrated, user?.email, reset]);


  const { mutate } = useContactMutation({
  setFormData,
  setIsLoading: setIsLoading,
  setSuccessMessage: setSuccessMessage,
});

const onSubmit = async (data: ContactFormData) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('phone', data.phone?.toString() ?? '');
  formData.append('subject', data.subject);
  formData.append('message', data.message);

  mutate(formData);
  console.log('Form submitted:', data);
  
};
const onError = (errors: FieldErrors<ContactFormData>) => {
  const firstError = Object.values(errors)[0];

  if (firstError && typeof firstError === "object" && "message" in firstError) {
    toast.error((firstError as { message?: string }).message || "Form contains errors");
  } else {
    toast.error("Form contains errors");
  }
};
const checkingAuth = useProtectedPage()
  if (checkingAuth) return null

  
  if (isSkeletonVisible) {
    return <Skeleton />
  }
  if (successMessage) {
    return <SuccessCard />;
  }
  return (
<div className="min-h-screen flex items-center justify-center p-4">
    
  <Card className="border-[#334155] bg-[#1E293B] w-full max-w-xl">
    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

    <CardContent className="space-y-6">
      <h2 className="text-xl text-white font-semibold">Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">Full Name</Label>
          <Input
            id="name"
            type="text"
             {...register("name")}
            placeholder="Enter your full name"
            className="bg-[#334155] border-[#475569] text-white placeholder-[#94A3B8] focus:border-brand-500 focus:ring-brand-500"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="bg-[#334155]  border-[#475569] text-white placeholder-[#94A3B8] cursor-not-allowed"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="e.g. +1234567890"
            className="bg-[#334155] border-[#475569] text-white placeholder-[#94A3B8] focus:border-brand-500 focus:ring-brand-500"
          />
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-white">Subject</Label>
          <Input
            id="subject"
            type="text" 
            {...register("subject")}
            placeholder="What's this about?"
            className="bg-[#334155] border-[#475569] text-white placeholder-[#94A3B8] focus:border-brand-500 focus:ring-brand-500"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-white">Message</Label>
          <textarea
            id="message"  
            {...register("message")}
            placeholder="Your message..."
            className="w-full h-28 px-3 py-2 bg-[#334155] border border-[#475569] text-white placeholder-[#94A3B8] rounded-md resize-none focus:border-brand-500 focus:ring-brand-500"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#2563EB] hover:bg-[#4681ff] flex items-center justify-center gap-3 text-white h-12"
        >
          <span>{isLoading ? "Sending Message..." : "Send Message"}</span>
          {isLoading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
        </Button>
      </form>
    </CardContent>
  </Card>
</div>

  )
}

export default Contact;