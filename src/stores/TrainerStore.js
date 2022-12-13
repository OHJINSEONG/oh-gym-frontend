import { apiService } from '../services/ApiService';
import Store from './Store';

export default class TrainerStore extends Store {
  constructor() {
    super();
    this.trainer = {};
  }

  async find(trainerId) {
    const trainer = await apiService.findTrainer(trainerId);

    this.trainer = trainer;

    this.publish();
  }
}

export const trainerStore = new TrainerStore();
