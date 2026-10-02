import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WorkGrid from "@/components/WorkGrid";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import CursorFollower from "@/components/CursorFollower";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <CursorFollower />
      <Reveal />
      <Nav />
      <main>
        <Hero />
        <WorkGrid />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
