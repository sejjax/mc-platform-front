import { API_UNKNOWN_ERROR } from "constants/layout"
import { API_URL, get, post } from "../helpers/api_helper"

// const SERVER_URL = "http://localhost:4000/api"

const API_REGISTER = `${API_URL}/auth/register`
const API_LOGIN = `${API_URL}/auth/login`
const API_CONFIRM = `${API_URL}/auth/confirm`
const API_FORGOT_PASSWORD = `${API_URL}/auth/forgot/password`
const API_RESET_PASSWORD = `${API_URL}/auth/reset/password`

class AuthService {
  async register(registerInfo) {
    const { country } = registerInfo

    const registerBody = {
      ...registerInfo,
      country: country.value,
    }

    try {
      const response = await post(API_REGISTER, registerBody, {
        withCredentials: true,
      })

      if (response.status >= 200 || response.status <= 299) {
        return true
      }
    } catch (error) {
      if (error.response?.data?.statusCode === 422) {
        const messages = {}
        const messageFromResponse = error.response?.data?.message ?? null
        if (messageFromResponse) {
          for (let index = 0; index < messageFromResponse.length; index++) {
            const element = messageFromResponse[index]
            messages[element.property] = element.constraints
          }
          throw messages
        }
      }
      if (error.response && error.response.data.errors?.["referrerId"]) {
        throw "ID реферала не найдено"
      }

      if (error.response && error.response.data.errors?.["username"]) {
        throw "Пользователь с таким именем уже существует"
      }

      if (error.response && error.response.data.errors?.["email"]) {
        throw "Пользователь с такой почтой уже существует"
      }

      if (error.response && error.response.data.errors?.["mobile"]) {
        throw "Пользователь с таким телефоном уже существует"
      }

      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Email Service Error"
      )
        throw "Возникла проблема с отправкой почты. Попробуйте позже"

      throw API_UNKNOWN_ERROR
    }
  }

  async login(loginInfo) {
    const loginBody = {
      identifier: loginInfo.identifier,
      password: loginInfo.password,
    }

    try {
      const response = await post(API_LOGIN, loginBody)

      if (response.status >= 200 && response.status <= 299) {
        return response.data
      }

      throw response
    } catch (error) {
      if (error.response && error.response.data.error === "notConfirmedEmail") {
        throw "Подтвердите ваш email"
      }
      if (
        error.response &&
        error.response.data.error === "incorrectIdentifierOrPassword"
      ) {
        throw "Email или пароль неверны"
      }

      throw API_UNKNOWN_ERROR
    }
  }

  async confirm(hash) {
    const body = {
      hash,
    }

    try {
      const response = await post(API_CONFIRM, body)

      if (response.status >= 200 && response.status <= 299) {
        return true
      }

      throw response
    } catch (error) {
      throw error
    }
  }

  async forgotPassword(forgotInfo) {
    const body = {
      email: forgotInfo.email,
    }

    try {
      const response = await post(API_FORGOT_PASSWORD, body)

      if (response.status >= 200 && response.status <= 299) {
        return true
      }

      throw response
    } catch (error) {
      if (error.response && error.response.data.error) {
        if (error.response.data.error === "notConfirmedEmail") {
          throw "Аккаунт не подтвержден"
        }
        if (error.response.data.error === "incorrectEmail") {
          throw "Пользователя с таким e-mail не существует"
        }
        throw error.response.data.error
      }

      throw "Почта заполнена некорректно"
    }
  }

  async resetPassword(resetInfo, hash) {
    const body = {
      password: resetInfo.password,
      hash,
    }

    try {
      const response = await post(API_RESET_PASSWORD, body)

      if (response.status >= 200 && response.status <= 299) {
        return true
      }
    } catch (error) {
      if (error.response) {
        throw error.response
      }
    }
  }
}

export const fetchReferralName = async referralId => {
  const url = `${API_URL}/auth/referral?` + new URLSearchParams({ referralId })
  const res = await get(url)
  return res
}

export default new AuthService()
