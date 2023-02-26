import { useState, useEffect } from 'react';

import styled from 'styled-components';

import { Calendar } from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

import Diary from '../conponents/Diary';
import useDiaryStore from '../hooks/useDiaryStore';
import { dateFormatter } from '../utils/DateFormatter';
import { PaddingTop } from '../conponents/ui/Padding';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 400px;
  height: 774px;
  
  h1{
    width: 90%;
    font-size: 27px;
    font-weight: 700;
    padding: 20px;
    margin-bottom: 10px;
  }

  .react-calendar__navigation{
    button{
      font-size: 16px;
    }
  }

  .react-calendar__tile--active{
    background-color: white;
  }
  
  .react-calendar{
    border: 1px solid #D1D1D1;
    border-radius: 30px;
    padding: 10px 8px;
    box-shadow: 0px 6px 6px 3px gray;
  }

  .react-calendar__tile{
    border: 0;
    color: black;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    

    &:hover {
      background-color: #EF781A;
      color: white;
      box-shadow: 0px 3px 3px 0px gray;
    }

    &:active {
      background-color: #EF781A;
      color: white;
      
    }
  }

  .react-calendar__month-view__days__day--weekend {
    border: 0;
    color: black;
    border-radius: 50%;

    &:hover {
      background-color: #EF781A;
      color: white;
      box-shadow: 0px 3px 3px 0px gray;
    }

    &:active {
      background-color: #EF781A;
      color: white;
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    border: 0;
    color: white;
    :disabled

    &:hover {
      background-color: white;
    }

    &:active {
      background-color: white;
    }
  }

  .react-calendar__tile--now{
    border: 1px solid #EF781A;
    background-color: white;
  }

  .highlight{
    color:#EF781A
  }
  
`;

export default function DiarysPage() {
  const [value, setValue] = useState(new Date());
  const diaryStore = useDiaryStore();

  const date = dateFormatter.localDate(value);

  const completeDiarys = diaryStore.diarys.filter((diary) => diary.diary.status === 'COMPLETE');

  useEffect(() => {
    diaryStore.fetchDiarys();
    console.log(completeDiarys);
  }, []);

  return (
    <PaddingTop>
      <Container>
        <h1>운동일지</h1>
        <Calendar
          onChange={setValue}
          value={value}
          // eslint-disable-next-line no-shadow, consistent-return, no-unused-vars
          tileClassName={({ date, view }) => {
            if (completeDiarys?.find((e) => e.diary.date === dateFormatter.localDate(date))) {
              return 'highlight';
            }
          }}
        />
        <Diary date={date} />
      </Container>
    </PaddingTop>
  );
}
