/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchProducts() {
    const { data } = await axios.get(`${baseUrl}/products`);

    return data.productDtos;
  }

  async findProduct(productId) {
    const { data } = await axios.get(`${baseUrl}/products/${productId}`);

    return data;
  }

  async fetchExercises(diaryId) {
    const { data } = await axios.get(`${baseUrl}/exercises?diaryId=${diaryId}`);

    return data;
  }

  async createExercise(exerciseImformation) {
    const { data } = await axios.post(`${baseUrl}/exercises`, exerciseImformation);

    return data;
  }

  async findExercise(exerciseId) {
    const { data } = await axios.get(`${baseUrl}/exercises/${exerciseId}`);

    return data;
  }

  async fetchOrders() {
    const { data } = await axios.get(`${baseUrl}/orders`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async findOrder(orderId) {
    const { data } = await axios.get(`${baseUrl}/orders/${orderId}`);

    return data;
  }

  async createOrder(orderImformation) {
    const { data } = await axios.post(`${baseUrl}/orders`, orderImformation, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async fetchTrainerSchedules(trainerId, date) {
    const { data } = await axios.get(`${baseUrl}/schedules?trainerId=${trainerId}&date=${date}`);

    return data;
  }

  async fetchUserLectures() {
    const { data } = await axios.get(`${baseUrl}/users/lectures`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    console.log(data);

    return data;
  }

  async fetchDateLectures(date) {
    const { data } = await axios.get(`${baseUrl}/lectures?date=${date}`);

    return data;
  }

  async findTrainer(trainerId) {
    const { data } = await axios.get(`${baseUrl}/trainers/${trainerId}`);

    return data;
  }

  async fetchTrainers() {
    const { data } = await axios.get(`${baseUrl}/trainers`);

    return data;
  }

  async createRequest(requestData) {
    const { data } = await axios.post(`${baseUrl}/requests`, requestData, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async fetchDiarys() {
    const { data } = await axios.get(`${baseUrl}/diarys`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async findDiary(date) {
    const { data } = await axios.get(`${baseUrl}/diarys?date=${date}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    console.log(data);

    return data;
  }

  async findDiaryById(diaryId) {
    const { data } = await axios.get(`${baseUrl}/diarys/${diaryId}`);

    return data;
  }

  async createDiary(date) {
    const { data } = await axios.post(`${baseUrl}/diarys`, { date }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    console.log(data);
    return data;
  }

  async findLockerTicket() {
    const { data } = await axios.get(`${baseUrl}/locker-tickets`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    console.log(data);

    return data;
  }

  async fetchLockerTicket(ticketId, startDate) {
    const { data } = await axios.patch(`${baseUrl}/locker-tickets/${ticketId}?date=${startDate}`);

    return data;
  }

  async fetchLocker(lockerId) {
    const { data } = await axios.patch(`${baseUrl}/lockers/${lockerId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async fetchLockers() {
    const { data } = await axios.get(`${baseUrl}/lockers`);

    return data;
  }

  async fetchTickets() {
    const { data } = await axios.get(`${baseUrl}/pt-tickets`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async findTicket(ticketId) {
    const { data } = await axios.get(`${baseUrl}/pt-tickets/${ticketId}`);

    return data;
  }

  async findUser() {
    const { data } = await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async createUser(kakaoAccessToken) {
    console.log(kakaoAccessToken);

    const { data } = await axios.post(`${baseUrl}/users`, { kakaoAccessToken });

    return data;
  }

  async kakaoLogin(code) {
    const { data } = await axios.get(`${baseUrl}/kakao/session?code=${code}`);

    return data;
  }

  async kakaoLogout(kakaoAccessToken) {
    const { data } = await axios.post(`${baseUrl}/kakao/session`, { kakaoAccessToken });

    return data;
  }

  async fetchPayResult(pgToken) {
    const { data } = await axios.get(`${baseUrl}/orders/kakaoPaySuccess?pg_token=${pgToken}`);

    return data;
  }

  async logout(kakaoAccessToken) {
    const { data } = await axios.post('https://kapi.kakao.com/v1/user/unlink', {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
        ContentType: 'application/x-www-form-urlencoded',
      },
    });

    return data;
  }

  async fetchMyChattingRooms() {
    const { data } = await axios.get(`${baseUrl}/users/chattingRooms`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async createChattingRoom(trainerId) {
    const { data } = await axios.post(`${baseUrl}/chattingRooms`, { trainerId }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async createSets(exerciseId) {
    const { data } = await axios.post(`${baseUrl}/sets`, { exerciseId });

    return data;
  }

  async deleteSet(setId) {
    await axios.delete(`${baseUrl}/sets/${setId}`);
  }

  async fetchSetData(inputData) {
    const { data } = await axios.patch(`${baseUrl}/sets`, inputData);

    return data;
  }
}

export const apiService = new ApiService();
