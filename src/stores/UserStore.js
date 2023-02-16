import { apiService } from '../services/ApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();
    this.user = {};
  }

  async fetchUser() {
    const user = await apiService.findUser();

    this.user = user;

    this.publish();
  }

  async register(kakaoAccessToken) {
    const accessToken = await apiService.createUser(kakaoAccessToken);

    this.publish();

    return accessToken;
  }

  async kakaoLogin(code) {
    const loginInfomation = await apiService.kakaoLogin(code);

    this.publish();

    return loginInfomation;
  }

  async testLogin() {
    const accessToken = await apiService.testLogin();

    this.publish();

    return accessToken;
  }

  async kakaoLogout(kakaoAccessToken) {
    await apiService.kakaoLogout(kakaoAccessToken);

    this.publish();
  }
}

export const userStore = new UserStore();
