import { investorProAllLimit, investorProPerUserLimit } from "constants/deposit"

/**
 * @type {(investorLimits : import("../pages/Projects/hooks/useIsProjectDisabled").InvestorProLimit) => boolean}
 */
export const isInvestorProLimitExceeded = ({ allPackages, perUser }) =>
  allPackages >= investorProAllLimit || perUser >= investorProPerUserLimit
