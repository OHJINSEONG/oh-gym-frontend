import styled from 'styled-components';

import 'react-calendar/dist/Calendar.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useExerciseStore from '../hooks/useExerciseStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 750px;
`;

const List = styled.li`
  display: flex;
  margin-top: 10px;
`;

const Button = styled.button`
  color: white;
  background-color: black;
  height: 40px;
  width: 100px;
`;

export default function DiaryDetailPage() {
  const exerciseStore = useExerciseStore();
  const location = useLocation();
  const navigator = useNavigate();

  const { diaryId } = useParams();

  const { date } = location.state;

  const { exercisePlans } = exerciseStore;

  useEffect(() => {
    exerciseStore.fetchExercises(diaryId);
    console.log(diaryId);
  }, []);

  const handleClickComplete = () => {
    navigator('/myPage/diarys', {
      state: {
        date,
      },
    });
  };

  return (
    <Container>
      <ul>
        {exercisePlans.map((exercisePlan) => (
          <li key={exercisePlan.exercise.id}>
            {exercisePlan.exercise.name}
            <ul>
              {exercisePlan.sets.map((set) => (
                <List key={set.id}>
                  <p>
                    {set.setNumber}
                    세트
                  </p>
                  <p>
                    {set.weight}
                    kg
                  </p>
                  <p>
                    {set.reps}
                    회
                  </p>
                  <input type="checkbox" />
                </List>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Button type="button" onClick={handleClickComplete}>완료</Button>
    </Container>
  );
}
