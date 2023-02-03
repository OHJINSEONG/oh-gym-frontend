const { default: ExerciseFormStore } = require('./ExerciseFormStore');

describe('exerciseFormStore', () => {
  let exerciseFormStore;

  beforeEach(() => {
    exerciseFormStore = new ExerciseFormStore();
  });

  describe('addExerciseData', () => {
    it('addExerciseData', () => {
      exerciseFormStore.addExerciseData({ id: 1, name: '풀업', type: '등' });

      expect(exerciseFormStore.exerciseInformations.length).toEqual(1);
    });
  });

  describe('deleteExerciseInformation', () => {
    it('deleteExerciseInformation', () => {
      exerciseFormStore.addExerciseForm({ id: 1 });

      exerciseFormStore.deleteExerciseInformation(1);

      console.log(exerciseFormStore.setForms);

      expect(exerciseFormStore.setForms[0].weight).toEqual(0);
    });
  });

  describe('addExerciseForm', () => {
    it('addExerciseForm', () => {
      expect(exerciseFormStore.setForms.length).toEqual(0);

      exerciseFormStore.addExerciseForm({ id: 1 });

      expect(exerciseFormStore.setForms.length).toEqual(1);
    });
  });

  describe('deleteExerciseForm', () => {
    it('deleteExerciseForm', () => {
      expect(exerciseFormStore.setForms.length).toEqual(0);

      exerciseFormStore.addExerciseForm({ id: 1 });

      expect(exerciseFormStore.setForms.length).toEqual(1);

      exerciseFormStore.deleteExerciseForm();

      expect(exerciseFormStore.setForms.length).toEqual(0);
    });
  });

  describe('changeReps', () => {
    it('changeReps', () => {
      exerciseFormStore.addExerciseForm({ id: 1 });

      exerciseFormStore.changeReps({ target: { value: 10 } }, 1);

      expect(exerciseFormStore.setForms[0].reps).toEqual(10);
    });
  });

  describe('changeWeight', () => {
    it('changeWeight', () => {
      exerciseFormStore.addExerciseForm({ id: 1 });

      exerciseFormStore.changeWeight({ target: { value: 90 } }, 1);

      expect(exerciseFormStore.setForms[0].weight).toEqual(90);
    });
  });

  describe('fetchSetForms', () => {
    it('fetchSetForms', () => {
      exerciseFormStore.fetchSetForms([{ setNumber: 1, weight: 30, reps: 10 }]);

      expect(exerciseFormStore.setForms[0].weight).toEqual(30);
    });
  });

  describe('resetSetForms', () => {
    it('resetSetForms', () => {
      exerciseFormStore.resetSetForms();

      expect(exerciseFormStore.setForms).toEqual([]);
    });
  });
});
