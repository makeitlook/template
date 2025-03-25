"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { FlipWords } from "../FlipWords/FlipWords";

const AboutData = [
  {
    heading: "My Story",
    imgSrc: "/images/aboutus/imgOne.svg",
    paragraph:
      "Hi I'm Aman, I'm an engineer by training and a designer at heart. My journey started in a world of precision and problem-solving, but my true passion was always in making things look polished and visually appealing. Over time, I became the go-to person for transforming ideas into sleek, professional designs—whether it was for presentations, branding, or digital content.",
    color:
      "bg-gradient-to-br from-elements-primary-main to-elements-primary-light",
  },
  {
    heading: "Philosophy",
    imgSrc: "/images/aboutus/imgTwo.svg",
    paragraph:
      "Great design isn't just about aesthetics—it's about creating a story that leaves a lasting impact. I approach every project with a blend of technical expertise and creative vision, ensuring that each detail is perfectly refined to match your unique vision.",
    color:
      "bg-gradient-to-br from-elements-secondary-main to-elements-secondary-highlight",
  },
  {
    heading: "What I Do",
    imgSrc: "/images/aboutus/imgThree.svg",
    paragraph:
      "At Make It Look, I turn your ideas into reality. I work one-on-one with clients to create designs that not only look good but also communicate a powerful message. My projects range from branding and marketing materials to digital assets that stand out in today's competitive landscape.",
    color:
      "bg-gradient-to-br from-elements-primary-dimmed to-elements-primary-main",
  },
];

const About = () => {
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("aboutus-section");
      if (!element || hasAnimated) return;

      const rect = element.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight * 0.75;

      if (isInView) {
        controls.start("visible");
        setHasAnimated(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, hasAnimated]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const words = [
    "Fun",
    "Pretty",
    "Modern",
    "Clean",
    "Unique",
    "Sleek",
    "Creative",
  ];

  return (
    <div id="aboutus-section" className="sm:pt-12 overflow-hidden">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="mx-auto max-w-7xl px-4 py-14 my-14 sm:my-24 lg:my-32 lg:px-10 rounded-3xl relative shadow-2xl border border-border-dimmed"
      >
        {/* Optionally include an animated background */}
        {/* <BlobBackground /> */}

        <motion.div variants={itemVariants} className="relative pb-12 sm:pb-16">
          <Image
            src="/images/aboutus/dots.svg"
            width={100}
            height={100}
            alt="dots-image"
            className="absolute bottom-1 left-[-20px] opacity-60"
          />
          <Image
            src="/images/aboutus/dots.svg"
            width={100}
            height={100}
            alt="dots-image"
            className="absolute top-1 right-[-20px] opacity-60"
          />
          <h3 className="text-center text-elements-secondary-contrastText text-base sm:text-lg tracking-widest font-semibold py-6">
            ABOUT
          </h3>
          <motion.p
            className="text-center text-text-secondary max-w-md mx-auto font-medium text-lg"
            variants={itemVariants}
          >
            The name comes from something I&apos;ve always heard-
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center items-center text-5xl sm:text-4xl lg:text-6xl font-bold text-text-primary mt-3 space-y-2 sm:space-y-0 sm:space-x-2">
            <motion.h4
              className="w-full sm:w-1/2 text-center sm:text-right"
              variants={itemVariants}
            >
              Make It Look
            </motion.h4>
            <span className="w-full sm:w-1/2 text-center sm:text-left text-elements-primary-main">
              <FlipWords words={words} />
            </span>
          </div>
          <motion.p
            className="text-center text-text-secondary max-w-md mx-auto mt-4 px-4 font-medium"
            variants={itemVariants}
          >
            Now I make it look however you want it.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-8">
          {AboutData.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative overflow-hidden backdrop-blur-sm bg-card-background/90 rounded-2xl shadow-lg transition duration-300 ease-in-out"
            >
              {/* Color accent */}
              <div className={`h-2 w-full ${item.color}`}></div>

              <div className="p-4 sm:p-6">
                {/* <div className="mb-4">
                  <Image
                    src={item.imgSrc}
                    alt={item.heading}
                    width={80}
                    height={80}
                    className="transition-all duration-300 mx-auto"
                  />
                </div> */}

                <h4 className="text-lg sm:text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-elements-primary-main to-elements-primary-light text-left">
                  {item.heading}
                </h4>

                <p className="font-normal text-text-secondary text-left mb-4">
                  {item.paragraph}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
