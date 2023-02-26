import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useDiaryStore from '../hooks/useDiaryStore';
import useTimeStore from '../hooks/useTimeStore';
import { dateFormatter } from '../utils/DateFormatter';
import Progress from './Progress';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 140px;
  background-color: white;
  width: 400px;
  height: 844px;

  h2{
    font-size: 1.5em;
    margin-bottom: 20px;
  }

  `;

const Wrapper = styled.div`
   display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 330px;
    height: 100px;
    border: 1px solid #D1D1D1;
    margin-bottom: 20px;
    padding: 25px 14px;

    input{
      width: 300px;
      height: 30px;
      font-size: 15px;
    }

    p{
      font-size: 17px;
      font-weight: 600;
    }

    label{
      font-size: 17px;
      font-weight: 600;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin-top: 20px;

    button{
      width: 150px;
      height: 50px;
      background-color: #EF781A;
      color: white;
      border-radius: 10px;
    }
`;

export default function DiaryRegister() {
  const [, setWorkoutMode] = useLocalStorage('workoutMode', false);

  const diaryStore = useDiaryStore();
  const timeStore = useTimeStore();
  const [memo, setMemo] = useState('');
  const navigator = useNavigate();

  const date = dateFormatter.localDate(new Date());

  useEffect(() => {
    diaryStore.findDiary(date);
  }, []);

  const handleClickDiaryComplete = async () => {
    await diaryStore.complete(diaryStore.diary.diary.id, {
      memo,
      time: `${timeStore.hours}:${timeStore.minutes}:${timeStore.seconds}`,
    });

    timeStore.stop();

    setWorkoutMode(false);

    navigator('/diarys');
  };

  return (
    <Container>
      <h2>운동 완료를 축하합니다!</h2>
      <Wrapper>
        <p>진행률</p>
        <Progress diary={diaryStore.diary} />
      </Wrapper>
      <Wrapper>
        <p>
          총 운동 시간
        </p>
        <p>
          {`${timeStore.hours}:${timeStore.minutes}:${timeStore.seconds}`}
        </p>
      </Wrapper>
      <Wrapper>
        <label htmlFor="input-memo">메모</label>
        <input type="text" value={memo} onChange={(e) => setMemo(e.target.value)} />
      </Wrapper>
      <ButtonWrapper>
        <button type="button" onClick={handleClickDiaryComplete}>저장</button>
        <button type="button" onClick={() => navigator('/exercises')}>뒤로</button>
      </ButtonWrapper>
    </Container>
  );
}
