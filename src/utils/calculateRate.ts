import type { Rate } from '../../client';

export const calculateRate = (rate: Rate[]) => {
  const filteredRate = rate.filter((r) => r.rate !== 0);
  if (filteredRate.length === 0) {
    return 0;
  }

  const sum = filteredRate.reduce((acc, rate) => acc + rate.rate, 0);
  const average = sum / filteredRate.length;

  return Math.ceil(average * 10) / 10;
};
