import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PlanList from '../conponents/PlanList';
import useDiaryStore from '../hooks/useDiaryStore';
import useExerciseFormStore from '../hooks/useExerciseFormStore';
import useExerciseList from '../hooks/useExerciseList';
import useExerciseStore from '../hooks/useExerciseStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid black;
  }
`;

const ExerciseType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExerciseList = styled.ul`
  border: 1px solid black;
  overflow-y: auto;
  width: 300px;
  max-height: 250px;
`;

export default function PlanerPage() {
  const exerciseFormStore = useExerciseFormStore();
  const diaryStore = useDiaryStore();
  const exerciseStore = useExerciseStore();

  const navigator = useNavigate();

  const location = useLocation();

  const { diaryId } = useParams();

  const { diary } = diaryStore;

  const { date } = location.state;

  const { exerciseInformations } = exerciseFormStore;

  const exerciseList = useExerciseList();

  const [type, setType] = useState('');

  const handleClickAddExercise = async (exerciseName, exerciseType) => {
    const exercise = await exerciseStore.create({
      diaryId,
      name: exerciseName,
      type: exerciseType,
    });
    navigator(`${exercise.id}`);
  };

  useEffect(() => {
    diaryStore.findDiary(date);
    console.log(exerciseInformations);
    console.log(diaryId);
  }, []);

  const handleClickCreateDiary = async () => {
    await diaryStore.fetch(diary.diary.id);
    navigator(`/myPage/diarys/${diary.diary.id}`, {
      state: {
        date,
      },
    });
  };

  return (
    <Container>
      <ExerciseType>
        <button type="button" onClick={() => (type === '' ? setType('하체') : setType(''))}>하체</button>
        <button type="button" onClick={() => (type === '' ? setType('가슴') : setType(''))}>가슴</button>
        <button type="button" onClick={() => (type === '' ? setType('등') : setType(''))}>등</button>
        <button type="button" onClick={() => (type === '' ? setType('어깨') : setType(''))}>어깨</button>
        <button type="button" onClick={() => (type === '' ? setType('팔') : setType(''))}>팔</button>
      </ExerciseType>
      <ExerciseList>
        {exerciseList
          .filter((exercise) => exercise.type === type)
          .map((exercise) => (
            <li key={exercise.id}>
              <p>{exercise.name}</p>
              <button type="button" onClick={() => handleClickAddExercise(exercise.name, exercise.type)}>추가</button>
            </li>
          ))}
      </ExerciseList>
      <PlanList date={date} handleClickCreateDiary={handleClickCreateDiary} />
    </Container>
  );
}
