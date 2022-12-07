/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  async fetchProducts() {
    const { data } = await axios.get(`${baseUrl}/products`);

    return data.productDtos;
  }

  async findProduct(productId) {
    const { data } = await axios.get(`${baseUrl}/products/${productId}`);

    return data;
  }

  async fetchOrders() {
    const { data } = await axios.get(`${baseUrl}/orders`);

    return data;
  }

  async findOrder(orderId) {
    const { data } = await axios.get(`${baseUrl}/orders/${orderId}`);

    return data;
  }

  async createOrder(productId) {
    const { data } = await axios.post(`${baseUrl}/orders`, { productId, ptStartDate: '2022/12/06' });

    return data;
  }

  async register(product, order) {
    const { data } = await axios.post(`${baseUrl}/lectures`, {
      orderId: order.id,
      trainer: product.trainer,
      consumer: '',
      ptTimes: product.ptTimes,
      timeOfPt: product.time,
      dayOfWeek: product.dayOfWeek,
      ptStartDate: order.ptStartDate,
    });

    return data;
  }

  async fetchLectures() {
    const { data } = await axios.get(`${baseUrl}/lectures`);

    return data;
  }
}

export const apiService = new ApiService();
