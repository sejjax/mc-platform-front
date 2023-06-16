const getAuthUser = () => {
  let user

  if (localStorage.getItem("authUser")) {
    user = JSON.parse(localStorage.getItem("authUser")).user
  }
  if (sessionStorage.getItem("authUser")) {
    user = JSON.parse(sessionStorage.getItem("authUser")).user
  }

  return user
}

export default getAuthUser
