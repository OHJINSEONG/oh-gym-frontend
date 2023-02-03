import { apiService } from '../services/ApiService';
import Store from './Store';

export default class LectureStore extends Store {
  constructor() {
    super();
    this.userLectures = [];
    this.trainerLectures = [];
    this.dailyUserLecture = {};
    this.dailyEmptySchedule = [];
    this.schedules = [];
    this.emptySchedules = [];
  }

  async fetchUserLectures() {
    const userLectures = await apiService.fetchUserLectures();

    this.userLectures = userLectures;

    this.publish();
  }

  async makeUserSchedule(date) {
    const lectures = await apiService.fetchUserLectures();

    this.dailyUserLecture = lectures
      .find((lecture) => lecture.date === date);

    this.publish();
  }

  async fetchTrainerSchedule(trainerId, date) {
    const schedules = await apiService.fetchTrainerDailySchedule(trainerId, date);

    this.dailyEmptySchedule = schedules.emptySchedules;
    this.schedules = schedules;

    this.publish();
  }

  async fetchTrainerSchedules(trainerId) {
    const emptySchedules = await apiService.fetchTrainerSchedules(trainerId);

    this.emptySchedules = emptySchedules;
    this.publish();
  }

  async cancel(lectureId) {
    await apiService.lectureCancel(lectureId);

    this.publish();
  }
}

export const lectureStore = new LectureStore();
