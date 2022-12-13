import { apiService } from '../services/ApiService';
import Store from './Store';

export default class LectureStore extends Store {
  constructor() {
    super();
    this.lectures = [];
  }

  async register(product, order) {
    const lectures = await apiService.register(product, order);

    this.lectures = lectures;

    this.publish();
  }

  async fetchLectures() {
    const lectures = await apiService.fetchLectures();

    this.lectures = lectures;

    this.publish();
  }
}

export const lectureStore = new LectureStore();
