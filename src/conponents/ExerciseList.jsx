import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useDiaryStore from '../hooks/useDiaryStore';
import { dateFormatter } from '../utils/DateFormatter';
import useExerciseStore from '../hooks/useExerciseStore';
import useTimeStore from '../hooks/useTimeStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 400px;
  height: 800px;
`;

const ExercisePlan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ExercisePlanList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 490px;
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
    justify-content: space-between;
    align-items: center;  
    width: 90%;
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
  width: 170px;
  border-radius: 20px;
  color: white;
  box-shadow: 0px 3px 3px 0px gray;
  background-color: #EF781A;
`;

export default function ExerciseList({ setSlideMode, setValue }) {
  const [workoutMode, setWorkoutMode] = useLocalStorage('workoutMode', false);
  const timeStore = useTimeStore();
  const dairyStore = useDiaryStore();
  const exerciseStore = useExerciseStore();
  const location = useLocation();

  const path = location.pathname;

  const date = dateFormatter.localDate(new Date());

  const navigator = useNavigate();

  // eslint-disable-next-line no-shadow
  const findDiary = (date) => {
    setTimeout(() => { dairyStore.findDiary(date); }, 1);
  };

  useEffect(() => {
    findDiary(date);
  }, []);

  const handleClickNavigate = async (exerciseId) => {
    if (Number(path.split('exercises/')[1]) !== exerciseId) {
      await navigator(`/diarys/${dairyStore.diary.diary.id}/exercises/${exerciseId}`, {
        state: {
          date,
        },
      });

      await setValue((value) => value + 1);
    }

    setTimeout(() => { setSlideMode(false); }, 100);
  };

  const handleClickCreateDiary = async () => {
    const createdDiary = await dairyStore.create(date);
    navigator(`/diarys/${createdDiary.id}/exercises`, { state: { date } });
  };

  const handleClickDiaryRegister = () => {
    navigator('/diarys/complete');
  };

  const handleClickDelete = async (exerciseId) => {
    await exerciseStore.delete(exerciseId);
    setValue((value) => value + 1);
  };

  const handleClickExerciseStart = async () => {
    await setWorkoutMode(true);
    await navigator(`/diarys/${dairyStore.diary.diary.id}/exercises/${dairyStore.diary.exerciseInformations[0].exercise.id}`, {
      state: {
        date,
      },
    });
    await setValue((value) => value + 1);
    timeStore.start();
    setTimeout(() => { setSlideMode(false); }, 100);
  };

  return (
    <Container>
      {dairyStore.diary.diary?.status !== 'COMPLETE'
        ? (
          <ExercisePlan>
            <ExercisePlanList>
              {dairyStore.diary.exerciseInformations?.map((exercise, index) => (
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
            </ExercisePlanList>
            <ButtonWrapper>
              <ExerciseAddButton type="button" onClick={handleClickCreateDiary}>
                운동 추가
              </ExerciseAddButton>
              {workoutMode
                ? (
                  <ExerciseAddButton type="button" onClick={handleClickDiaryRegister}>
                    운동 저장
                  </ExerciseAddButton>
                )
                : null}
            </ButtonWrapper>
          </ExercisePlan>
        )
        : (
          <div>
            <p>운동계획이 없으삼 운동계획 세워주삼</p>
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
