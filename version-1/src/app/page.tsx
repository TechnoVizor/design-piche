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
import { ViewingBar } from "@/components/piche/viewing-bar";
import { ViewingRequestProvider } from "@/components/piche/viewing-request-provider";
import { SiteFooter } from "@/components/piche/site-footer";
import { MotionInit } from "@/components/piche/motion-init";
import { SmoothScroll } from "@/components/piche/smooth-scroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <MotionInit />
      <SiteHeader />
      {/* The floating bar and the contact form are one request in two places,
          so they share a draft — see ViewingRequestProvider. */}
      <ViewingRequestProvider>
        <main
          id="top"
          className="mx-auto max-w-(--container-max) scroll-mt-(--nav-height) bg-(--surface-soft) px-(--container-pad) pb-(--space-section)"
        >
          <HeroSection />
          <ProjectAssemblySection />
          <ProjectsSection />
          <ExploreSection />
          <MarqueeSection />
          <AboutSection />
          <NewsSection />
          <SocialSection />
          <BanksSection />
        </main>
        <ContactSection />
        <ViewingBar />
      </ViewingRequestProvider>
      <SiteFooter />
    </>
  );
}
