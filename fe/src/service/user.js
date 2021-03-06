import fetch from '../utils/fetch';

class UserFetch {
  api = {
    register: '/user/register',
    login: '/user/login',
    logout: '/user/logout',
  }
  // 登录
  async register(data) {
    const res = await fetch.post(this.api.register, data);
    return res;
  }
  // 登录
  async login(data) {
    const res = await fetch.post(this.api.login, data);
    return res;
  }
  // 登出
  async logout() {
    const res = await fetch.post(this.api.logout);
    return res;
  }
}

export default new UserFetch();
