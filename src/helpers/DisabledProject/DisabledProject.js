export const DisabledProjectStorageName = "MC_DEPOSIT_DISABLED"

export const setDisabledProjectTime = (value = new Date().getTime()) =>
  localStorage.setItem(DisabledProjectStorageName, value)

export const getDisabledProjectTime = () =>
  parseInt(localStorage.getItem(DisabledProjectStorageName)) || 0

export const removeDisabledProjectTime = () =>
  localStorage.removeItem(DisabledProjectStorageName)

export const getDisabledProjectTimeDifference = () => {
  const disabledProjectTime = getDisabledProjectTime()
  if (!disabledProjectTime) return 0
  return new Date(disabledProjectTime) - new Date()
}
