const { default: ExerciseStore } = require('./ExerciseStore');

const context = describe;

describe('exerciseStore', () => {
  let exerciseStore;

  beforeEach(() => {
    exerciseStore = new ExerciseStore();
  });

  describe('fetchExercises', () => {
    it('fetchExercises', async () => {
      await exerciseStore.fetchExercises(1);

      expect(exerciseStore.exercisePlans.length).toEqual(1);
    });
  });
});
