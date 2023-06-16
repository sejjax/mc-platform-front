import { get } from "helpers/api_helper"

export const fetchInvestments = async () => {
  const response = await get("user/deposit")
  return response
}
