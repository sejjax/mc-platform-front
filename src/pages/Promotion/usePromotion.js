import { get, API_URL } from "helpers/api_helper"
import { useEffect, useState } from "react"

export const usePromotion = () => {
  const [promotionData, setStructures] = useState({
    allStructure: 0,
    strongestStructure: { fullName: null, amount: 0 },
    firstStructure: 0,
    promotionLevel: 0,
    rating: [],
  })
  const { allStructure, strongestStructure } = promotionData

  const otherStructure = allStructure - strongestStructure.amount

  useEffect(() => {
    async function init() {
      const {
        allStructure,
        strongestStructure,
        rating,
        promotionLevel = 0,
        firstStructure = 0,
      } = await get(`${API_URL}/promotion`)
      setStructures({
        allStructure,
        strongestStructure,
        firstStructure,
        promotionLevel,
        rating,
      })
    }
    init()
  }, [])

  return { ...promotionData, otherStructure }
}
