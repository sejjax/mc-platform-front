export function generateArrayFromOneToN(n) {
  const array = [];
  for (let i = 1; i <= n; i++) {
    array.push(i);
  }
  return array;
}
