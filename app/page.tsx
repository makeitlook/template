import HeroSection from "./components/HeroSection/HeroSection";
import About from "./components/About/index";
import Services from "./components/Services/Services";
import Contact from "./components/Contact/Contact";

export default function Home() {
  return (
    <main className="px-4">
      <HeroSection />
      <About />
      <Services />
      <Contact />
    </main>
  );
}
