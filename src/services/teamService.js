import { get } from "helpers/api_helper"

export const getUserStructure = async partnerId => {
  return await get(`users/team/structure/${partnerId}`)
}
