"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MdErrorOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner"; // Or your own Spinner
import { IconBaseProps } from "react-icons";

const ErrorIcon = MdErrorOutline as unknown as React.FC<IconBaseProps>;

export default function ServerErrorPage() {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 1000); // Show loader for 1s
    return () => clearTimeout(timer);
  }, []);

  if (!showPage) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-dimmed-heavy">
        <TailSpin height="50" width="50" color="#ffffff" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-dimmed-heavy text-center px-4">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.2 }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 }}
      >
        <ErrorIcon className="text-[100px] text-elements-secondary-main" />
      </motion.div>
      <h1 className="text-4xl font-bold text-text-primary mt-6">
        500 - Something went wrong
      </h1>
      <p className="text-text-secondary mt-2">
        We`&apos;`re working to fix this. Please try again later or return to
        the homepage.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block px-6 py-3 bg-elements-secondary-main text-white rounded-md hover:bg-elements-secondary-hover transition"
      >
        Go Home
      </Link>
    </div>
  );
}
