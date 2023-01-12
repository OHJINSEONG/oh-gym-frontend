import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Calendar } from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

import Diary from '../conponents/Diary';
import useDiaryStore from '../hooks/useDiaryStore';
import { dateFormatter } from '../utils/DateFormatter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  
  h1{
    font-size: 2em;
    margin-bottom: 40px;
  }
`;

export default function DiarysPage() {
  const location = useLocation();

  const [value, setValue] = useState(new Date());

  const date = dateFormatter.localDate(value);

  useEffect(() => {
    if (location.state) {
      setValue(new Date(location.state.date));
    }
  }, []);

  return (
    <Container>
      <h1>운동일지</h1>
      <Calendar
        onChange={setValue}
        value={value}
      />
      <Diary date={date} />
    </Container>
  );
}
