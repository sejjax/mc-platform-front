import { API_AUTH_ERROR, API_UNKNOWN_ERROR } from "constants/layout"
import { get, patch, post, postFormData } from "../helpers/api_helper"
import getUserPhoto from "../helpers/GetUserPhoto"

class UserService {
  async userUpdate(body) {
    const payload = {
      ...body,
      country: body.country.value ?? "",
    }

    try {
      const response = await patch("/auth/me", payload)

      if (response.status >= 200 && response.status <= 299) {
        return response.data
      }
    } catch (error) {
      if (error.response && error.response.data?.statusCode === 400) {
        throw "Данные некорректны, проверьте еще раз"
      }

      if (error.response && error.response.data?.statusCode === 401) {
        throw API_AUTH_ERROR
      }

      throw API_UNKNOWN_ERROR
    }
  }

  async getProfile() {
    const response = await get("users/me/profile")
    return response
  }

  async uploadPhoto(body) {
    try {
      const response = await postFormData("/users/me/upload", body)

      if (response.status >= 200 && response.status <= 299) {
        return response.data
      }
    } catch (error) {
      if (error.response && error.response.data?.statusCode === 400) {
        throw "Загружаемые данные не корректны"
      }

      if (error.response && error.response.data?.statusCode === 401) {
        throw API_AUTH_ERROR
      }

      if (error.response && error.response.data?.statusCode === 413) {
        throw "Ошибка загрузки файла. Загрузите файл менее 7 мегабайт"
      }

      throw "Ошибка загрузки фотографии, попробуйте позже"
    }
  }

  async getPhoto() {
    try {
      return await getUserPhoto()
    } catch (e) {
      throw "Фото не загружается, попробуйте позже"
    }
  }

  async updateWalletNumber(walletNumber) {
    const response = await post("/users/me/defaultWallet", {
      default_wallet_address: walletNumber,
    })
    return response.data
  }

  async getDashBoardIncomeData() {
    const response = await get("/users/me/income")
    return response.data
  }

  async setAgreement(agreement) {
    const response = await post("/users/me/agreement", {
      agreement,
    })
    return response.data
  }
}

export default new UserService()
