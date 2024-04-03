import { apiService } from '../services/ApiService';
import Store from './Store';

export default class MessageStore extends Store {
  constructor() {
    super();
    this.request = {};
  }

  async sendRequest(requestData) {
    const request = await apiService.createRequest(requestData);

    this.request = request;

    this.publish();
  }

  async findRequest() {
    const request = await apiService.findRequset();

    this.request = request;

    this.publish();
  }
}

export const messageStore = new MessageStore();
