import { apiService } from '../services/ApiService';
import Store from './Store';

export default class DiaryStore extends Store {
  constructor() {
    super();
    this.diarys = [];
    this.diary = {};
    this.diaryById = {};
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

  async findDiaryById(diaryId) {
    const diary = await apiService.findDiaryById(diaryId);

    this.diary = diary;

    this.publish();
  }

  async create(date) {
    const diary = await apiService.createDiary(date);

    this.publish();

    return diary;
  }
}

export const diaryStore = new DiaryStore();
