/* eslint-disable no-unused-expressions */
import { useEffect, useState } from 'react';

import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import useLectureStore from '../hooks/useLectureStore';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 500px;
`;

const Schedules = styled.ul`
  display: flex;

  button {
  width: 80px;
  height: 30px;
  border-radius: 15px;
  margin-top: 5px;
  border : none
  }
`;

const Button = styled.button`
  margin-top: 30px;
  width: 150px;
  height: 40px;
`;

export default function MyLectures() {
  const lectureStore = useLectureStore();

  const { dailyUserLectures } = lectureStore;

  const [lectureId, setLectureId] = useState(0);

  const handleClickMyLecture = (id) => {
    setLectureId(id);
  };

  const handleClickCancle = () => {
    lectureStore.cansle(lectureId);
  };

  return (
    <Container>
      <Schedules>
        {dailyUserLectures.length
          ? (
            <ul>
              {dailyUserLectures.map((lecture) => (
                <li key={lecture.id}>
                  <button type="button" onClick={() => handleClickMyLecture(lecture.id)}>{lecture.time}</button>
                </li>
              ))}
              <Button type="button" onClick={handleClickCancle}>취소</Button>
            </ul>
          )
          : null}
      </Schedules>
    </Container>
  );
}
