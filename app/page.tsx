"use client";
import { motion } from "framer-motion";
import Button from "./component/ui/Button";
import { RocketIcon } from "lucide-react"; 
import type { Variants } from "framer-motion";


 const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};


 const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut", 
    },
  },
};

 const Home = () => {
  return (
    <section className="pt-12 sm:pt-20 pb-16 sm:pb-32 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          >
            Welcome to{" "}
            <span className="text-[#60A5FA]">Coconut Technical Task App</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-neutral-300 mb-8 max-w-2xl mx-auto px-4 sm:px-0"
          >
            A simple app to demonstrate technical understanding using Zustand,
            Zod, protected routes, and clean UI.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex justify-center">
            <Button
              onClick={() => (window.location.href = "/login")}
              className="bg-[#2563EB] hover:bg-[#4681ff] text-white px-6 py-3 flex items-center text-base sm:text-lg font-semibold"
            >
              <RocketIcon className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
export default Home;