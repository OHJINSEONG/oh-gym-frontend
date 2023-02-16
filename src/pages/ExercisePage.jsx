import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import Exercise from '../conponents/Exercise';
import ExerciseBottomNavigator from '../conponents/ExerciseBottomNavigator';
import ExerciseHeader from '../conponents/ExerciseHeader';
import useExerciseStore from '../hooks/useExerciseStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  padding-top: 120px;
  height: 844px;
`;

export default function ExercisePage() {
  const [workoutMode] = useLocalStorage('workoutMode', false);
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const exerciseStore = useExerciseStore();

  const { exerciseId } = useParams();

  useEffect(() => {
    exerciseStore.find(exerciseId);
  }, [value, value2]);

  return (
    <Container>
      {workoutMode
        ? (
          <ExerciseHeader value={value} value2={value2} />
        )
        : null}
      <ExerciseBottomNavigator
        value={value}
        setValue={setValue}
        exerciseId={exerciseId}
      />
      <Exercise value={value} setValue={setValue2} exerciseId={exerciseId} />
    </Container>
  );
}
