import styled from 'styled-components';
import { useInterval } from 'usehooks-ts';
import useTimeStore from '../hooks/useTimeStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  margin-right: 20px;
  width: 100px;
  height: 50px;
  border: 1px solid #D1D1D1;
  border-radius: 20px;

  p{
    font-size: 15px;
    color:#D1D1D1;
    margin-right: 5px;
  }

  h2{
    font-size: 1.3em;
  }
`;

const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SetTimer() {
  const timeStore = useTimeStore();

  useInterval(
    () => {
      timeStore.setTick();
    },
    timeStore.setTimerStatus === 'start' ? 1000 : null,
  );

  return (
    <Container>
      {timeStore.setTimerStatus === 'start'
        ? (
          <TimerWrapper>
            <h2>
              {`${timeStore.setTimerMinutes}
      : ${timeStore.setTimerSeconds}`}
            </h2>
          </TimerWrapper>
        )
        : <p>타이머</p>}
    </Container>
  );
}
