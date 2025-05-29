"use client";

import { MdErrorOutline } from "react-icons/md";
import Link from "next/link";
import { IconBaseProps } from "react-icons";
import AnimatedDiv from "../AnimatedDiv/AnimatedDiv";

const ErrorIcon = MdErrorOutline as unknown as React.FC<IconBaseProps>;

export default function ErrorMessage({
  message = "An unexpected error occurred.",
  reset,
}: {
  message?: string;
  reset?: () => void;
}) {
  return (
    <AnimatedDiv>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <ErrorIcon className="text-[100px] text-elements-secondary-main" />
        <h1 className="text-3xl font-bold text-text-primary mt-4">
          Something went wrong
        </h1>
        <p className="text-text-secondary mt-2">{message}</p>
        <div className="mt-6 flex gap-4">
          {reset && (
            <button
              onClick={reset}
              className="px-4 py-2 bg-elements-secondary-main text-white rounded-md hover:bg-elements-secondary-hover transition"
            >
              Try Again
            </button>
          )}
          <Link
            href="/"
            className="px-4 py-2 bg-neutral text-text-primary rounded-md hover:bg-neutral-shadow transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </AnimatedDiv>
  );
}
