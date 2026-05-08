import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import HeroSection from '@site/src/components/HeroSection';
import AboutSection from '@site/src/components/AboutSection';
import ProblemSection from '@site/src/components/ProblemSection';
import WhatIsAutobaseSection from '@site/src/components/WhatIsAutobaseSection';
import ExplainSection from '@site/src/components/ExplainSection';
import HowItWorksSection from '@site/src/components/HowItWorksSection';
import FeaturedSection from '@site/src/components/FeaturedSection';
import CloudProviders from '@site/src/components/CloudProviders';
import VideoSection from '@site/src/components/VideoSection';
import WhatYouGetSection from '@site/src/components/WhatYouGetSection';
import PricingSection from '@site/src/components/PricingSection';
import ComparisonSection from '@site/src/components/ComparisonSection';
import Sponsors from '@site/src/components/Sponsors';

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
              { y: 48, opacity: 0, filter: 'blur(10px)' },
              {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.0,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 88%',
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
      title="autobase"
      description="Automated database platform for PostgreSQL">
      <HeroSection />
      <main>
        <AboutSection />
        <ProblemSection />
        <VideoSection />
        <WhatYouGetSection />
        <WhatIsAutobaseSection />
        <ExplainSection />
        <HowItWorksSection />
        <FeaturedSection />
        <CloudProviders />
        <Sponsors />
        <PricingSection />
        <ComparisonSection />
      </main>
    </Layout>
  );
}
