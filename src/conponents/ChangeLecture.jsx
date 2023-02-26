/* eslint-disable no-unused-expressions */
import { useEffect } from 'react';

import styled from 'styled-components';
import useLectureStore from '../hooks/useLectureStore';

import useMassageStore from '../hooks/useMessageStore';
import useUserStore from '../hooks/useUserStore';
import { dateFormatter } from '../utils/DateFormatter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 140px;
  border: 1px solid #D1D1D1;
  border-radius: 20px;
  box-shadow: 0px 6px 6px 3px gray;

  h1{
   margin-bottom: 10px;
  }
`;

const Schedules = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 10px;
  width: 300px;
  height: 70px;
  overflow-x: auto;

  button {
    width: 90px;
    height: 40px;
    border-radius: 20px;
    margin-top: 5px;
    margin-right: 10px;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0px 3px 3px 0px gray;
  }

  .hover{
    color:white;
    background-color: #EF781A;
  }
`;

const Button = styled.button`
  margin-top: 5px;
  width: 300px;
  height: 40px;
  border-radius: 20px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border : 1px solid #D1D1D1;
  background-color: #EF781A;
`;

export default function ChangeLecture({
  value, ptTime, setPtTime, trainerId,
}) {
  const messageStore = useMassageStore();
  const lectureStore = useLectureStore();
  const userStore = useUserStore();

  const todayDate = dateFormatter.localDate(value);

  const date = `${todayDate}T${ptTime}`;

  const { dailyEmptySchedule } = lectureStore;

  const handleClickSchedule = async (schedule) => {
    schedule.length === 4
      ? setPtTime(`0${schedule}`)
      : setPtTime(schedule);
  };

  const handleClickAdd = () => {
    messageStore.sendRequest({
      receiverId: trainerId,
      type: 'requestPt',
      context: date,
      senderName: userStore.user?.userName,
    });

    setPtTime('');
  };

  useEffect(() => {

  }, [ptTime]);

  if (value < new Date()) {
    return (null);
  }

  return (
    <Container>
      <h1>P.T 가능한 시간</h1>
      <Wrapper>
        <div>
          {dailyEmptySchedule.length
            ? (
              <div>
                <Schedules>
                  {dailyEmptySchedule.map((schedule) => (
                    <li key={schedule}>
                      <button
                        type="button"
                        className={ptTime === schedule ? 'hover' : ''}
                        onClick={() => handleClickSchedule(schedule)}
                      >
                        {schedule}
                      </button>
                    </li>
                  ))}
                </Schedules>
                <Button type="button" onClick={handleClickAdd}>추가</Button>
              </div>
            )
            : (
              <div>
                예약 가능한 시간이 없습니다.
              </div>
            )}
        </div>
      </Wrapper>
    </Container>
  );
}
