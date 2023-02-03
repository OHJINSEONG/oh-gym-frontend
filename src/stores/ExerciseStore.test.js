const { default: ExerciseStore } = require('./ExerciseStore');

const context = describe;

describe('exerciseStore', () => {
  let exerciseStore;

  beforeEach(() => {
    exerciseStore = new ExerciseStore();
  });

  describe('find', () => {
    it('find', async () => {
      await exerciseStore.find(1);

      expect(exerciseStore.exercise.exercise.name).toEqual('풀업');
    });
  });

  describe('create', () => {
    it('create', async () => {
      await exerciseStore.create({ diaryId: 1, name: '풀업', type: '등' });

      expect(exerciseStore.exercise.exercise.name).toEqual('풀업');
    });
  });

  describe('complete', () => {
    it('complete', async () => {
      await exerciseStore.complete(1);

      expect(exerciseStore.exercise.exercise.status).toEqual('COMPLETE');
    });
  });
});
