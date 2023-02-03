import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ExerciseStore extends Store {
  constructor() {
    super();
    this.exercise = {};
    this.exerciseName = '';
    this.sets = [];
  }

  async find(exerciseId) {
    const exercise = await apiService.findExercise(exerciseId);

    this.exerciseName = exercise.exercise.name;

    this.exercise = exercise;

    this.publish();

    return exercise;
  }

  async create(exerciseInformation) {
    const exercise = await apiService.createExercise(exerciseInformation);

    this.exercise = exercise;

    this.publish();

    return exercise;
  }

  async complete(exerciseId) {
    const exercise = await apiService.completeExercise(exerciseId);

    this.exercise = exercise;

    this.publish();
  }

  async delete(exerciseId) {
    await apiService.deleteExercise(exerciseId);

    this.publish();
  }
}

export const exerciseStore = new ExerciseStore();
