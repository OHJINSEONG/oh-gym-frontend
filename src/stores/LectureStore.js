import { apiService } from '../services/ApiService';
import Store from './Store';

export default class LectureStore extends Store {
  constructor() {
    super();
    this.userLectures = [];
    this.trainerLectures = [];
    this.dailyUserLectures = [];
    this.dailyEmptySchedule = [];
  }

  async fetchUserLectures(userId) {
    const userLectures = await apiService.fetchUserLectures(userId);

    this.userLectures = userLectures;

    this.publish();
  }

  async makeUserSchedule(date) {
    const lectures = await apiService.fetchUserLectures();

    this.dailyUserLectures = lectures
      .filter((lecture) => lecture.date === date)
      .map((lecture) => ({
        ...lecture,
        time: (lecture.time.startsWith('0')
          ? lecture.time.replace('0', '')
          : lecture.time),
      }));

    this.publish();
  }

  async fetchTrainerSchedule(trainerId, date) {
    const schedules = await apiService.fetchTrainerSchedules(trainerId, date);

    this.dailyEmptySchedule = schedules.emptySchedules;

    this.publish();
  }
}

export const lectureStore = new LectureStore();
