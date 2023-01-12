import { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import styled from 'styled-components';
import ChangeLecture from './ChangeLecture';
import MyLectures from './MyLectures';

import useLectureStore from '../hooks/useLectureStore';

import 'react-calendar/dist/Calendar.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;

export default function LectureCalender() {
  const lectureStore = useLectureStore();

  const [value, setValue] = useState(new Date());

  const { userLectures } = lectureStore;

  const todayDate = `${value.toLocaleDateString()
    .replaceAll('.', '').split(' ').map((e) => (e < 10 ? `0${String(e)}` : e))
    .join('-')}`;

  useEffect(() => {
    lectureStore.fetchTrainerSchedule(1, todayDate);
    lectureStore.makeUserSchedule(todayDate);
  }, [value]);

  if (!userLectures) {
    return (
      <Container>
        <p>이용중인 상품이 없습니다.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1>시간표</h1>
      <Calendar
        onChange={setValue}
        value={value}
      />
      <ChangeLecture todayDate={todayDate} />
      <MyLectures />
    </Container>
  );
}
