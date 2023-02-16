import { apiService } from '../services/ApiService';
import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();
    this.orders = [];
    this.order = {};
    this.paymentResult = {};
  }

  async create(orderImformation) {
    const kakaoPayUrl = await apiService.createOrder(orderImformation);

    this.publish();

    return kakaoPayUrl;
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

  async fetchPayResult(pgtoken) {
    const paymentResult = await apiService.fetchPayResult(pgtoken);

    this.paymentResult = paymentResult;

    this.publish();
  }
}

export const orderStore = new OrderStore();
