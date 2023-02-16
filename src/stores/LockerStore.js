import { apiService } from '../services/ApiService';
import Store from './Store';

export default class LockerStore extends Store {
  constructor() {
    super();
    this.lockers = [];
    this.locker = {};
  }

  async fetchLockers() {
    const lockers = await apiService.fetchLockers();

    this.lockers = lockers;

    this.publish();
  }

  async fetchLocker(lockerId) {
    const locker = await apiService.fetchLocker(lockerId);

    this.locker = locker;

    this.lockers = this.lockers.map((e) => (e.id === lockerId ? locker : e));

    this.publish();
  }

  async lockerCancel(lockerId) {
    const locker = await apiService.lockerCancel(lockerId);

    this.locker = locker;

    this.lockers = this.lockers.map((e) => (e.id === lockerId ? locker : e));

    this.publish();
  }
}

export const lockerStore = new LockerStore();
