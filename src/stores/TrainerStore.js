import { apiService } from '../services/ApiService';
import Store from './Store';

export default class TrainerStore extends Store {
  constructor() {
    super();
    this.trainer = {};
    this.trainers = [];
  }

  async find(trainerId) {
    const trainer = await apiService.findTrainer(trainerId);

    this.trainer = trainer;

    this.publish();
  }

  async fetchTrainers() {
    const trainers = await apiService.fetchTrainers();

    this.trainers = trainers;

    this.publish();
  }
}

export const trainerStore = new TrainerStore();
