/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useState } from 'react';
import useDiaryStore from '../hooks/useDiaryStore';
import useExerciseStore from '../hooks/useExerciseStore';
import useSetStore from '../hooks/useSetStore';
import { timeStore } from '../stores/TimeStore';

import { dateFormatter } from '../utils/DateFormatter';
import SetTimer from './SetTimer';
import ExerciseList from './ExerciseList';
import useExerciseFormStore from '../hooks/useExerciseFormStore';
import useExerciseSetStore from '../hooks/useExerciseSetStore';

const Container = styled.div`
  position: fixed;
  font-size: .8em;
  font-weight: bold;
  bottom: 0%;
  width: 100%;
  height: 150px;
  background-color: white;
  border: 1px solid #D1D1D1;
`;

const Navigators = styled.ul`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    
    li{
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      background-color: #EF781A;
    }

    button{
      font-size: 18px;
      font-weight: 600;
      color: white
    }
`;

const WorkoutButtons = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
      
    li{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 40px;
      border-radius: 20px;
      margin-left: 20px;
      box-shadow: 0px 3px 3px 0px;
    }

    button{
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
    }
`;

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default function ExerciseBottomNavigator({
  value, value2, setValue, exerciseId,
}) {
  const [slideMode, setSlideMode] = useState(false);

  const props = useSpring({
    top: slideMode ? -570 : 200,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    height: '90vh',
    width: '100%',
  });

  const navigator = useNavigate();

  const exerciseFormStore = useExerciseFormStore();
  const exerciseSetStore = useExerciseSetStore();
  const diaryStore = useDiaryStore();
  const exerciseStore = useExerciseStore();
  const setStore = useSetStore();

  const date = dateFormatter.localDate(new Date());

  const findSet = exerciseStore.exercise.sets
    ? exerciseStore.exercise.sets.find((e) => e.status !== 'COMPLETE')
    : { setNumber: 1 };

  useEffect(() => {
    diaryStore.findDiary(date);
  }, []);

  const handleClickComplete = async () => {
    await exerciseSetStore.patchData({ exerciseId, sets: exerciseFormStore.setForms });

    await setStore.completeSet(findSet.id);

    await timeStore.setTimeReset();

    timeStore.setStart();

    setValue(value + 1);
  };

  const handleClickPrevious = () => {
    if (Number(exerciseId) === diaryStore.diary.exerciseInformations[0].exercise.id) {
      return;
    }

    const findExerciseId = diaryStore.diary
      .exerciseInformations[diaryStore.diary.exerciseInformations
        .findIndex(((e) => e.exercise.id === Number(exerciseId))) - 1].exercise.id;
    const diaryId = diaryStore.diary.diary.id;

    navigator(`/diarys/${diaryId}/exercises/${findExerciseId}`);
    setValue(value + 1);
  };

  const handleClickNext = () => {
    if (Number(exerciseId) === diaryStore.diary
      .exerciseInformations[diaryStore.diary.exerciseInformations.length - 1].exercise.id) {
      return;
    }

    const findExerciseId = diaryStore.diary
      .exerciseInformations[diaryStore.diary.exerciseInformations
        .findIndex(((e) => e.exercise.id === Number(exerciseId))) + 1].exercise.id;
    const diaryId = diaryStore.diary.diary.id;

    navigator(`/diarys/${diaryId}/exercises/${findExerciseId}`);
    setValue(value + 1);
  };

  const handleClickList = () => {
    setSlideMode(true);
  };

  const exerciseComplete = () => {
    if (exerciseStore.exercise.exercise.status === 'COMPLETE') {
      setValue(value + 1);
      return;
    }

    exerciseStore.complete(exerciseId);

    if (Number(exerciseId) === diaryStore.diary
      .exerciseInformations[diaryStore.diary.exerciseInformations.length - 1].exercise.id) {
      setValue(value + 1);
      return;
    }

    const findExerciseId = diaryStore.diary
      .exerciseInformations[diaryStore.diary.exerciseInformations
        .findIndex(((e) => e.exercise.id === Number(exerciseId))) + 1].exercise.id;
    const diaryId = diaryStore.diary.diary.id;

    navigator(`/diarys/${diaryId}/exercises/${findExerciseId}`);
    setValue(value + 1);
  };

  const handleClickDiaryRegister = () => {
    navigator('/diarys/complete');
  };

  return (
    <Container>
      <animated.div style={props}>
        <ExerciseList setSlideMode={setSlideMode} setValue={setValue} />
      </animated.div>
      <Wrapper>
        <WorkoutButtons>
          <SetTimer />
          <li>
            {findSet
            && exerciseStore.exercise.sets?.filter((e) => e.status === 'COMPLETE').length
            !== exerciseStore.exercise.sets?.length
              ? (
                <button type="button" onClick={handleClickComplete}>
                  {exerciseStore.exercise.sets.filter((e) => e.status === 'COMPLETE').length + 1}
                  세트
                  완료
                </button>
              )
              : diaryStore.diary.exerciseInformations
                ?.filter((e) => e.exercise.status === 'COMPLETE').length !== diaryStore.diary.exerciseInformations?.length
                ? (
                  <button type="button" onClick={exerciseComplete}>
                    운동 완료
                  </button>
                )
                : (
                  <button type="button" onClick={handleClickDiaryRegister}>
                    운동 기록하러가기
                  </button>
                )}
          </li>
        </WorkoutButtons>
        <Navigators>
          <li>
            <button type="button" onClick={handleClickPrevious}>이전</button>
          </li>
          <li>
            <button type="button" onClick={handleClickList}>운동 목록</button>
          </li>
          <li>
            <button type="button" onClick={handleClickNext}>다음</button>
          </li>
        </Navigators>
      </Wrapper>
    </Container>
  );
}
