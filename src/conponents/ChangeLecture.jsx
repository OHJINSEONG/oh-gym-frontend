/* eslint-disable no-unused-expressions */
import { useState } from 'react';

import styled from 'styled-components';
import useLectureStore from '../hooks/useLectureStore';

import useMassageStore from '../hooks/useMessageStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  width: 80%;
  height: 200px;
  border: 1px solid black;

h1{
  margin-bottom: 10px;
}
`;

const Schedules = styled.ul`
  display: flex;

  button {
  width: 80px;
  height: 30px;
  border-radius: 15px;
  margin-top: 5px;
  border : 1px solid black
  }
`;

const Button = styled.button`
  margin-top: 30px;
  width: 150px;
  height: 40px;
  border : 1px solid black
`;

export default function ChangeLecture({ todayDate }) {
  const messageStore = useMassageStore();
  const lectureStore = useLectureStore();

  const [ptTime, setPtTime] = useState('');

  const date = `${todayDate}T${ptTime}`;

  const { dailyEmptySchedule } = lectureStore;

  const handleClickSchedule = (schedule) => {
    schedule.length === 4
      ? setPtTime(`0${schedule}`)
      : setPtTime(schedule);
  };

  console.log(dailyEmptySchedule);

  const handleClickAdd = () => {
    console.log(date);
    messageStore.sendRequest({
      receiverId: 1,
      type: 'requestPt',
      context: date,
      senderName: '오진욱',
    });
  };

  return (
    <Container>
      <div>
        {dailyEmptySchedule.length
          ? (
            <div>
              <h1>PT 예약 가능한 시간</h1>
              <Schedules>
                {dailyEmptySchedule.map((schedule) => (
                  <li key={schedule}>
                    <button type="button" onClick={() => handleClickSchedule(schedule)}>{schedule}</button>
                  </li>
                ))}
              </Schedules>
              <Button type="button" onClick={handleClickAdd}>추가</Button>
            </div>
          )
          : (
            <div>
              피티 가능한 시간이 없다리
            </div>
          )}
      </div>
    </Container>
  );
}
