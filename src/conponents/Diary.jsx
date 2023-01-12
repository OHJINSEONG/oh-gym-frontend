import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import useDiaryStore from '../hooks/useDiaryStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 0 20px;
  border: 1px solid black;
  width: 350px;
  overflow-x: auto;
`;

const ExercisePlan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ExerciseList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Exercise = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 150px;
  border: 1px solid black;
  margin: 50px;
`;

const ExerciseAddButton = styled.button`
  margin-top: 20px;
  padding : 20px;
  border: 1px solid black;
`;

// const ExerciseAddButton = styled.button`
//   margin-top: 20px;
//   padding: 20px;
//   border : 1px solid black
// `;

export default function Diary({ date }) {
  const dairyStore = useDiaryStore();

  const navigator = useNavigate();

  // eslint-disable-next-line no-shadow
  const findDiary = (date) => {
    setTimeout(() => { dairyStore.findDiary(date); }, 1);
  };

  useEffect(() => {
    findDiary(date);
  }, [date]);

  const handleClickNavigate = (exerciseId) => {
    navigator(`${dairyStore.diary.diary.id}/exercises/${exerciseId}`, {
      state: {
        date,
      },
    });
  };

  const handleClickCreateDiary = async () => {
    const createdDiary = await dairyStore.create(date);
    navigator(`${createdDiary.id}/exercises`, { state: { date } });
  };

  return (
    <Container>
      {dairyStore.diary.diary
        ? (
          <ExercisePlan>
            <ExerciseList>
              {dairyStore.diary.exerciseInformations.map((exercise) => (
                <Exercise key={exercise.exercise.id}>
                  <button type="button" onClick={() => handleClickNavigate(exercise.exercise.id)}>
                    {exercise.exercise.name}
                    {exercise.sets.map((set) => (
                      <li key={set.id}>
                        {set.setNumber}
                        세트
                      </li>
                    ))}
                  </button>
                </Exercise>
              ))}
            </ExerciseList>
            <ExerciseAddButton type="button" onClick={handleClickCreateDiary}>
              운동계획 추가하기
            </ExerciseAddButton>
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
