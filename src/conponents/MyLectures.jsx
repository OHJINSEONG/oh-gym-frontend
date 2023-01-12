/* eslint-disable no-unused-expressions */
import { useEffect } from 'react';
import { useState } from 'react';

import styled from 'styled-components';
import useLectureStore from '../hooks/useLectureStore';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 100px;
    
`;

const Schedules = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  
  div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    border: 1px solid black;
  }

  button {
    margin-top: 30px;
    width: 150px;
    height: 40px;
  }
`;

export default function MyLectures() {
  const lectureStore = useLectureStore();

  const { dailyUserLectures } = lectureStore;

  useEffect(() => {
    console.log(dailyUserLectures);
  }, []);

  const handleClickCancle = () => {
    lectureStore.cancel(dailyUserLectures[0].id);
  };

  return (
    <Container>
      <Schedules>
        {dailyUserLectures.length
          ? (
            <div>
              <p>
                나의 PT시간 :
                {' '}
                {dailyUserLectures[0].time}
              </p>
              <button type="button" onClick={handleClickCancle}>취소 하기</button>
            </div>
          )
          : null}
      </Schedules>
    </Container>
  );
}
