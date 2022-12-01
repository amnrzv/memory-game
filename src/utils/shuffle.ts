export const shuffle = <T>(arr: T[]): T[] =>
  arr.sort((_a, _b) => (Math.random() > 0.5 ? 1 : -1));
