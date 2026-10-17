import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { EngineeringFocusSection } from "@/components/sections/EngineeringFocusSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { routes } from "@/config/routes";
import { profile } from "@/content/profile";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ path: routes.home, image: profile.portraits?.about });

// 01 Hero → 02 Selected work → 03 Experience → 04 Engineering focus →
// 05 Education & achievements → 06 About → 07 Resume (once a resume exists) →
// 08 Contact. Keep in step with `destinations` in config/navigation.ts, which
// numbers the sections and builds the navigation. Every section is a Server
// Component.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SelectedWorkSection />
      <ExperienceSection />
      <EngineeringFocusSection />
      <EducationSection />
      <AboutSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
