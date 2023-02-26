import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useDiaryStore from '../hooks/useDiaryStore';
import useExerciseStore from '../hooks/useExerciseStore';
import useTimeStore from '../hooks/useTimeStore';
import { dateFormatter } from '../utils/DateFormatter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  padding-top: 70px;
  width: 400px;
  height: 844px;
`;

const ExercisePlan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ExerciseList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 650px;
  padding: 3px;
  border: 1px solid #D1D1D1;

  .CREATED{
    background-color: white;
  }

  .COMPLETE{
    background-color: #df862d;
    button{
    color: white;
    }
  }
`;

const Exercise = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;  
  border: 1px solid #D1D1D1;
  width: 100%;
  box-shadow: 0px 3px 3px 0px gray;
  margin-bottom: 3px;

  button{
    display: flex;
    font-size: 16px;
    font-weight: 600;
    justify-content: start;
    align-items: center;  
    padding: 20px 10px;
    color:gray;
  }
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 85%;
    justify-content: space-between;
    align-items: center;  
`;

const ExercsieListButton = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;  
    width: 100%;
    height: 65px;
 `;

const ExerciseAddButton = styled.button`
  margin-top: 30px;
  height: 60px;
  width: 150px;
  border-radius: 20px;
  color: white;
  box-shadow: 0px 3px 3px 0px gray;
  background-color: #EF781A;
`;

export default function ExerciseListPage() {
  const [workoutMode, setWorkoutMode] = useLocalStorage('workoutMode', false);
  const diaryStore = useDiaryStore();
  const timeStore = useTimeStore();
  const [value, setValue] = useState(0);
  const exerciseStore = useExerciseStore();

  const date = dateFormatter.localDate(new Date());

  const navigator = useNavigate();

  // eslint-disable-next-line no-shadow
  const findDiary = (date) => {
    setTimeout(() => { diaryStore.findDiary(date); }, 1);
  };

  useEffect(() => {
    findDiary(date);

    console.log(diaryStore.diary);
  }, [value]);

  const handleClickNavigate = (exerciseId) => {
    navigator(`/diarys/${diaryStore.diary.diary.id}/exercises/${exerciseId}`, {
      state: {
        date,
      },
    });
  };

  const handleClickCreateDiary = async () => {
    const createdDiary = await diaryStore.create(date);
    navigator(`/diarys/${createdDiary.id}/exercises`, { state: { date } });
  };

  const handleClickDiaryRegister = () => {
    navigator('/diarys/complete');
  };

  const handleClickDelete = async (exerciseId) => {
    await exerciseStore.delete(exerciseId);
    setValue(value + 1);
  };

  const handleClickStart = () => {
    const firstExerciseId = diaryStore.diary.exerciseInformations[0].exercise.id;
    const diaryId = diaryStore.diary.diary?.id;

    setWorkoutMode(true);

    timeStore.start();

    navigator(`/diarys/${diaryId}/exercises/${firstExerciseId}`);
  };

  return (
    <Container>
      {diaryStore.diary.diary?.status !== 'COMPLETE'
        ? (
          <ExercisePlan>
            <ExerciseList>
              {diaryStore.diary.exerciseInformations?.map((exercise, index) => (
                <Exercise className={exercise.exercise.status} key={exercise.exercise.id}>
                  <ExercsieListButton>
                    <button type="button" onClick={() => handleClickNavigate(exercise.exercise.id)}>
                      <p>
                        {index + 1}
                        .
                      </p>
                      <p>{exercise.exercise.name}</p>
                    </button>
                    <button type="button" onClick={() => handleClickDelete(exercise.exercise.id)}>X</button>
                  </ExercsieListButton>
                </Exercise>
              ))}
            </ExerciseList>
            <ButtonWrapper>
              <ExerciseAddButton type="button" onClick={handleClickCreateDiary}>
                운동계획 추가하기
              </ExerciseAddButton>
              {workoutMode
                ? (
                  <ExerciseAddButton type="button" onClick={handleClickDiaryRegister}>
                    운동 기록하러가기
                  </ExerciseAddButton>
                )
                : (
                  <ExerciseAddButton type="button" onClick={handleClickStart}>
                    운동 시작하기
                  </ExerciseAddButton>
                )}
            </ButtonWrapper>
          </ExercisePlan>
        )
        : (
          <div>
            <p>운동계획이 없습니다</p>
            <ExerciseAddButton type="button" onClick={handleClickCreateDiary}>
              {date.split('-')[2]}
              일
              운동계획 만들기
            </ExerciseAddButton>
          </div>
        ) }
    </Container>
  );
}
