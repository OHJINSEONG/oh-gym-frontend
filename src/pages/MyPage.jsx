import { useEffect } from 'react';

import styled from 'styled-components';

import 'react-calendar/dist/Calendar.css';

import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useLectureStore from '../hooks/useLectureStore';
import useTrainerStore from '../hooks/useTrainerStore';
import { dateFormatter } from '../utils/DateFormatter';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 750px;

  h1{
    font-size: 2em;
    margin-bottom: 20px;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  border: 1px solid black;
  width: 80%;
  justify-content: flex-start;
  align-items: center;
`;

const ProfilePhoto = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 50%;
`;

const ProfileInformation = styled.div`
  display: flex;
  width: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 10px;

  p{
    margin: 6px;
    font-size: 10px;
  }
`;

const MyMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button{
    border:1px solid black; 
    width: 70px;
    height: 70px;
  }
`;

const MyMenuTickets = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px;
  width: 100%;

  div{
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MyMenuButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Planer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;

  p{
    margin: 25px;
  }

  div{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 130px;
    border: 1px solid black;

  }

  button{
    border:1px solid black; 
    width: 120px;
    height: 60px;
  }
`;

export default function MyPage() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const [kakaoAccessToken, setKakaoAccessToken] = useLocalStorage('kakaoAccessToken', '');

  const userStore = useUserStore();

  const { user } = userStore;

  const navigator = useNavigate();

  const lectureStore = useLectureStore();
  const trainerStore = useTrainerStore();

  const date = dateFormatter.localDate(new Date());

  useEffect(() => {
    trainerStore.find(1);
    lectureStore.fetchUserLectures(1);
  }, []);

  const handleClickLogout = async () => {
    await userStore.kakaoLogout(kakaoAccessToken);
    setKakaoAccessToken('');
    setAccessToken('');
    navigator('/');
  };

  return (
    <Container>
      <h1>My Page</h1>
      <ProfileWrapper>
        <ProfilePhoto>
          <h2>사진</h2>
        </ProfilePhoto>
        <ProfileInformation>
          <div>
            <p>
              이름 :
              {' '}
              {user.userName}
            </p>
            <p>
              이메일 :
              {user.email}
            </p>
          </div>
          <button type="button" onClick={handleClickLogout}>로그아웃</button>
        </ProfileInformation>
      </ProfileWrapper>
      <MyMenu>
        <MyMenuTickets>
          <p>포인트 : 0P</p>
          <div>
            <p>쿠폰 : 0개</p>
            <p>찜 : 0개</p>
          </div>
        </MyMenuTickets>
        <MyMenuButtons>
          <button type="button" onClick={() => navigator('calendar')}>Pt시간표</button>
          <button type="button" onClick={() => navigator('diarys')}>운동일지</button>
          <button type="button" onClick={() => navigator('lockers')}>락카 정보 확인</button>
          <button type="button" onClick={() => navigator('chats')}>상담톡</button>
        </MyMenuButtons>
      </MyMenu>
      <Planer>
        <p>오늘의 운동 계획</p>
        <div>
          <p>2023-01-07</p>
          <button type="button" onClick={() => navigator('exercises', { state: { date } })}>오늘의 계획만들기</button>
        </div>
      </Planer>
    </Container>
  );
}
