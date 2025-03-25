import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import InsightSphere from "../../../public/Logo.png";
import InsightSphereWhite from "../../../public/Logo-White.png";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    //change when we'll have light and dark theme logos
    setImageUrl(
      resolvedTheme === "dark" ? InsightSphereWhite.src : InsightSphere.src
    );
  }, [resolvedTheme]);

  return (
    <Link href="/" legacyBehavior>
      <a>{imageUrl && <img src={imageUrl} alt="LogoIcon" className="" />}</a>
    </Link>
  );
};

export default Logo;
