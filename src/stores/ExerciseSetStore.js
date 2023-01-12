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

    this.publish();

    return set;
  }

  async delete(setId) {
    await apiService.deleteSet(setId);

    this.publish();
  }

  async fetchData(inputData) {
    const sets = await apiService.fetchSetData(inputData);

    this.sets = sets;

    console.log(sets);

    this.publish();
  }
}

export const exerciseSetStore = new ExerciseSetStore();
