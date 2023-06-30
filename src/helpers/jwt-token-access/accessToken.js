const accessToken = {
  token: '',
  get header() {
    return `Bearer ${this.token}`;
  },
  reload() {
    if (localStorage.getItem('authUser')) {
      this.token = JSON.parse(localStorage.getItem('authUser')).accessToken;
    }
    if (sessionStorage.getItem('authUser')) {
      this.token = JSON.parse(sessionStorage.getItem('authUser')).accessToken;
    }

    for (const cb of this.callbacks) {
      cb(this.token);
    }
  },
  callbacks: [],
  onUpdate(cb) {
    this.callbacks.push(cb);
  },
};

accessToken.reload();

export default accessToken;
