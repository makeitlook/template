"use client";
import { cn } from "./../../lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  // Default colors will now depend on color mode
  gradientBackgroundStart,
  gradientBackgroundEnd,
  firstColor,
  secondColor,
  thirdColor,
  fourthColor,
  fifthColor,
  pointerColor,
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
  theme = "auto", // 'auto', 'light', or 'dark'
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
  theme?: "auto" | "light" | "dark";
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  // Detect system dark mode preference
  useEffect(() => {
    if (theme === "auto") {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      setIsDarkMode(darkModeMediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
      };

      darkModeMediaQuery.addEventListener("change", handleChange);
      return () =>
        darkModeMediaQuery.removeEventListener("change", handleChange);
    } else {
      setIsDarkMode(theme === "dark");
    }
  }, [theme]);

  // Set colors based on theme
  useEffect(() => {
    if (!containerRef.current) return;

    // Light mode colors
    const lightThemeColors = {
      gradientBackgroundStart: "rgb(242, 242, 242)", // whiteSmoke
      gradientBackgroundEnd: "rgb(255, 255, 255)", // white
      firstColor: "252, 163, 17", // orange
      secondColor: "20, 33, 61", // oxfordBlue
      thirdColor: "0, 107, 179", // custom blue
      fourthColor: "239, 71, 111", // custom accent
      fifthColor: "6, 214, 160", // custom accent
      pointerColor: "252, 163, 17", // orange (highlight color)
    };

    // Dark mode colors
    const darkThemeColors = {
      gradientBackgroundStart: "rgb(0, 0, 0)", // black
      gradientBackgroundEnd: "rgb(20, 33, 61)", // oxfordBlue
      firstColor: "252, 163, 17", // orange
      secondColor: "200, 200, 200", // light gray
      thirdColor: "0, 122, 204", // custom blue
      fourthColor: "239, 71, 111", // custom accent
      fifthColor: "6, 214, 160", // custom accent
      pointerColor: "252, 163, 17", // orange (highlight color)
    };

    // Select theme colors
    const themeColors = isDarkMode ? darkThemeColors : lightThemeColors;

    // Apply colors directly to the container element instead of document.body
    const container = containerRef.current;

    container.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart || themeColors.gradientBackgroundStart
    );
    container.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd || themeColors.gradientBackgroundEnd
    );
    container.style.setProperty(
      "--first-color",
      firstColor || themeColors.firstColor
    );
    container.style.setProperty(
      "--second-color",
      secondColor || themeColors.secondColor
    );
    container.style.setProperty(
      "--third-color",
      thirdColor || themeColors.thirdColor
    );
    container.style.setProperty(
      "--fourth-color",
      fourthColor || themeColors.fourthColor
    );
    container.style.setProperty(
      "--fifth-color",
      fifthColor || themeColors.fifthColor
    );
    container.style.setProperty(
      "--pointer-color",
      pointerColor || themeColors.pointerColor
    );
    container.style.setProperty("--size", size);
    container.style.setProperty("--blending-value", blendingValue);

    // Adjust opacity for better theme compatibility
    container.style.setProperty(
      "--gradient-opacity",
      isDarkMode ? "0.9" : "0.7"
    );
  }, [
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
    isDarkMode,
  ]);

  // Handle mouse movement animation
  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return;
      }
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
    }

    const animationId = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationId);
  }, [curX, curY, tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  // Detect Safari browser
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-screen w-screen relative overflow-hidden top-0 left-0",
        "transition-colors duration-500", // Add smooth transition
        containerClassName
      )}
      style={{
        background: `linear-gradient(40deg, var(--gradient-background-start), var(--gradient-background-end))`,
      }}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_var(--gradient-opacity))_0,_rgba(var(--first-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:center_center]`,
            `animate-first`,
            `opacity-100 transition-opacity duration-500`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_var(--gradient-opacity))_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-400px)]`,
            `animate-second`,
            `opacity-100 transition-opacity duration-500`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_var(--gradient-opacity))_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%+400px)]`,
            `animate-third`,
            `opacity-100 transition-opacity duration-500`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_var(--gradient-opacity))_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-200px)]`,
            `animate-fourth`,
            `opacity-70 transition-opacity duration-500`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_var(--gradient-opacity))_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
            `animate-fifth`,
            `opacity-100 transition-opacity duration-500`
          )}
        ></div>

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_var(--gradient-opacity))_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
              `opacity-70 transition-opacity duration-500`
            )}
          ></div>
        )}
      </div>
    </div>
  );
};
