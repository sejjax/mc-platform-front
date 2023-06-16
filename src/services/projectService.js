import axios from "axios"
import { API_URL, get } from "helpers/api_helper"
import { timeoutPromise } from "helpers/Utils/timeoutPromise"

const STRAPI_URL = process.env.REACT_APP_STRAPI_URL
// const STRAPI_URL = "http://localhost:1336"
export async function getProjectsList() {
  try {
    const response = await axios.get(`${STRAPI_URL}/project-categories/list`)

    if (response.status >= 200 && response.status <= 299) {
      return response.data
    }
  } catch (error) {
    throw error
  }
}

export async function getAllProjects() {
  return await axios.get(`${STRAPI_URL}/projects`)
}

export async function getProjects(categorySlug) {
  const response = await axios.get(
    `${STRAPI_URL}/project-categories/${categorySlug}`
  )

  if (response.status >= 200 && response.status <= 299) {
    return response.data
  }
}

export async function getProjectsDetails(projectSlug) {
  const response = await axios.get(`${STRAPI_URL}/projects/${projectSlug}`)

  if (response.status >= 200 && response.status <= 299) {
    return response.data
  }
}

export async function getRisks() {
  const response = await axios.get(`${STRAPI_URL}/risks`)

  if (response.status >= 200 && response.status <= 299) {
    return response.data
  }
}

export const checkTransaction = async transactionId => {
  const data = await get(
    `${API_URL}/transactions?` + new URLSearchParams({ transactionId })
  )
  return data
}

const maxRetries = 40
export const retriesExceededErrorName = "Retries Exceeded"
export const checkTransactionLongPolling = async (transactionId, retry = 0) => {
  if (retry === maxRetries) throw new Error(retriesExceededErrorName)
  const data = await get(
    `${API_URL}/transactions?` + new URLSearchParams({ transactionId })
  )
  if (data.transaction_status === "accepted") return data
  if (
    data.transaction_status !== "cancelled" &&
    data.transaction_status !== "scam"
  ) {
    await timeoutPromise(10000)
    return checkTransactionLongPolling(transactionId, retry + 1)
  }
  throw new Error("Transaction error")
}
