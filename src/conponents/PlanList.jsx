import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import useExerciseFormStore from '../hooks/useExerciseFormStore';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-top: 10px;
`;

const ExerciseList = styled.li`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border: 1px solid black;
  margin: 20px 0;
`;

const SetList = styled.li`
  display: flex;
  width: 250px;
  margin-top: 10px;
`;

const ExerciseButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 150px;

  button {
    padding: 5px 20px;
    border: 1px solid black;
    border-radius: 5px;
  }
`;

export default function PlanList({ date, handleClickCreateDiary }) {
  const navigate = useNavigate();

  const exerciseFormStore = useExerciseFormStore();

  const { exerciseInformations } = exerciseFormStore;

  useEffect(() => {
    console.log(exerciseInformations);
  }, [date]);

  const handleClickExerciseDelete = (exerciseInformationId) => {
    exerciseFormStore.deleteExerciseInformation(exerciseInformationId);
  };

  const handleClickSetDelete = (exerciseInformationId, setNumber) => {
    exerciseFormStore.deleteSetInformation(exerciseInformationId, setNumber);
  };

  return (
    <Container>
      <p>운동계획</p>
      <ul>
        {exerciseInformations?.map((exerciseInformation) => (
          <ExerciseList key={exerciseInformation.id}>
            <div>
              {exerciseInformation.name}
              <ul>
                {exerciseInformation.sets?.map((set) => (
                  <SetList key={set.setNumber}>
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
                    <button
                      type="button"
                      onClick={() => handleClickSetDelete(exerciseInformation.id, set.setNumber)}
                    >
                      X
                    </button>
                  </SetList>
                ))}
              </ul>
            </div>
            <ExerciseButton>
              <button
                type="button"
                onClick={() => navigate(
                  `${exerciseInformation.id}`,
                  {
                    state: {
                      sets: exerciseInformations
                        .find((e) => e.id === exerciseInformation.id).sets,
                    },
                  },
                )}
              >
                수정
              </button>
              <button type="button" onClick={() => handleClickExerciseDelete(exerciseInformation.id)}>삭제</button>
            </ExerciseButton>
          </ExerciseList>
        ))}
        {exerciseInformations.length
          ? <button type="button" onClick={handleClickCreateDiary}>운동일지 만들기</button>
          : null}
      </ul>
    </Container>
  );
}
