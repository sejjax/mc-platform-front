import { isInvestorProLimitExceeded } from "helpers/deposit"
import { useSelector } from "react-redux"

const selector = state => ({
  projectCategory: state?.Project.projects,
  userLevel: state.Profile.user.level,
  investorLevel: state.Profile.user.investorLevel,
  baseDepositLevel: state.Profile.user.baseDepositLevel,
  isDepositButtonDisabledByInvestment:
    state.Project.isDepositButtonDisabledByInvestment,
})

/**
 * @typedef InvestorProLimit
 * @property {number} allPackages
 * @property {number} perUser
 */

/**
 * @argument {InvestorProLimit} investorProLimit - InvestorProLimit
 */
export const useIsProjectDisabled = investorProLimit => {
  const {
    projectCategory,
    investorLevel,
    baseDepositLevel,
    isDepositButtonDisabledByInvestment,
  } = useSelector(selector)

  const checkInvestorPro = project => {
    const today = new Date()
    const startDate = new Date(project.startDate)
    const dueDate = new Date(project.dueDate)
    if (startDate > today || dueDate < today) {
      return true
    }

    return (
      isInvestorProLimitExceeded(investorProLimit) ||
      !(investorLevel >= +project.investor_level)
    )
  }

  const isProjectDisabled = project => {
    if (isDepositButtonDisabledByInvestment) return true

    if (
      projectCategory.slug === "investor" ||
      projectCategory.slug === "investor-pro"
    ) {
      if (projectCategory.slug === "investor-pro")
        return checkInvestorPro(project)
      const today = new Date()
      const startDate = new Date(project.startDate)
      const dueDate = new Date(project.dueDate)
      if (startDate > today || dueDate < today) {
        return true
      }
      return !(investorLevel >= +project.investor_level)
    }

    if (projectCategory.slug === "bazovyj-paket") {
      const projectBaseLevel = parseInt(
        project.service_name.replace("basic", "")
      )
      if (baseDepositLevel >= projectBaseLevel) return true
    }

    return false
  }

  return isProjectDisabled
}
