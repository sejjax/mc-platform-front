const getAuthToken = () => {
  let accessToken

  if (localStorage.getItem("authUser")) {
    accessToken = JSON.parse(localStorage.getItem("authUser")).accessToken
  }
  if (sessionStorage.getItem("authUser")) {
    accessToken = JSON.parse(sessionStorage.getItem("authUser")).accessToken
  }

  return accessToken
}

export default getAuthToken
