const { default: ExerciseSetStore } = require('./ExerciseSetStore');

const context = describe;

describe('exerciseSetStore', () => {
  let exerciseSetStore;

  beforeEach(() => {
    exerciseSetStore = new ExerciseSetStore();
  });

  describe('createSet', () => {
    it('createSet', async () => {
      await exerciseSetStore.createSet(1);

      expect(exerciseSetStore.set.id).toEqual(1);
    });
  });

  describe('findDiary', () => {
    it('findDiary', async () => {
      await exerciseSetStore.patchData({
        exerciseId: 1,
        sets: [{
          id: 1, reps: 10, weight: 40, setNumber: 1,
        }],
      });

      expect(exerciseSetStore.sets[0].id).toEqual(1);
    });
  });
});
