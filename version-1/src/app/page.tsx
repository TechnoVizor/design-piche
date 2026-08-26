import { SiteHeader } from "@/components/piche/site-header";
import { HeroSection } from "@/components/piche/hero-section";
import { ProjectAssemblySection } from "@/components/piche/project-assembly-section";
import { ProjectsSection } from "@/components/piche/projects-section";
import { ExploreSection } from "@/components/piche/explore-section";
import { MarqueeSection } from "@/components/piche/marquee-section";
import { AboutSection } from "@/components/piche/about-section";
import { NewsSection } from "@/components/piche/news-section";
import { SocialSection } from "@/components/piche/social-section";
import { BanksSection } from "@/components/piche/banks-section";
import { ContactSection } from "@/components/piche/contact-section";
import { StickyViewingBar } from "@/components/piche/sticky-viewing-bar";
import { SiteFooter } from "@/components/piche/site-footer";
import { MotionInit } from "@/components/piche/motion-init";
import { SmoothScroll } from "@/components/piche/smooth-scroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <MotionInit />
      <SiteHeader />
      <main
        id="top"
        className="mx-auto max-w-(--container-max) scroll-mt-(--nav-height) bg-(--surface-soft) px-(--container-pad) pb-(--space-section)"
      >
        <HeroSection />
        <ProjectAssemblySection />
        <ProjectsSection />
        <div className="relative">
          <StickyViewingBar />
          <ExploreSection />
          <MarqueeSection />
          <AboutSection />
          <NewsSection />
          <SocialSection />
          <BanksSection />
        </div>
      </main>
      <ContactSection />
      <SiteFooter />
    </>
  );
}
