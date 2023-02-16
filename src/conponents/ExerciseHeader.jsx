import { useEffect } from 'react';
import styled from 'styled-components';
import useDiaryStore from '../hooks/useDiaryStore';
import { dateFormatter } from '../utils/DateFormatter';
import Progress from './Progress';

import Timer from './Timer';

const Container = styled.div`
  position: fixed;
  font-size: .8em;
  font-weight: bold;
  width: 100%;
  height: 60px;
  top: 8.2%;
  background-color: white;
  border: 1px solid #D1D1D1;
  justify-content: space-between;
`;

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default function ExerciseHeader({ value, value2 }) {
  const diaryStore = useDiaryStore();

  const date = dateFormatter.localDate(new Date());

  useEffect(() => {
    diaryStore.findDiary(date);
  }, [value, value2]);

  return (
    <Container>
      <Wrapper>
        <Timer />
        <Progress diary={diaryStore.diary} />
      </Wrapper>
    </Container>
  );
}
