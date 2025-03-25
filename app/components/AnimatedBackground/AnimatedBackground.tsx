"use client";
import React from "react";

export const AnimatedBackground = () => {
  return (
    <div className="inset-0 -z-10 overflow-hidden rounded-3xl w-full h-full">
      <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-elements-primary-dimmed/30 to-elements-secondary-dimmed/30 blur-3xl transform rotate-12 animate-pulse" />
      <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-elements-primary-highlight/30 to-elements-secondary-highlight/30 blur-3xl transform -rotate-12 animate-pulse" />
    </div>
  );
};
