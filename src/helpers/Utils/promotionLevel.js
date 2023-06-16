export const PROMOTION_LEVEL_TO_GOAL_ALL_STRUCTURE = {
  3: 160_000,
  4: 200_000,
  5: 300_000,
}
export const PROMOTION_LEVEL_TO_GOAL_STRUCTURE_WITHOUT_STRONGEST = {
  3: 80_000,
  4: 100_000,
  5: 150_000,
}
export const DEFAULT_PROMOTION_LEVEL_TO_GOAL_STRUCTURE_WITHOUT_STRONGEST = 50_000
export const DEFAULT_PROMOTION_LEVEL_TO_GOAL_ALL_STRUCTURE = 100_000

/**
 * @param {number} level - Promotion Level
 * @returns {{allStructure : number; withoutStrongest : number}} Get amount of structure deposits to reach the promotion goal
 */
export const getPromotionGoalFromLevel = level => {
  if (
    PROMOTION_LEVEL_TO_GOAL_ALL_STRUCTURE[level] &&
    PROMOTION_LEVEL_TO_GOAL_STRUCTURE_WITHOUT_STRONGEST[level]
  )
    return {
      allStructure: PROMOTION_LEVEL_TO_GOAL_ALL_STRUCTURE[level],
      withoutStrongest:
        PROMOTION_LEVEL_TO_GOAL_STRUCTURE_WITHOUT_STRONGEST[level],
    }

  return {
    allStructure: DEFAULT_PROMOTION_LEVEL_TO_GOAL_ALL_STRUCTURE,
    withoutStrongest:
      DEFAULT_PROMOTION_LEVEL_TO_GOAL_STRUCTURE_WITHOUT_STRONGEST,
  }
}
