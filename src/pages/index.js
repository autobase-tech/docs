import React from 'react';
import Layout from '@theme/Layout';
import HeroSection from '@site/src/components/HeroSection';
import PlatformOverviewSection from '@site/src/components/PlatformOverviewSection';
import ArchDiagramSection from '@site/src/components/ArchDiagramSection';
import ValuePropsSection from '@site/src/components/ValuePropsSection';
import BusinessValueSection from '@site/src/components/BusinessValueSection';
import CLISection from '@site/src/components/CLISection';
import ContactSection from '@site/src/components/ContactSection';
import SocialProofSection from '@site/src/components/SocialProofSection';

export default function Home() {
  return (
    <Layout
      wrapperClassName="landingPage"
      title="Autobase"
      description="Get the simplicity of managed PostgreSQL on infrastructure you control. Run Autobase in your cloud account or on your own servers. Start free with up to two clusters.">
      <main>
        <HeroSection />
        <ValuePropsSection />
        <BusinessValueSection />
        <PlatformOverviewSection />
        <ArchDiagramSection />
        <CLISection />
        <ContactSection />
        <SocialProofSection />
      </main>
    </Layout>
  );
}
