import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PaddingTop } from '../conponents/ui/Padding';
import useDiaryStore from '../hooks/useDiaryStore';
import useExerciseFormStore from '../hooks/useExerciseFormStore';
import useExerciseList from '../hooks/useExerciseList';
import useExerciseStore from '../hooks/useExerciseStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 400px;
  padding-top: 30px;

  height: 774px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #D1D1D1;
    height: 60px;
    
    button{
      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      width : 70px;
      margin-right: 5px;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  margin-bottom: 20px;
  color: gray;

  input{
    margin-left: 10px;
    width: 280px;
    height: 30px;
    border: 1px solid #D1D1D1;
    border-radius: 5px;
  }
`;

const ExerciseType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button{
    width: 70px;
    height: 40px;
    border: 1px solid #D1D1D1;
    
  }
`;

const ExerciseList = styled.ul`
  border: 1px solid #D1D1D1;
  overflow-y: auto;
  width: 350px;
  max-height: 300px;
`;

const ExerciseAddButton = styled.button`
  width: 50px;
  height: 30px;
  margin-right: 10px;
  color: white;
  border-radius: 20px;
  background-color: #EF781A;
`;

const ExerciseInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  img{
    width: 300px;
    height: 200px;
  }
`;

export default function PlanerPage() {
  const exerciseFormStore = useExerciseFormStore();
  const diaryStore = useDiaryStore();
  const exerciseStore = useExerciseStore();

  const [mode, setMode] = useState(false);
  const [type, setType] = useState('');
  const [selectedExercise, setSelectedExercise] = useState({});
  const [search, setSearch] = useState('');

  const navigator = useNavigate();

  const location = useLocation();

  const { diaryId } = useParams();

  const { date } = location.state;

  const { exerciseInformations } = exerciseFormStore;

  const exerciseList = useExerciseList();

  const handleClickAddExercise = async (exerciseName, exerciseType) => {
    const exercise = await exerciseStore.create({
      diaryId,
      name: exerciseName,
      type: exerciseType,
    });
    navigator(`${exercise.id}`);
  };

  useEffect(() => {
    diaryStore.findDiary(date);
    console.log(exerciseInformations);
    console.log(diaryId);
  }, []);

  const handleClickExerciseInformation = (exerciseId) => {
    setMode(true);
    const findExercise = exerciseList.find((e) => e.id === exerciseId);
    setSelectedExercise(findExercise);
  };

  const handleChangeSearch = (e) => {
    setType('');
    setSearch(e.target.value);
  };

  return (
    <PaddingTop>
      <Container>
        <SearchBar>
          <label htmlFor="input-search">검색</label>
          <input
            id="input-search"
            type="text"
            value={search}
            onChange={(e) => handleChangeSearch(e)}
          />
        </SearchBar>
        <ExerciseType>
          <button type="button" onClick={() => setType('하체')}>하체</button>
          <button type="button" onClick={() => setType('가슴')}>가슴</button>
          <button type="button" onClick={() => setType('등')}>등</button>
          <button type="button" onClick={() => setType('어깨')}>어깨</button>
          <button type="button" onClick={() => setType('팔')}>팔</button>
        </ExerciseType>
        <ExerciseList>
          {exerciseList
            .filter((exercise) => exercise.type === type)
            .map((exercise) => (
              <li key={exercise.id}>
                <button type="button" onClick={() => handleClickExerciseInformation(exercise.id)}>
                  <img src={exercise.img} />
                  <p>{exercise.name}</p>
                </button>
                <ExerciseAddButton type="button" onClick={() => handleClickAddExercise(exercise.name, exercise.type)}>추가</ExerciseAddButton>
              </li>
            ))}
          {type === ''
            ? exerciseList
              .filter((exercise) => exercise.name.includes(search))
              .map((exercise) => (
                <li key={exercise.id}>
                  <button type="button" onClick={() => handleClickExerciseInformation(exercise.id)}>
                    <img src={exercise.img} />
                    <p>{exercise.name}</p>
                  </button>
                  <ExerciseAddButton type="button" onClick={() => handleClickAddExercise(exercise.name, exercise.type)}>추가</ExerciseAddButton>
                </li>
              ))
            : null}
        </ExerciseList>
        {mode
          ? (
            <ExerciseInformation>
              <img src={selectedExercise.img} />
            </ExerciseInformation>
          )
          : null}
      </Container>
    </PaddingTop>
  );
}
