import { useEffect } from 'react';
import styled from 'styled-components';
import useLectureStore from '../hooks/useLectureStore';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  `;

export default function CalenderPage() {
  const lectureStore = useLectureStore();

  const { lectures } = lectureStore;

  useEffect(() => {
    lectureStore.fetchLectures();
  }, []);

  if (!lectures.length) {
    return (
      <Container>
        <p>이용중인 상품이 없습니다.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1>시간표</h1>
      <nav>
        <ul>
          {lectures.map((lecture) => (
            <li key={lecture.id}>
              {lecture.date}
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
