import { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import styled from 'styled-components';
import ChangeLecture from './ChangeLecture';
import MyLectures from './MyLectures';

import useLectureStore from '../hooks/useLectureStore';

import 'react-calendar/dist/Calendar.css';
import { useLocation } from 'react-router-dom';
import { dateFormatter } from '../utils/DateFormatter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 70px;
  height: 844px;
  background-color: white;

  h1{
    width: 90%;
    font-size: 20px;
    font-weight: 700;
    padding: 10px;
    margin-top: 5px;
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
    padding: 0px 8px;
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

  .react-calendar__tile--now{
    border: 1px solid #EF781A;
    background-color: white;
  }

  .empty{
    color: blue
  }

  .myLecture{
    color:#EF781A
  }

  .select{
      background-color: #EF781A;
      color: white;
      box-shadow: 0px 3px 3px 0px gray;
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
`;

export default function LectureCalender() {
  const lectureStore = useLectureStore();
  const location = useLocation();
  const [value, setValue] = useState(new Date());

  const [ptTime, setPtTime] = useState('');

  const { trainerId } = location.state;
  const { userLectures } = lectureStore;

  useEffect(() => {
    lectureStore.fetchUserLectures();
    lectureStore.fetchTrainerSchedules(trainerId);
    lectureStore.fetchTrainerSchedule(trainerId, dateFormatter.localDate(value));
    lectureStore.makeUserSchedule(dateFormatter.localDate(value));
    setValue(value);
  }, [value, ptTime]);

  if (!userLectures) {
    return (
      <Container>
        <p>이용중인 상품이 없습니다.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1>날짜 선택</h1>
      <Calendar
        onChange={setValue}
        value={value}
        // eslint-disable-next-line no-shadow, consistent-return, no-unused-vars
        tileClassName={({ date, view }) => {
          if (dateFormatter.localDate(date) === dateFormatter.localDate(value)) {
            return 'select';
          }
          if (lectureStore.userLectures?.find((e) => e.date === dateFormatter.localDate(date))) {
            return 'myLecture';
          }
          if (lectureStore.emptySchedules
            ?.find((e) => e.date === dateFormatter.localDate(date)
            && e.trainerSchedules.length
            && date >= new Date())) {
            return 'empty';
          }
        }}
      />
      <ChangeLecture value={value} setPtTime={setPtTime} ptTime={ptTime} trainerId={trainerId} />
      <MyLectures value={value} setPtTime={setPtTime} />
    </Container>
  );
}
