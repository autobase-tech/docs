import { useEffect, useState } from 'react';

export const blackFridayOffer = {
  code: 'FRIDAY2026',
  discount: '50%',
  firstYearPrice: '$1,536',
  renewalPrice: '$3,072',
  endsAt: '2026-11-30T23:59:00Z',
  deadline: 'Nov 30, 2026 at 23:59 UTC',
};
const offerEndTime = Date.parse(blackFridayOffer.endsAt);

export function useBlackFridayOfferActive() {
  const [offerActive, setOfferActive] = useState(null);

  useEffect(() => {
    let timer;
    const checkDeadline = () => {
      const remaining = offerEndTime - Date.now();
      setOfferActive(remaining > 0);
      if (remaining > 0) {
        timer = window.setTimeout(checkDeadline, Math.min(remaining, 2 ** 31 - 1));
      }
    };

    checkDeadline();
    return () => window.clearTimeout(timer);
  }, []);

  return offerActive;
}
