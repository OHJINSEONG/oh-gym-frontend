/* eslint-disable no-unsafe-optional-chaining */
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useDiaryStore from '../hooks/useDiaryStore';
import useExerciseList from '../hooks/useExerciseList';
import useExerciseStore from '../hooks/useExerciseStore';
import useTimeStore from '../hooks/useTimeStore';
import { dateFormatter } from '../utils/DateFormatter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  padding-top: 30px;
  width: 400px;
  height: 450px;

  h1{
    font-size: 20px;
  }

  h2{
    font-size: 20px;
    width: 100%;
    font-weight: bold;
    border-bottom: 1px solid #D9D9D9;
    padding-bottom: 20px;
  }

  h3{
    font-size: 28px;
    font-weight: 700;
    width: 90%;
    margin-bottom: 15px;
  }

  @keyframes blink-effect {
    0% {
      opacity: 100%;
    }

    50% {
      opacity: 30%;
    }

    100% {
      opacity: 100%;
    }
  }

  .recommend{
      animation: blink-effect 2.5s infinite;
  }

  .start{
    color:white;
    background-color: #EF781A;
    border :none;
    animation: blink-effect 2.5s infinite;
  }
`;

const Wrapper = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    height: 70%;
    font-size: 12px;
`;

const Plan = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const ExerciseList = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 100%;
  height: 170px;
  overflow-x: auto;
  padding-bottom: 5px;
  margin-top: 10px;
  
  .alarm{
    font-size: 16px;
    font-weight: 600;
  }
`;

const Exercise = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;  
  border: 1px solid black;
  margin: 0 10px;
  border-radius: 10px;
  box-shadow: 0px 3px 3px 0px gray;
`;

const ExerciseButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  width: 140px;
  height: 140px; 
  padding-top: 10px;
  border-radius: 10px;
  font-size: 17px;
  font-weight: 600;
  background-color: white;
  
  p{
    margin-left: 4px;
  }

  img{
    width: 120px;
    height: 100px;
  }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 10px;

    button{
    width: 170px;
    height: 40px;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    border: 1px solid #D1D1D1;
    box-shadow: 0px 3px 3px 0px gray;
  }
`;

const DiaryButton = styled.button`
img{
    width: 20px;
    margin-right: 10px;
   }
   
  padding-right: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 50px;
  font-size: 20px;
  font-weight: 600;
  border: 1px solid #D1D1D1;
  border-radius: 5px;
  box-shadow: 0px 3px 3px 0px gray;
`;

export default function ExercisePlan() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const timeStore = useTimeStore();
  const diaryStore = useDiaryStore();
  const exerciseList = useExerciseList();
  const exerciseStore = useExerciseStore();
  const [value, setValue] = useState(0);

  const [, setWorkoutMode] = useLocalStorage('workoutMode', false);

  const date = dateFormatter.localDate(new Date());

  const navigator = useNavigate();

  // eslint-disable-next-line no-shadow
  const findDiary = async (date) => {
    await setTimeout(() => { diaryStore.findDiary(date); }, 1);
    await diaryStore.fetchDiarys();
  };

  useEffect(() => {
    findDiary(date);
  }, [value, accessToken]);

  const handleClickStart = () => {
    const firstExerciseId = diaryStore.diary.exerciseInformations[0].exercise.id;
    const diaryId = diaryStore.diary.diary?.id;

    setWorkoutMode(true);

    timeStore.start();

    navigator(`/diarys/${diaryId}/exercises/${firstExerciseId}`);
  };

  const handleClickNavigate = (exerciseId) => {
    navigator(`/diarys/${diaryStore.diary.diary.id}/exercises/${exerciseId}`, {
      state: {
        date,
      },
    });
  };

  const handleClickExerciseList = async () => {
    navigator('/exercises');
  };

  const handleClickDeleteDiary = async () => {
    await diaryStore.delete(diaryStore.diary.diary.id);
    setValue(value + 1);
  };

  const handleClickCreateDiary = async () => {
    const createdDiary = await diaryStore.create(date);
    navigator(`/diarys/${createdDiary.id}/exercises`, { state: { date } });
  };

  const recommendExercise = async (diaryId) => {
    const exercise = await exerciseList[Math.floor(Math.random() * 60)];

    await exerciseStore.create({
      diaryId,
      name: exercise.name,
      type: exercise.type,
    });

    setValue(value + 1);
  };

  const handleClickRecommend = async () => {
    const createdDiary = await diaryStore.create(date);

    for (let i = 0; i < 4; i += 1) {
      recommendExercise(createdDiary.id);
    }
  };

  if (diaryStore.diary.diary?.status === 'COMPLETE') {
    return (
      <Container>
        <h3>
          Day
          {' '}
          {diaryStore.diarys
            ?.filter((e) => e.diary.status === 'COMPLETE').length + 1}
        </h3>
        <Wrapper>
          <h2>운동 완료</h2>
          <Plan>
            <ExerciseList>
              {diaryStore.diary.exerciseInformations?.map((exercise) => (
                <Exercise key={exercise.exercise.id}>
                  <ExerciseButton type="button">
                    <p>{exercise.exercise.name}</p>
                    <img src={exerciseList.find((e) => e.name === exercise.exercise.name).img} />
                  </ExerciseButton>
                </Exercise>
              ))}
            </ExerciseList>
            <ButtonWrapper>
              <button type="button" onClick={() => navigator(`/diarys/${diaryStore.diary.diary.id}`)}>
                운동결과
              </button>
              <button type="button" onClick={handleClickDeleteDiary}>
                운동기록 삭제
              </button>
            </ButtonWrapper>
          </Plan>
        </Wrapper>
        <DiaryButton type="button" onClick={() => navigator('/diarys')}>
          <img src="assets/images/diary.png" />
          운동일지
        </DiaryButton>
      </Container>
    );
  }

  return (
    <Container>
      <h3>
        Day
        {' '}
        {diaryStore.diarys
          ?.filter((e) => e.diary.status === 'COMPLETE').length + 1}
      </h3>
      <Wrapper>
        <h2>오늘의 운동 계획</h2>
        {diaryStore.diary.exerciseInformations?.length
          ? (
            <Plan>
              <ExerciseList>
                {diaryStore.diary.exerciseInformations?.map((exercise) => (
                  <Exercise key={exercise.exercise.id}>
                    <ExerciseButton type="button" onClick={() => handleClickNavigate(exercise.exercise.id)}>
                      <p>{exercise.exercise.name}</p>
                      <img src={exerciseList.find((e) => e.name === exercise.exercise.name).img} />
                    </ExerciseButton>
                  </Exercise>
                ))}
              </ExerciseList>
              <ButtonWrapper>
                <button type="button" onClick={handleClickExerciseList}>
                  운동 수정하기
                </button>
                <button type="button" className="start" onClick={handleClickStart}>
                  START!
                </button>
              </ButtonWrapper>
            </Plan>
          )
          : (
            <Plan>
              <ExerciseList>
                <p className="alarm">운동계획이 없습니다.</p>
              </ExerciseList>
              <ButtonWrapper>
                <button type="button" onClick={handleClickCreateDiary}>
                  운동 계획하기
                </button>
                <button type="button" className="recommend" onClick={handleClickRecommend}>
                  추천 운동루틴
                </button>
              </ButtonWrapper>
            </Plan>
          ) }
      </Wrapper>
      <DiaryButton type="button" onClick={() => navigator('/diarys')}>
        <img src="assets/images/diary.png" />
        운동일지
      </DiaryButton>
    </Container>
  );
}
