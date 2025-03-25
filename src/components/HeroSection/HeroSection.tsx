"use client";

import React from "react";
import { motion, Variant, Variants } from "framer-motion";
import Link from "next/link";
import { HeroHighlight, Highlight } from "../HeroHighlight/HeroHighlight";
import { AnimatedBackground } from "../AnimatedBackground/AnimatedBackground";

// Define proper types for the animation variants
interface TextVariants extends Variants {
  hidden: Variant;
  visible: Variant;
}

// Animation variant for text with proper typing
const textVariant: TextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Banner: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-2xl py-32 sm:py-60 pt-60 justify-self-center">
      <AnimatedBackground />
      <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-balance text-center text-5xl font-semibold tracking-tight text-primary sm:text-7xl leading-relaxed lg:leading-snug"
        >
          Design That Speaks{" "}
          <Highlight className="text-text-primary">Your Vision</Highlight>
        </motion.h1>
        <motion.p
          variants={textVariant}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-pretty text-lg text-secondary sm:text-xl leading-8 text-center"
        >
          At Make It Look, your ideas are turned into sophisticated, polished
          designs. Whether it&#39;s branding, presentations, or digital content,
          every element is fine-tuned until your vision truly stands out.
          Let&#39;s bring your vision to life.
        </motion.p>
        <motion.p
          variants={textVariant}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, delay: 1.3 }}
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          <Link href="#contact-section"></Link>
        </motion.p>
      </HeroHighlight>
    </div>
  );
};

export default Banner;
