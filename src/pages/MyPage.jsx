import { useEffect } from 'react';

import styled from 'styled-components';

import useLectureStore from '../hooks/useLectureStore';

import 'react-calendar/dist/Calendar.css';
import useTrainerStore from '../hooks/useTrainerStore';

import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

export default function MyPage() {
  const navigator = useNavigate();

  const lectureStore = useLectureStore();
  const trainerStore = useTrainerStore();

  useEffect(() => {
    trainerStore.find(1);
    lectureStore.fetchUserLectures(1);
  }, []);

  return (
    <Container>
      <button type="button" onClick={() => navigator('calendar')}>Pt시간표</button>
    </Container>
  );
}
