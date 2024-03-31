import { useEffect, useState } from 'react';
import {
  useLocation, useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useDiaryStore from '../hooks/useDiaryStore';
import useTimeStore from '../hooks/useTimeStore';
import { dateFormatter } from '../utils/DateFormatter';
import ExerciseCancelModal from './modals/ExerciseCancelModal';

import Timer from './Timer';

const Container = styled.div`
  position: fixed;
  font-size: .8em;
  font-weight: bold;
  bottom: 9.5%;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #D9D9D9;
  z-index: 900;
  opacity: 0.6;

`;

const TimerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const ExerciseWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    height: 100%;
    padding-left: 20px;

    button{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      text-align: start;
      width: 100%;
    }

    p{
      font-size: 18px;
      font-weight: 600;
    }

    h2{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
  `;

const TimerButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20%;
    height: 100%;
    padding: 10px;

    button{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: 500;
      width: 50%;
      height: 50%;
    }
`;

export default function BottmExerciseTimer() {
  const [modalMode, setModalMode] = useState(false);
  const [workoutMode, setWorkoutMode] = useLocalStorage('workoutMode', false);

  const location = useLocation();
  const navigator = useNavigate();

  const diaryStore = useDiaryStore();

  const timeStore = useTimeStore();

  const date = dateFormatter.localDate(new Date());

  const path = location.pathname;

  const findIndex = diaryStore.diary.exerciseInformations
    ?.findIndex((e) => e.exercise.status !== 'COMPLETE');

  const unCompleteExercise = findIndex >= 0
    ? diaryStore.diary?.exerciseInformations[findIndex] : null;

  useEffect(() => {
    if (workoutMode) {
      diaryStore.findDiary(date);
    }
  }, [path]);

  if (path.includes('myPage/')) {
    return (null);
  }

  if (path.includes('/order/')) {
    return (null);
  }

  if (path.includes('exercise')) {
    return (null);
  }

  if (path.includes('diary')) {
    return (null);
  }

  const handleClickWorkout = () => {
    navigator(`/diarys/${diaryStore.diary.diary.id}/exercises/${unCompleteExercise.exercise?.id}`);
  };

  const handleClickDiaryRegister = () => {
    navigator('/diarys/complete');
  };

  const exerciseStart = () => {
    timeStore.start();
  };

  const exercisePause = () => {
    timeStore.pause();
  };

  const exerciseEnd = () => {
    setWorkoutMode(false);
    timeStore.stop();
  };

  if (!diaryStore.diary.exerciseInformations?.length || !workoutMode || path.includes('myPage')) {
    return null;
  }

  return (
    <Container>
      {modalMode
        ? <ExerciseCancelModal exerciseEnd={exerciseEnd} setModalMode={setModalMode} />
        : null}
      <TimerWrapper>
        <ExerciseWrapper>
          {diaryStore.diary.exerciseInformations
            ?.filter((e) => e.exercise.status === 'COMPLETE').length !== diaryStore.diary.exerciseInformations?.length
            ? (
              <button type="button" onClick={handleClickWorkout}>
                <p>
                  {' '}
                  {findIndex + 1}
                  .
                  {' '}
                  {unCompleteExercise?.exercise?.name}
                </p>
                <Timer />
              </button>
            )
            : (
              <button type="button" onClick={handleClickDiaryRegister}>
                <p>운동 완료</p>
                <Timer />
              </button>
            )}
        </ExerciseWrapper>
        <TimerButtonWrapper>
          {timeStore.status === 'pause'
            ? (
              <button type="button" onClick={exerciseStart}>
                스타트
              </button>
            )
            : (
              <button type="button" onClick={exercisePause}>
                ll
              </button>
            ) }
          <button type="button" onClick={() => setModalMode(true)}>
            X
          </button>
        </TimerButtonWrapper>
      </TimerWrapper>
    </Container>
  );
}
