import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useDiaryStore from '../hooks/useDiaryStore';
import useExerciseFormStore from '../hooks/useExerciseFormStore';
import useExerciseSetStore from '../hooks/useExerciseSetStore';
import useExerciseStore from '../hooks/useExerciseStore';
import Timer from './Timer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;

  input {
    width: 50px;
  }

  h1{
    font-size: 1.5em;
  }

  h2{
    font-size:1.2em
  }

  label{
    font-size: .8em;
  }
`;

const SetFormList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const SetForm = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 3px;
  border: 1px solid black;

  div{
    margin: 3px;
  }
`;

const SetFormInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  p{
    font-size: .8em;
  }
`;

const FormEditorButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button{
    padding: 10px 15px;
    border: 1px solid black;
  }
`;

const ExerciseAddButton = styled.button`
    margin-top: 20px;
    padding: 20px 25px;
    border: 1px solid black;
    border-radius: 10px;
`;

export default function AddPlan() {
  const navigator = useNavigate();
  const diaryStore = useDiaryStore();
  const { exerciseId, diaryId } = useParams();

  const exerciseStore = useExerciseStore();
  const exerciseSetStore = useExerciseSetStore();

  const exerciseFormStore = useExerciseFormStore();

  const [mode, setMode] = useState(false);

  const { setForms } = exerciseFormStore;

  const addInput = async () => {
    const setId = await exerciseSetStore.createSet(exerciseId);
    exerciseFormStore.addExerciseForm(setId);
  };

  const fetchSets = () => {
    exerciseSetStore.fetchData({ exerciseId, sets: exerciseFormStore.setForms });
    exerciseFormStore.resetSetForms();

    console.log('렌더링전');
  };

  const findExercise = async () => {
    // eslint-disable-next-line no-shadow
    const exercise = await exerciseStore.find(exerciseId);

    // eslint-disable-next-line no-unused-expressions
    exercise.sets.length ? exerciseFormStore.fetchSetForms(exercise.sets)
      : await addInput();
  };

  useEffect(() => {
    findExercise();

    console.log(exerciseStore);

    diaryStore.findDiaryById(diaryId);

    return () => fetchSets();
  }, []);

  const handleChangeWeight = (e, index) => {
    exerciseFormStore.changeWeight(e, index);
  };

  const handleChangeReps = (e, index) => {
    exerciseFormStore.changeReps(e, index);
  };

  const deleteInput = async () => {
    console.log(setForms[setForms.length - 1].id);
    await exerciseSetStore.delete(setForms[setForms.length - 1].id);
    exerciseFormStore.deleteExerciseForm();
  };

  const setComplete = async (setId) => {
    await exerciseSetStore.complete(setId);
  };

  return (
    <Container>
      <Timer mode={mode} />
      <h1>{exerciseStore.exercise.name}</h1>
      <SetFormList>
        {setForms?.map((setForm) => (
          <SetForm key={setForm.id}>
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
            <button type="button" onClick={() => setComplete(setForm.id)}>완료</button>
          </SetForm>
        ))}
      </SetFormList>
      <FormEditorButtonWrapper>
        <button type="button" onClick={() => addInput()}>세트 추가</button>
        <button type="button" onClick={() => deleteInput()}>세트 제거</button>
      </FormEditorButtonWrapper>
      <ExerciseAddButton type="button" onClick={() => console.log('qwe')}>
        운동시작
      </ExerciseAddButton>
      <ExerciseAddButton
        type="button"
        onClick={() => navigator('/myPage/diarys', {
          state: {
            date: diaryStore.diary.date,
          },
        })}
      >
        뒤로가기
      </ExerciseAddButton>
    </Container>
  );
}
