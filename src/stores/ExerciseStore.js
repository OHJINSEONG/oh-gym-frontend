import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ExerciseStore extends Store {
  constructor() {
    super();
    this.exercisePlans = [];
    this.exercise = {};
    this.sets = [];
  }

  async fetchExercises(diaryId) {
    const exercisePlans = await apiService.fetchExercises(diaryId);

    this.exercisePlans = exercisePlans;

    this.publish();
  }

  async find(exerciseId) {
    const exercise = await apiService.findExercise(exerciseId);

    this.exercise = exercise;

    this.publish();

    return exercise;
  }

  async create(exerciseInformation) {
    const exercise = await apiService.createExercise(exerciseInformation);

    this.publish();

    return exercise;
  }

  async createSets(setImformation) {
    const sets = await apiService.createSets(setImformation);

    this.sets = sets;

    this.publish();
  }
}

export const exerciseStore = new ExerciseStore();
