import React from 'react';
import Layout from '@theme/Layout';
import PricingSection from '@site/src/components/PricingSection';

export default function PricingPage() {
  return (
    <Layout
      wrapperClassName="landingPage"
      title="Pricing"
      description="Autobase pricing plans — Free, Standard, Professional, Premium">
      <main>
        <PricingSection />
      </main>
    </Layout>
  );
}
