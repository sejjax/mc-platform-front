export const roundToDynamicNumbers = (value, roundedNumbers = 1000) => {
  return Math.round(value * roundedNumbers) / roundedNumbers;
};
