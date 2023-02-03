import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useInterval, useLocalStorage } from 'usehooks-ts';
import useTimeStore from '../hooks/useTimeStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h2{
    font-size: 1.3em;
  }
`;

export default function Timer() {
  const timeStore = useTimeStore();

  useInterval(
    () => {
      timeStore.tick();
    },
    timeStore.status === 'start' ? 1000 : null,
  );

  return (
    <Container>
      <h2>
        {`${timeStore.hours}
      : ${timeStore.minutes}
      : ${timeStore.seconds}`}
      </h2>
    </Container>
  );
}
