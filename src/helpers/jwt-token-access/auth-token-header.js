export default function authHeader() {
  const obj = JSON.parse(localStorage.getItem('authUser'));

  if (obj && obj.accessToken.token) {
    return { Authorization: obj.accessToken.token };
  } else {
    return {};
  }
}
