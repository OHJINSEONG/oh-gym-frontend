import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ExerciseSetStore extends Store {
  constructor() {
    super();
    this.set = {};
    this.sets = [];
  }

  async createSet(exerciseId) {
    const set = await apiService.createSets(exerciseId);

    this.set = set;

    this.publish();

    return set;
  }

  async delete(setId) {
    await apiService.deleteSet(setId);

    this.publish();
  }

  async patchData(inputData) {
    const sets = await apiService.patchSetData(inputData);

    this.sets = sets;

    this.publish();
  }
}

export const exerciseSetStore = new ExerciseSetStore();
