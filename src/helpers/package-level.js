const INVESTORS = {
  investor_basic: 1,
  investor_silver: 2,
  investor_gold: 3,
  investor_platinum: 4,
  investor_diamond: 5,
}
export const getPackageLevel = project => {
  if (project.includes("basic") && !project.includes("investor")) {
    return +project[project.length - 1]
  }
  if (project.includes("investor")) {
    if (project.includes("pro")) return 6
    return INVESTORS[project] ?? 0
  }
  return 0
}
