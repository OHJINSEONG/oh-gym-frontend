import { apiService } from '../services/ApiService';
import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();
    this.orders = [];
    this.order = {};
  }

  async create(productId) {
    const order = await apiService.createOrder(productId);

    this.order = order;

    this.publish();
  }

  async fetchOrders() {
    const orders = await apiService.fetchOrders();

    this.orders = orders;

    this.publish();
  }

  async findOrder(orderId) {
    const order = await apiService.findOrder(orderId);

    this.order = order;

    this.publish();
  }
}

export const orderStore = new OrderStore();
