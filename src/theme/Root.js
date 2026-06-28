import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useLocation } from '@docusaurus/router';
import ClickEffect from '@site/src/components/ClickEffect';
import SideNavbar from '@site/src/components/SideNavbar';

function SideNavbarGate() {
  const { pathname } = useLocation();
  if (pathname !== '/') return null;
  return <SideNavbar />;
}

export default function Root({ children }) {
  return (
    <>
      {children}
      <BrowserOnly>{() => <ClickEffect />}</BrowserOnly>
      <BrowserOnly>{() => <SideNavbarGate />}</BrowserOnly>
    </>
  );
}
