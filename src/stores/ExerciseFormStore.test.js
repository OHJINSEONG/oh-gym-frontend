const { default: ExerciseFormStore } = require('./ExerciseFormStore');

const context = describe;

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
      exerciseFormStore.deleteExerciseInformation(2);

      exerciseFormStore.addExerciseForm();

      expect(exerciseFormStore.setForms[0].weight).toEqual(0);
    });
  });

  describe('addExerciseForm', () => {
    it('addExerciseForm', () => {
      expect(exerciseFormStore.setForms.length).toEqual(1);

      exerciseFormStore.addExerciseForm();

      expect(exerciseFormStore.setForms.length).toEqual(2);
    });
  });

  describe('deleteExerciseForm', () => {
    it('deleteExerciseForm', () => {
      expect(exerciseFormStore.setForms.length).toEqual(1);

      exerciseFormStore.addExerciseForm();

      expect(exerciseFormStore.setForms.length).toEqual(2);

      exerciseFormStore.deleteExerciseForm();

      expect(exerciseFormStore.setForms.length).toEqual(1);
    });
  });

  describe('changeReps', () => {
    it('changeReps', () => {
      exerciseFormStore.changeReps({ target: { value: 10 } }, 1);

      expect(exerciseFormStore.setForms[0].reps).toEqual(10);
    });
  });

  describe('changeWeight', () => {
    it('changeWeight', () => {
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

      expect(exerciseFormStore.setForms[0].weight).toEqual(0);
    });
  });
});
