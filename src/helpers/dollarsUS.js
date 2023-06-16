import { roundToDynamicNumbers } from "./Utils"

const dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  useGrouping: true,
  maximumSignificantDigits: 7,
})

export default dollarUS

export function formatMoney(amount, splitChar = " ", negative = true) {
  const roundedAmount = roundToDynamicNumbers(amount, 1)
  const splitedAmount = roundedAmount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, splitChar)
  if (!negative && roundedAmount < 0) return `${0}$`
  return `${splitedAmount}$`
}
