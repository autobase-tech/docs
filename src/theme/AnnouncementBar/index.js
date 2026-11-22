import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import OriginalAnnouncementBar from '@theme-original/AnnouncementBar';
import { useBlackFridayOfferActive } from '@site/src/blackFridayOffer';

function BlackFridayAnnouncementBar() {
  const offerActive = useBlackFridayOfferActive();

  return offerActive ? <OriginalAnnouncementBar /> : null;
}

export default function AnnouncementBar() {
  const { announcementBar } = useThemeConfig();

  return announcementBar?.id === 'black-friday-2026'
    ? <BlackFridayAnnouncementBar />
    : <OriginalAnnouncementBar />;
}
