import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import HeroSection from '@site/src/components/HeroSection';
import ArchDiagramSection from '@site/src/components/ArchDiagramSection';
import ValuePropsSection from '@site/src/components/ValuePropsSection';
import ProductHighlightsSection from '@site/src/components/ProductHighlightsSection';
import CLISection from '@site/src/components/CLISection';
import ContactSection from '@site/src/components/ContactSection';
import SocialProofSection from '@site/src/components/SocialProofSection';

export default function Home() {
  // GSAP scroll reveal — blur + fade from below, fires once per section
  useEffect(() => {
    let ctx;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          document.querySelectorAll('main section').forEach((section) => {
            gsap.fromTo(
              section,
              { y: 32, opacity: 0, filter: 'blur(6px)' },
              {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 0.85,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 90%',
                  once: true,
                },
              }
            );
          });
        });
      }
    );
    return () => ctx?.revert();
  }, []);

  return (
    <Layout
      wrapperClassName="landingPage"
      title="autobase"
      description="Automated database platform for PostgreSQL">
      <HeroSection />
      <main>
        <ArchDiagramSection />
        <ValuePropsSection />
        <ProductHighlightsSection />
        <CLISection />
        <ContactSection />
        <SocialProofSection />
      </main>
    </Layout>
  );
}
