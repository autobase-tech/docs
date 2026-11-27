export const INFRASTRUCTURE_COSTS = {
  small: {
    label: '8 vCPU, 32 GB RAM, 500 GB storage',
    providers: [
      { name: 'AWS', managed: 2083, autobase: 949 },
      { name: 'GCP', managed: 1956, autobase: 1105 },
      { name: 'Azure', managed: 1610, autobase: 953 },
      { name: 'DigitalOcean', managed: 1536, autobase: 906 },
    ],
  },
  medium: {
    label: '32 vCPU, 128 GB RAM, 1 TB storage',
    providers: [
      { name: 'AWS', managed: 8095, autobase: 3557 },
      { name: 'GCP', managed: 7154, autobase: 3913 },
      { name: 'Azure', managed: 6217, autobase: 3588 },
      { name: 'DigitalOcean', managed: 5586, autobase: 3324 },
    ],
  },
  large: {
    label: '96 vCPU, 768 GB RAM, 10 TB storage',
    providers: [
      { name: 'AWS', managed: 33748, autobase: 15463 },
      { name: 'GCP', managed: 31127, autobase: 18872 },
      { name: 'Azure', managed: 28530, autobase: 15495 },
    ],
  },
};
export const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
