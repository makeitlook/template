"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Link href="/" className="relative z-10">
      <Image
        src={
          resolvedTheme === "dark"
            ? "/images/logo-light.svg"
            : "/images/logo-dark.svg"
        }
        alt="Logo"
        width={130}
        height={40}
        priority // makes sure it's loaded early
      />
    </Link>
  );
};

export default Logo;
