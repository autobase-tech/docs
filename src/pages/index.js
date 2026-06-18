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

function HomepageContent() {
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
              { y: 48, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1.0,
                ease: 'expo.out',
                immediateRender: false,
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
    <>
      <HeroSection />
      <main>
        {/* <AboutSection /> */}
        {/* <ProblemSection /> */}
        <CloudProviders />
        <Sponsors />
        <WhatIsAutobaseSection />
        <ExplainSection />
        <VideoSection />
        <HowItWorksSection />
        <FeaturedSection />
        <PricingSection />
        {/* <WhatYouGetSection /> */}
        <ComparisonSection />
      </main>
    </>
  );
}

export default function Home() {
  return (
    <Layout
      wrapperClassName="landingPage"
      title="autobase"
      description="Automated database platform for PostgreSQL">
      <HomepageContent />
    </Layout>
  );
}
