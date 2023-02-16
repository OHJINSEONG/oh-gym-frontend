import { useEffect } from 'react';
import styled from 'styled-components';
import useExerciseFormStore from '../hooks/useExerciseFormStore';
import useExerciseList from '../hooks/useExerciseList';
import useExerciseSetStore from '../hooks/useExerciseSetStore';
import useExerciseStore from '../hooks/useExerciseStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 18px;
  width: 100%;

  input {
    padding-bottom: 5px;
    width: 38px;
    height: 30px;
    border-style: none;
    border-radius: 5px;
    font-size: 20px;
    background-color: transparent;
    text-align: right;
  }

  h2{
    font-size:1.2em;
    font-weight:bolder;
  }

  label{
    font-size: 1em;
    margin-right: 3px;
  }

  img{
    width: 300px;
    height: 200px;
  }
`;

const ExerciseInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 10px 0;
  width: 95%;
  border-radius: 10px;

  h1{
    display: flex;
    justify-content:  center;
    align-items: center;
    font-size: 1.5em;
    width: 90%;
    padding-bottom: 10px;
    border-bottom: 1px solid black;
    
  }
`;

const SetFormListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  padding: 10px;
  width: 95%;
  border-radius: 10px;
  max-height: 300px;
  background-color: white;
`;

const SetFormList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-height: 228px;
  border-radius: 10px;
  overflow-y: auto;
  margin-bottom: 10px;

  .CREATED{
    background-color: white;
  }

  .COMPLETE{
    color: white;
    background-color: #df862d;
    box-shadow: 0px 0px 0px 0px gray;

    input{
      color:white;
    }
  }
`;

const SetForm = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 340px;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
  margin: 3px;
  border: 1px solid #D1D1D1;
  box-shadow: 0px 3px 3px 0px gray;

  div{
    margin: 3px;
  }
`;

const SetFormInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  p{
    font-size: 1.2em;
  }
`;

const FormEditorButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  button{
    width: 170px;
    height: 40px;
    font-size: 15px;
    color:white;
    font-weight: 600;
    border-radius: 10px;
    color: black;
    border: 1px solid #D1D1D1;
    box-shadow: 0px 3px 3px 0px gray;
  }
`;

export default function Exercise({ exerciseId, value, setValue }) {
  const exerciseStore = useExerciseStore();
  const exerciseSetStore = useExerciseSetStore();
  const exerciseList = useExerciseList();
  const exerciseFormStore = useExerciseFormStore();

  const { setForms } = exerciseFormStore;

  const exercise = exerciseList.find((e) => e.name === exerciseStore.exerciseName);

  const addInput = async () => {
    const set = await exerciseSetStore.createSet(exerciseId);
    await exerciseFormStore.addExerciseForm(set);

    setValue((e) => e + 1);
  };

  const deleteInput = async () => {
    await exerciseSetStore.delete(setForms[setForms.length - 1].id);
    await exerciseFormStore.deleteExerciseForm();

    setValue((e) => e + 1);
  };

  const fetchSets = () => {
    exerciseSetStore.patchData({ exerciseId, sets: exerciseFormStore.setForms });
    exerciseFormStore.resetSetForms();
  };

  const findExercise = async () => {
    // eslint-disable-next-line no-shadow
    const exercise = await exerciseStore.find(exerciseId);

    const sets = exercise.sets.sort((a, b) => a.setNumber - b.setNumber);

    // eslint-disable-next-line no-unused-expressions
    exercise.sets.length ? exerciseFormStore.fetchSetForms(sets)
      : await addInput();
  };

  useEffect(() => {
    findExercise();

    return () => fetchSets();
  }, [value]);

  const handleChangeWeight = (e, index) => {
    exerciseFormStore.changeWeight(e, index);
  };

  const handleChangeReps = (e, index) => {
    exerciseFormStore.changeReps(e, index);
  };

  return (
    <Container>
      <ExerciseInformation>
        <h1>{exercise?.name}</h1>
        <img src={exercise?.img} />
      </ExerciseInformation>
      <SetFormListWrapper>
        <SetFormList>
          {setForms?.map((setForm) => (
            <SetForm className={setForm.status} key={setForm.id}>
              <h2>
                {setForm.setNumber}
                세트
              </h2>
              <SetFormInput>
                <label htmlFor="input-weight">무게</label>
                <input
                  type="text"
                  className={`title-${setForm.setNumber}`}
                  onChange={(e) => handleChangeWeight(e, setForm.setNumber)}
                  value={setForm.weight}
                />
                <p>kg</p>
              </SetFormInput>
              <SetFormInput>
                <label htmlFor="input-reps">횟수</label>
                <input
                  type="text"
                  className={`title-${setForm.setNumber}`}
                  onChange={(e) => handleChangeReps(e, setForm.setNumber)}
                  value={setForm.reps}
                />
                <p>회</p>
              </SetFormInput>
            </SetForm>
          ))}
        </SetFormList>
        {exerciseStore.exercise?.exercise?.status !== 'COMPLETE'
          ? (
            <FormEditorButtonWrapper>
              <button type="button" onClick={() => addInput()}>세트 추가</button>
              <button type="button" onClick={() => deleteInput()}>세트 제거</button>
            </FormEditorButtonWrapper>
          )
          : null}
      </SetFormListWrapper>
    </Container>
  );
}
