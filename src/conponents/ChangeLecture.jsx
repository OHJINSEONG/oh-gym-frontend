/* eslint-disable no-unused-expressions */
import { useEffect, useState } from 'react';

import styled from 'styled-components';
import useLectureStore from '../hooks/useLectureStore';

import useMassageStore from '../hooks/useMessageStore';
import useScheduleStore from '../hooks/useScheduleStore';
import useTrainerStore from '../hooks/useTrainerStore';

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

  const handleClickAdd = () => {
    messageStore.sendRequest({
      senderId: 1,
      receiverId: 1,
      type: 'requestPt',
      context: date,
      senderName: '오진욱',
    });
  };

  return (
    <Container>
      <div>
        {Array.isArray(dailyEmptySchedule)
          ? (
            <div>
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
          : null}
      </div>
    </Container>
  );
}

// Todo: time을 이용하여 트레이너의 빈 시간을 가져온다.
// 어떻게 트레이너 시간을 가져ㅑ올까
// 시작 날짜와 종료 날짜 시간과 요일로 만들수 있다.....
// 이것을 하나의 스케줄
