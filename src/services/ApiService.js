/* eslint-disable class-methods-use-this */
import axios from 'axios';
import EventSource from 'eventsource';
import config from '../config';

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

    return data;
  }

  async findProduct(productId) {
    const { data } = await axios.get(`${baseUrl}/products/${productId}`);

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

  async fetchTrainerDailySchedule(trainerId, date) {
    const { data } = await axios.get(`${baseUrl}/schedules?trainerId=${trainerId}&date=${date}`);

    return data;
  }

  async fetchTrainerSchedules(trainerId) {
    const { data } = await axios.get(`${baseUrl}/schedules/list?trainerId=${trainerId}`);

    return data;
  }

  async fetchUserLectures() {
    const { data } = await axios.get(`${baseUrl}/users/lectures`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async fetchDateLectures(date) {
    const { data } = await axios.get(`${baseUrl}/lectures?date=${date}`);

    return data;
  }

  async lectureCancel(lectureId) {
    const { data } = await axios.delete(`${baseUrl}/lectures/${lectureId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

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
    const { data } = await axios.get(`${baseUrl}/diarys/list`, {
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

    return data;
  }

  async findByIdDiary(diaryId) {
    const { data } = await axios.get(`${baseUrl}/diarys/${diaryId}`);

    return data;
  }

  async completeDiary(diaryId, registerData) {
    const { data } = await axios.patch(`${baseUrl}/diarys/${diaryId}`, registerData);

    return data;
  }

  async createDiary(date) {
    const { data } = await axios.post(`${baseUrl}/diarys`, { date }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return data;
  }

  async deleteDiary(diaryId) {
    await axios.delete(`${baseUrl}/diarys/${diaryId}`);
  }

  async findLockerTicket() {
    const { data } = await axios.get(`${baseUrl}/locker-tickets`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async lockerTicketUnUse(lockerTicketId) {
    const { data } = await axios.patch(`${baseUrl}/locker-tickets/${lockerTicketId}/cancel`);

    return data;
  }

  async fetchLockerTicket(ticketId, startDate) {
    const { data } = await axios.patch(`${baseUrl}/locker-tickets/${ticketId}?date=${startDate}`);

    return data;
  }

  async fetchLocker(lockerId) {
    const { data } = await axios.patch(`${baseUrl}/lockers/${lockerId}`, { type: 'reserve' }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async lockerCancel(lockerId) {
    const { data } = await axios.patch(`${baseUrl}/lockers/${lockerId}`, { type: 'cancel' }, {
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

  async fetchPtTickets() {
    const { data } = await axios.get(`${baseUrl}/pt-tickets`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async updatePtTicketUse(ticketId, startDate) {
    const { data } = await axios.patch(`${baseUrl}/pt-tickets/${ticketId}?date=${startDate}`);

    return data;
  }

  async fetchMembershipTickets() {
    const { data } = await axios.get(`${baseUrl}/membership-tickets`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async updateMembershipUse(ticketId, startDate) {
    const { data } = await axios.patch(`${baseUrl}/membership-tickets/${ticketId}?date=${startDate}`);

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
    const { data } = await axios.post(`${baseUrl}/users`, { kakaoAccessToken });

    return data;
  }

  async testLogin() {
    const { data } = await axios.get(`${baseUrl}/users/test`);

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

  async patchSetData(inputData) {
    const { data } = await axios.patch(`${baseUrl}/sets`, inputData);

    return data;
  }

  async completeSet(setId) {
    const { data } = await axios.patch(`${baseUrl}/sets/${setId}`);

    return data;
  }

  async completeExercise(exerciseId) {
    const { data } = await axios.patch(`${baseUrl}/exercises/${exerciseId}`);

    return data;
  }

  async deleteExercise(exerciseId) {
    const { data } = await axios.delete(`${baseUrl}/exercises/${exerciseId}`);

    return data;
  }

  async findInUsePtTicket() {
    const { data } = await axios.get(`${baseUrl}/pt-tickets/use`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async findInUseMembershipTicket() {
    const { data } = await axios.get(`${baseUrl}/membership-tickets/use`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  connectSseEmitter() {
    const data = new EventSource(`${baseUrl}/notifications/connect`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async fetchNotifications() {
    const { data } = await axios.get(`${baseUrl}/notifications`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return data;
  }

  async checkNotifications() {
    const { data } = await axios.patch(`${baseUrl}/notifications/check`, {}, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return data;
  }

  async deleteNotification(notificationId) {
    await axios.delete(`${baseUrl}/notifications/${notificationId}`);
  }
}

export const apiService = new ApiService();
