import { apiService } from '../services/ApiService';
import Store from './Store';

export default class SetStore extends Store {
  constructor() {
    super();
    this.set = {};
  }

  async completeSet(setId) {
    const set = await apiService.completeSet(setId);

    this.set = set;

    this.publish();
  }
}

export const setStore = new SetStore();
