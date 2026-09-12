import { Navbar } from "@/components/Navbar";
import { CursorGlow } from "@/components/CursorGlow";
import { HeroSection } from "@/components/HeroSection";
import { EngineeringIdentity } from "@/components/EngineeringIdentity";
import { Capabilities } from "@/components/Capabilities";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { EngineeringLab } from "@/components/EngineeringLab";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SkillMatrix } from "@/components/SkillMatrix";
import { EducationTimeline } from "@/components/EducationTimeline";
import { CertificationWall } from "@/components/CertificationWall";
import { TechnicalJourney } from "@/components/TechnicalJourney";
import { Methodology } from "@/components/Methodology";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

// Server component: the page's content is in the initial HTML, so text is
// painted before any JavaScript runs. Interactive pieces below are their own
// client islands. (The previous version was one large client component behind
// a blocking loading screen, which delayed first paint by ~2.4s and made
// Largest Contentful Paint impossible to hit before then.)
export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <HeroSection />
        <EngineeringIdentity />
        <Capabilities />
        <ExperienceTimeline />
        <EngineeringLab />
        <ProjectShowcase />
        <SkillMatrix />
        <EducationTimeline />
        <CertificationWall />
        <TechnicalJourney />
        <Methodology />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
