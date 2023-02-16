/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useDiaryStore from '../hooks/useDiaryStore';
import { diaryProgressCalculator } from '../utils/DiaryProgressCalculator';
import Progress from './Progress';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 70px;
  padding: 0 20px;
  border: 1px solid #D1D1D1;
  width: 350px;
  height: 160px;
  border-radius: 50px;
  box-shadow: 0px 3px 3px 0px gray;
  

  h1{
    font-size: 1.2em;
  }

  .alarm{
    color:gray
  }
`;

const ExercisePlan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  button{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 20px;
    width: 100%;
    height: 100%;
  }

  h2{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 95%;
    font-size: 17px;
    font-weight: 600;
  }

  h3{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 40px;
    margin-top: 20px;
    color:white;
    font-weight: 600;
    background-color: #EF781A;
    border-radius: 20px;
  }
`;

const ExerciseInformation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start; 
  margin-top : 20px;
  width: 100%;

  p{
    font-size: 15px;
  }
`;

const ExerciseData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  

  p{
    margin-right: 3px;
  }
`;

export default function Diary({ date }) {
  const [workoutMode] = useLocalStorage('workoutMode', false);
  const diaryStore = useDiaryStore();

  const navigator = useNavigate();

  // eslint-disable-next-line no-shadow
  const findDiary = (date) => {
    setTimeout(() => { diaryStore.findDiary(date); }, 1);
  };

  useEffect(() => {
    findDiary(date);
  }, [date]);

  const handleClickNavigate = () => {
    navigator(`${diaryStore.diary.diary.id}`);
  };

  const handleClickStart = () => {
    console.log(diaryStore);
    const firstExerciseId = diaryStore.diary.exerciseInformations[0].exercise.id;
    const diaryId = diaryStore.diary.diary?.id;

    navigator(`/myPage/diarys/${diaryId}/exercises/${firstExerciseId}`);
  };

  // eslint-disable-next-line no-return-assign
  return (
    <Container>
      {
        diaryStore.diary.diary?.status === 'COMPLETE'
          ? (
            <ExercisePlan>
              <button type="button" onClick={handleClickNavigate}>
                <h2>{`${date.split('-')[1]}.${`${date.split('-')[2]}`} 운동`}</h2>
                <ExerciseInformation>
                  <ExerciseData>
                    <p>운동 갯수</p>
                    <p>
                      {diaryStore.diary.exerciseInformations.length}
                      개
                    </p>
                  </ExerciseData>
                  <ExerciseData>
                    <p>진행률</p>
                    <p>
                      {diaryProgressCalculator.calculate(diaryStore.diary)}
                      %
                    </p>
                  </ExerciseData>
                  <ExerciseData>
                    <p>운동 시간</p>
                    <p>
                      {diaryStore.diary.diary.time}
                    </p>
                  </ExerciseData>
                </ExerciseInformation>
                <h3>운동 보러 가기</h3>
              </button>
            </ExercisePlan>
          )
          : workoutMode ? (
            <ExercisePlan>
              <button type="button" onClick={handleClickStart}>
                <h2>운동 진행중</h2>
                <p>진행률</p>
                <Progress diary={diaryStore.diary} />
              </button>
            </ExercisePlan>
          )
            : (
              <div>
                <p className="alarm">해당 날짜에 운동일지가 없습니다.</p>
              </div>
            )
      }
    </Container>
  );
}
