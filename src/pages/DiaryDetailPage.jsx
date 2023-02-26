import styled from 'styled-components';

import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useDiaryStore from '../hooks/useDiaryStore';
import useExerciseList from '../hooks/useExerciseList';
import { diaryProgressCalculator } from '../utils/DiaryProgressCalculator';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 400px;
  padding-top: 70px;
  min-height: 844px;
  background-color: white;
  
  h1{
    width: 95%;
    padding-top: 20px;
    font-size: 20px;
    font-weight: 600;
  }
`;

const ExerciseListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  margin: 10px;
`;

const ExerciseList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 100%;
  padding: 20px;
  border: 1px solid #D1D1D1;
  border-radius: 20px;

  li{
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
  }
`;

const ExerciseInformation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start; 
  margin-top : 20px;
  width: 90%;
  border-bottom: 1px solid #D1D1D1;
  padding: 0px 10px;
  padding-bottom: 20px;

  p{
    font-size: 15px;
  }
`;

const ExerciseData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  

  p{
  margin-right: 4px;
  }
`;

const ExerciseDetailListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  margin: 10px;
`;

const ExerciseDetailList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  padding: 10px 0;
  width: 100%;
  border: 1px solid #D1D1D1;
  border-radius: 20px;

  img{
    width: 80px;
    height: 80px;
  }
`;

const ExerciseDetailWrapper = styled.li`
   display: flex;
    justify-content: center;
    align-items: flex-start;
    justify-content: space-between;
    width: 90%;
    margin: 10px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #D1D1D1;
`;

const ExerciseDetail = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: flex-start;
   padding-top: 10px;
   padding-left: 10px;
   width: 70%;

   h3{
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
   }

   div{
    display: flex;
    flex-direction: column;
    width: 100%;
   }

   p{
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 10px;
   }
`;

export default function DiaryDetailPage() {
  const diaryStore = useDiaryStore();
  const exerciseList = useExerciseList();

  const { diaryId } = useParams();

  useEffect(() => {
    diaryStore.findById(diaryId);
    console.log(diaryStore.diary);
  }, []);

  return (
    <Container>
      <ExerciseListWrapper>
        <h1>완료한 운동</h1>
        <ExerciseList>
          {diaryStore.diary.exerciseInformations?.map((exerciseInformation) => (
            <li key={exerciseInformation.exercise.id}>
              <p>
                {exerciseInformation.exercise.name}
              </p>
              <p>
                {exerciseInformation.sets.length}
                {' '}
                sets
              </p>
            </li>
          ))}
        </ExerciseList>
      </ExerciseListWrapper>
      <ExerciseInformation>
        <ExerciseData>
          <p>운동 갯수</p>
          <p>
            {diaryStore.diary.exerciseInformations?.length}
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
            {diaryStore.diary.diary?.time}
          </p>
        </ExerciseData>
      </ExerciseInformation>
      <ExerciseDetailListWrapper>
        <h1>자세히 보기</h1>
        <ExerciseDetailList>
          {diaryStore.diary.exerciseInformations?.map((exerciseInformation) => (
            <ExerciseDetailWrapper key={exerciseInformation.exercise.id}>
              <img src={exerciseList.find((e) => e.name === exerciseInformation.exercise.name).img} />
              <ExerciseDetail>
                <h3>
                  {exerciseInformation.exercise.name}
                </h3>
                <ul>
                  {exerciseInformation.sets?.map((set) => (
                    <li key={set.id}>
                      <p>{`${set.weight}kg X ${set.reps} 회`}</p>
                    </li>
                  ))}
                </ul>
              </ExerciseDetail>
            </ExerciseDetailWrapper>
          ))}
        </ExerciseDetailList>
      </ExerciseDetailListWrapper>
    </Container>
  );
}
