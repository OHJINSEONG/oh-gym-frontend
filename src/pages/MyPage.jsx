import { useEffect } from 'react';

import styled from 'styled-components';

import 'react-calendar/dist/Calendar.css';

import useLectureStore from '../hooks/useLectureStore';
import Profile from '../conponents/Profile';
import MyPageMenu from '../conponents/MyPageMenu';
import Coupons from '../conponents/Coupons';
import Padding from '../conponents/ui/Padding';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 844px;

  h1{
    font-size: 2em;
    margin-bottom: 20px;
  }
`;

export default function MyPage() {
  const lectureStore = useLectureStore();

  useEffect(() => {
    lectureStore.fetchUserLectures();
  }, []);

  return (
    <Container>
      <Profile />
      <Coupons />
      <MyPageMenu />
    </Container>
  );
}
