import Store from './Store';

export default class ExerciseFormStore extends Store {
  constructor() {
    super();
    this.setForms = [];
    this.exerciseInformations = [];
  }

  addExerciseData(exerciseData) {
    if (this.exerciseInformations.find((e) => e.id === exerciseData.id)) {
      this.exerciseInformations = this.exerciseInformations
        .map((e) => (e.id === exerciseData.id ? exerciseData : e));
    }

    if (!this.exerciseInformations.find((e) => e.id === exerciseData.id)) {
      this.exerciseInformations.push(exerciseData);
    }

    this.publish();
  }

  addExerciseForm(set) {
    const lastSetForm = this.setForms.length
      ? this.setForms[this.setForms.length - 1]
      : {
        setNumber: 0, weight: 0, reps: 0, status: 'CREATED',
      };

    const input = {
      id: set.id,
      setNumber: lastSetForm.setNumber + 1,
      weight: lastSetForm.weight,
      reps: lastSetForm.reps,
    };

    this.setForms = [...this.setForms, input];

    this.publish();
  }

  deleteExerciseForm() {
    const lastSetForm = this.setForms[this.setForms.length - 1];

    this.setForms = this.setForms
      .filter((item) => item.setNumber !== lastSetForm.setNumber);

    this.publish();
  }

  changeWeight(e, index) {
    const inputSetsCopy = JSON.parse(JSON.stringify(this.setForms));
    inputSetsCopy[index - 1].weight = e.target.value;
    this.setForms = inputSetsCopy;

    this.publish();
  }

  changeReps(e, index) {
    const inputSetsCopy = JSON.parse(JSON.stringify(this.setForms));
    inputSetsCopy[index - 1].reps = e.target.value;
    this.setForms = inputSetsCopy;

    this.publish();
  }

  fetchSetForms(sets) {
    this.setForms = sets;

    this.publish();
  }

  resetSetForms() {
    this.setForms = [];

    this.publish();
  }

  deleteExerciseInformation(exerciseInformationId) {
    this.exerciseInformations = this.exerciseInformations
      .filter((e) => e.id !== exerciseInformationId);

    this.publish();
  }

  deleteSetInformation(exerciseInformationId, setNumber) {
    const selectedExercise = this.exerciseInformations
      .find((e) => e.id === exerciseInformationId);

    if (selectedExercise.sets.length === 1) {
      this.deleteExerciseInformation(exerciseInformationId);
      return;
    }

    this.exerciseInformations = [...this.exerciseInformations
      .filter((e) => e.id !== exerciseInformationId), {
      ...selectedExercise,
      sets: [
        ...selectedExercise.sets
          .filter((e) => e.setNumber !== setNumber)
          .map((e, i) => ({ ...e, setNumber: i + 1 })),
      ],
    }];

    this.publish();
  }
}

export const exerciseFormStore = new ExerciseFormStore();
