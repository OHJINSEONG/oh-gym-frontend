import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useDiaryStore from '../hooks/useDiaryStore';
import useTimeStore from '../hooks/useTimeStore';
import { dateFormatter } from '../utils/DateFormatter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

export default function WorkoutPage() {
  const timeStore = useTimeStore();
  const diaryStore = useDiaryStore();

  const [, setWorkoutMode] = useLocalStorage('workoutMode', false);

  const date = dateFormatter.localDate(new Date());

  const navigator = useNavigate();

  // eslint-disable-next-line no-shadow
  const findDiary = (date) => {
    setTimeout(() => { diaryStore.findDiary(date); }, 1);
  };

  useEffect(() => {
    findDiary(date);
  }, []);

  const handleClickStart = () => {
    console.log(diaryStore);
    const firstExerciseId = diaryStore.diary.exerciseInformations[0].exercise.id;
    const diaryId = diaryStore.diary.diary.id;

    setWorkoutMode(true);

    timeStore.start();

    navigator(`/myPage/diarys/${diaryId}/exercises/${firstExerciseId}`);
  };

  const handleClickNavigate = (exerciseId) => {
    navigator(`/myPage/diarys/${diaryStore.diary.diary.id}/exercises/${exerciseId}`, {
      state: {
        date,
      },
    });
  };

  const handleClickExerciseList = async () => {
    navigator('/myPage/exercises');
  };

  return (
    <Container>
      <h1>운동하기</h1>
      {diaryStore.diary.diary?.status !== 'COMPLETE'
        ? (
          <ExercisePlan>
            <ExerciseList>
              {diaryStore.diary.exerciseInformations?.map((exercise) => (
                <Exercise key={exercise.exercise.id}>
                  <button type="button" onClick={() => handleClickNavigate(exercise.exercise.id)}>
                    <p>{exercise.exercise.name}</p>
                    {/* {exercise.sets.map((set) => (
                      <li key={set.id}>
                        {set.setNumber}
                        세트
                      </li>
                    ))} */}
                  </button>
                </Exercise>
              ))}
            </ExerciseList>
            <ExerciseAddButton type="button" onClick={handleClickExerciseList}>
              운동루틴 수정하기
            </ExerciseAddButton>
            <ExerciseAddButton type="button" onClick={handleClickStart}>
              운동시작하기
            </ExerciseAddButton>
          </ExercisePlan>
        )
        : (
          <div>
            <p>운동계획이 없습니다.</p>
          </div>
        ) }
    </Container>
  );
}
