import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { EngineeringFocusSection } from "@/components/sections/EngineeringFocusSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { routes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ path: routes.home });

// Recruiter journey: identity → proof → capability → experience →
// credentials → context → contact. Every section is a Server Component.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SelectedWorkSection />
      <EngineeringFocusSection />
      <ExperienceSection />
      <EducationSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
