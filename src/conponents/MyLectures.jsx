/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import { useEffect } from 'react';

import styled from 'styled-components';
import useLectureStore from '../hooks/useLectureStore';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 60px;
    margin-top: 40px;
`;

const MyPt = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    margin-top: 40px;

    ul{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90%;
      height: 280px;
      border-radius: 20px;
      box-shadow: 0px 6px 6px 3px gray;

  h2{
    display: flex;
    font-size: 17px;
    font-weight: 600;
    margin-right: 10px;
  }

  button {
    width: 100px;
    height: 40px;
    border-radius: 20px;
    color:white;
    background-color: #EF781A;
  }

    }
`;

const Schedules = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 70px;
  border-radius: 20px;
  box-shadow: 0px 6px 6px 3px gray;

  h2{
    display: flex;
    font-size: 17px;
    font-weight: 600;
    margin-right: 10px;
  }

  button {
    width: 100px;
    height: 40px;
    border-radius: 20px;
    color:white;
    background-color: #EF781A;
  }
`;

const ScheduleInformation = styled.div`
   display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;

    p{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 40px;
      font-weight: 800;
      font-size: 14px;
      border-radius: 20px;
      box-shadow: 0px 3px 3px 0px gray;
    }

    div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 90%;
    }
`;

export default function MyLectures({ value, setPtTime }) {
  const lectureStore = useLectureStore();

  const { dailyUserLecture } = lectureStore;

  useEffect(() => {
    console.log(dailyUserLecture);
  }, [value]);

  const handleClickCancle = async () => {
    await lectureStore.cancel(dailyUserLecture.id);
    setPtTime(dailyUserLecture.time);
  };

  if (value < new Date()) {
    return (
      <MyPt>
        <h1>지난 피티</h1>
        <ul>
          {dailyUserLecture
            ? dailyUserLecture.status === 'RESERVED'
              ? (
                <ScheduleInformation>
                  <div>
                    <h2>예약중</h2>
                    <p>
                      {dailyUserLecture.time}
                    </p>
                    <button type="button" onClick={handleClickCancle}>취소 하기</button>
                  </div>
                </ScheduleInformation>
              )
              : (
                <ScheduleInformation>
                  <div>
                    <h2>
                      내가 받은 P.T시간
                      {' '}
                      {dailyUserLecture.time}
                      시
                    </h2>
                  </div>
                  <div>
                    <h2>트레이너 의견</h2>
                    <p>참 잘했어요!</p>
                  </div>
                </ScheduleInformation>
              )
            : (
              <ScheduleInformation>
                <h2>P.T 수업이 없습니다.</h2>
              </ScheduleInformation>
            )}
        </ul>
      </MyPt>
    );
  }

  return (
    <Container>
      <h1>내 P.T 시간</h1>
      <Schedules>
        {dailyUserLecture
          ? dailyUserLecture.status === 'RESERVED'
            ? (
              <ScheduleInformation>
                <div>
                  <h2>예약중</h2>
                  <p>
                    {dailyUserLecture.time}
                  </p>
                  <button type="button" onClick={handleClickCancle}>취소 하기</button>
                </div>
              </ScheduleInformation>
            )
            : (
              <ScheduleInformation>
                <div>
                  <h2>내 P.T</h2>
                  <p>
                    {dailyUserLecture.time}
                  </p>
                  <button type="button" onClick={handleClickCancle}>취소 하기</button>
                </div>
              </ScheduleInformation>
            )
          : (
            <ScheduleInformation>
              <h2>예약된 수업이 없습니다.</h2>
            </ScheduleInformation>
          )}
      </Schedules>
    </Container>
  );
}
