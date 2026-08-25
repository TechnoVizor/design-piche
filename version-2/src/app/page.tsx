import { SiteHeader } from "@/components/piche/site-header";
import { HeroSection } from "@/components/piche/hero-section";
import { ProjectsSection } from "@/components/piche/projects-section";
import { ExploreSection } from "@/components/piche/explore-section";
import { AboutSection } from "@/components/piche/about-section";
import { NewsSection } from "@/components/piche/news-section";
import { BanksSection } from "@/components/piche/banks-section";
import { ContactSection } from "@/components/piche/contact-section";
import { SiteFooter } from "@/components/piche/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-(--surface-page)">
      <SiteHeader />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ExploreSection />
        <AboutSection />
        <NewsSection />
        <BanksSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
