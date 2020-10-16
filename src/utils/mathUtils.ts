export const round = (num: number, decimal: number): number => {
  return Math.round(num * 10 ** decimal) / 10 ** decimal;
};
