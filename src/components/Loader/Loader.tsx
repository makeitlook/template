// components/Loader.tsx
import React from "react";
import { TailSpin } from "react-loader-spinner";
import Logo from "@/components/Logo/Logo";

const Loader: React.FC = () => (
  <div className="flex flex-col justify-center items-center w-full h-screen bg-neutral-dimmed space-y-8">
    <Logo />
    <TailSpin height="50" width="50" color="#000000" ariaLabel="loading" />
  </div>
);

export default Loader;
