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

    console.log(data);

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

  async fetchTrainerSchedules(trainerId, date) {
    const { data } = await axios.get(`${baseUrl}/schedules?trainerId=${trainerId}&date=${date}`);

    console.log(data);

    return data;
  }

  async fetchUserLectures(userId) {
    const { data } = await axios.get(`${baseUrl}/users/${userId}/lectures`);

    console.log(data);

    return data;
  }

  async fetchDateLectures(date) {
    const { data } = await axios.get(`${baseUrl}/lectures?date=${date}`);

    console.log(data);

    return data;
  }

  async findUser() {
    const { data } = await axios.get(`${baseUrl}/users`);

    console.log(data);

    return data;
  }

  async findTrainer(trainerId) {
    const { data } = await axios.get(`${baseUrl}/trainers/${trainerId}`);

    console.log(data);

    return data;
  }

  async createRequest(requestData) {
    const { data } = await axios.post(`${baseUrl}/requests`, requestData);

    console.log(requestData);
    console.log(data);

    return data;
  }
}

export const apiService = new ApiService();
