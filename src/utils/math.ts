export const round = (num: number, decimal: number): number => {
  return Math.round(num * 10 ** decimal) / 10 ** decimal;
};

export const countFormat = new Intl.NumberFormat();

export const weightFormat = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
