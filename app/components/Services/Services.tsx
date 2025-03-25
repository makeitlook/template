"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import BlobBackground from "../BlobBackground/BlobBackground";

const Services = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div id="services-section" className="relative py-24 sm:py-32">
      <BlobBackground />
      <Image
        src="/images/dedicated/spiral.svg"
        height={272}
        width={686}
        alt="spiral-design"
        className="absolute right-0 hidden lg:block -z-10"
      />
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <h1 className="tracking-wides text-4xl font-extrabold tracking-tight text-text-primary sm:text-6xl text-center">
            Services
          </h1>
          <h2 className="mt-2 text-base font-medium text-elements-secondary-contrastText text-xl text-center">
            Versatile Expertise for Every Creative Need
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            className="relative lg:col-span-3"
            variants={itemVariants}
          >
            <div className="absolute inset-px rounded-lg bg-card-background max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)] shadow-lg hover:shadow-xl transition-shadow duration-300">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/services/branding.svg"
                  width={100}
                  height={100}
                  alt="branding"
                  className="h-80 w-full bg-white backdrop-blur-sm bg-opacity-80"
                />
              </motion.div>
              <div className="p-10 pt-4">
                <h3 className="text-xl font-bold text-elements-primary-main">
                  Branding & Identity
                </h3>
                <p className="mt-2 font-medium tracking-tight text-text-primary text-lg">
                  Your story, visually told.
                </p>
                <p className="mt-2 max-w-lg text-text-secondary">
                  I craft unique brand identities that capture the essence of
                  your business, ensuring every design element speaks to who you
                  are.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
          </motion.div>

          <motion.div
            className="relative lg:col-span-3"
            variants={itemVariants}
          >
            <div className="absolute inset-px rounded-lg bg-card-background lg:rounded-tr-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)] shadow-lg hover:shadow-xl transition-shadow duration-300">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/services/web.svg"
                  width={100}
                  height={100}
                  alt="web"
                  className="h-80 w-full bg-white backdrop-blur-sm bg-opacity-80"
                />
              </motion.div>
              <div className="p-10 pt-4">
                <h3 className="text-xl font-bold text-elements-primary-main">
                  Digital & Web Design
                </h3>
                <p className="mt-2 font-medium tracking-tight text-text-primary text-lg">
                  Where digital dreams come to life.
                </p>
                <p className="mt-2 max-w-lg text-text-secondary">
                  Transforming ideas into immersive, responsive online
                  experiences that engage users and elevate your digital
                  presence.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
          </motion.div>

          <motion.div
            className="relative lg:col-span-2"
            variants={itemVariants}
          >
            <div className="absolute inset-px rounded-lg bg-card-background lg:rounded-bl-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)] shadow-lg hover:shadow-xl transition-shadow duration-300">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/services/photography.svg"
                  width={100}
                  height={100}
                  alt="photography"
                  className="h-80 w-full bg-white backdrop-blur-sm bg-opacity-80"
                />
              </motion.div>
              <div className="p-10 pt-4">
                <h3 className="text-xl font-bold text-elements-primary-main">
                  Video & Photography
                </h3>
                <p className="mt-2 font-medium tracking-tight text-text-primary text-lg">
                  Visual storytelling in motion.
                </p>
                <p className="mt-2 max-w-lg text-text-secondary">
                  From dynamic video production to stunning photography, I
                  capture the spirit of your vision and translate it into
                  compelling visual narratives.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" />
          </motion.div>

          <motion.div
            className="relative lg:col-span-2"
            variants={itemVariants}
          >
            <div className="absolute inset-px rounded-lg bg-card-background" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] shadow-lg hover:shadow-xl transition-shadow duration-300">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/services/presentation.svg"
                  width={100}
                  height={100}
                  alt="presentation"
                  className="h-80 w-full bg-white backdrop-blur-sm bg-opacity-80"
                />
              </motion.div>
              <div className="p-10 pt-4">
                <h3 className="text-xl font-bold text-elements-primary-main">
                  Presentation & Print Design
                </h3>
                <p className="mt-2 font-medium tracking-tight text-text-primary text-lg">
                  Polished visuals for powerful impact.
                </p>
                <p className="mt-2 max-w-lg text-text-secondary">
                  Designing refined presentations, brochures, and print
                  materials that communicate professionalism and clarity with
                  every detail.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
          </motion.div>

          <motion.div
            className="relative lg:col-span-2"
            variants={itemVariants}
          >
            <div className="absolute inset-px rounded-lg bg-card-background max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)] shadow-lg hover:shadow-xl transition-shadow duration-300">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/services/socialmedia.svg"
                  width={100}
                  height={100}
                  alt="ui"
                  className="h-80 w-full bg-white backdrop-blur-sm bg-opacity-80"
                />
              </motion.div>
              <div className="p-10 pt-4">
                <h3 className="text-xl font-bold text-elements-primary-main">
                  Social Media Management
                </h3>
                <p className="mt-2 font-medium tracking-tight text-text-primary text-lg">
                  Content that sparks conversations.
                </p>
                <p className="mt-2 max-w-lg text-text-secondary">
                  I design dynamic social media content—from eye-catching
                  visuals to engaging copy—that builds your brand&#39;s presence
                  and connects authentically with your audience.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
