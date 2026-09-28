import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Interests } from "@/components/sections/Interests";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Interests />
      <Contact />
    </>
  );
}
