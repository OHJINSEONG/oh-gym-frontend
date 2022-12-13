import { apiService } from '../services/ApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();
    this.user = {};
  }

  async find() {
    const user = await apiService.findUser();

    this.user = user;

    this.publish();
  }
}

export const userStore = new UserStore();
