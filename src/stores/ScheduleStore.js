import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ScheduleStore extends Store {
  constructor() {
    super();
    this.userSchedules = [];
    this.emptyDailySchedule = [];
  }
}

export const scheduleStore = new ScheduleStore();
