import { apiService } from '../services/ApiService';
import Store from './Store';

export default class DiaryStore extends Store {
  constructor() {
    super();
    this.diarys = [];
    this.diary = {};
  }

  async fetchDiarys() {
    const diarys = await apiService.fetchDiarys();

    this.diarys = diarys;

    this.publish();
  }

  async findDiary(date) {
    const diary = await apiService.findDiary(date);

    this.diary = diary;

    this.publish();
  }

  async findById(diaryId) {
    const diary = await apiService.findByIdDiary(diaryId);

    this.diary = diary;

    this.publish();
  }

  async complete(diaryId, registerData) {
    const diary = await apiService.completeDiary(diaryId, registerData);

    this.diary = diary;

    this.publish();
  }

  async create(date) {
    const diary = await apiService.createDiary(date);

    this.diary = diary;

    this.publish();

    return diary;
  }

  async delete(diaryId) {
    await apiService.deleteDiary(diaryId);

    this.publish();
  }
}

export const diaryStore = new DiaryStore();
