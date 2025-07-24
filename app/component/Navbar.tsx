"use client";
import React,{useState} from 'react'
import {
motion,
AnimatePresence,
Variants
 } from 'framer-motion';

import { Menu, X } from 'lucide-react';
import Button from './ui/Button';
import { useAuthStore } from '../stores/userStores';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const Navbar = () => {
      const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const user = useAuthStore((state) => state.user);

   const menuVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const, 
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};
const logoutUser = () => {
            if (user) {
                 useAuthStore.getState().clearUser()
                 router.push("/");// Redirect to Home after logout
            }
            else{
                router.push("/login"); // Redirect to Login if not logged in
            }
  
}
  return (
     <header className="border-b border-[#334155] bg-[#020817]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
           <Link href="/"> <span className="text-xl font-semibold text-white">Home</span></Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
            
              <Link
                href="/contact"
                className="text-neutral-300 hover:text-white text-sm font-medium transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/submission"
                className="text-neutral-300 hover:text-white text-sm font-medium transition-colors"
              >
                Submissions
              </Link>
              <Button
               onClick={() => logoutUser()}
                
                className="bg-[#2563EB] hover:bg-[#4681ff] text-white"
              >
                 {user ? 'LogOut' : 'Login'}
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-neutral-300 hover:text-white hover:bg-[#334155]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
          {/* Mobile Navigation */}
       <AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
      key="mobile-menu"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
      className="lg:hidden border-t border-[#334155] py-4"
    >
      <div className="flex flex-col space-y-4">
        <Link
          href="/contact"
          className="text-neutral-300 hover:text-white active:bg-neutral-700 rounded-md text-sm font-medium transition-colors px-2 py-1"
        >
          Contact
        </Link>
        <Link
          href="/submission"
          className="text-neutral-300 hover:text-white active:bg-neutral-700 rounded-md text-sm font-medium transition-colors px-2 py-1"
        >
          Submissions
        </Link>

        <div className="flex flex-col space-y-2 pt-2">
         
         <Button
          onClick={() => logoutUser()}
          className="bg-[#2563EB] hover:bg-brand-700 active:bg-blue-800 active:scale-95 transition-all duration-150 text-white w-full rounded-md py-2"
>
          {user ? "LogOut" : "Login"}
         </Button>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
        </div>
      </header>
  )
}

export default Navbar