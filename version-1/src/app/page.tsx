import { SiteHeader } from "@/components/piche/site-header";
import { HeroSection } from "@/components/piche/hero-section";
import { ProjectsSection } from "@/components/piche/projects-section";
import { Explore3DSection } from "@/components/piche/explore-3d-section";
import { AboutSection } from "@/components/piche/about-section";
import { NewsSection } from "@/components/piche/news-section";
import { SocialSection } from "@/components/piche/social-section";
import { BanksSection } from "@/components/piche/banks-section";
import { ContactSection } from "@/components/piche/contact-section";
import { SiteFooter } from "@/components/piche/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main
        id="top"
        className="mx-auto max-w-(--container-max) bg-(--surface-soft) px-(--container-pad) pb-(--space-section)"
      >
        <HeroSection />
        <ProjectsSection />
        <Explore3DSection />
        <AboutSection />
        <NewsSection />
        <SocialSection />
        <BanksSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
