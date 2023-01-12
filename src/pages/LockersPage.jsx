import styled from 'styled-components';

import { useEffect } from 'react';
import useLockerStore from '../hooks/useLockerStore';
import useTicketStore from '../hooks/useTicketStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;

  ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 80%;
  height: auto;
  margin-top: 20px;
}

  li{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid black;
}

  button {
  padding: 15px;
  color : white;
}

  .AVAILABLE{ 
  background-color: #97a6c2;
}

  .RESERVATED{ 
  background-color: red;
}

  .INUSE{ 
  background-color: #d7d7d7;
}
`;

export default function LockersPage() {
  const lockerStore = useLockerStore();
  const ticketStore = useTicketStore();

  const { lockers, locker } = lockerStore;

  const { lockerInformation } = ticketStore;

  useEffect(() => {
    ticketStore.findLockerTicket();
    lockerStore.fetchLockers();
  }, []);

  const inUseLockerCount = lockers.filter((e) => e.status === 'INUSE').length;

  const reservatedLockerCount = lockers.filter((e) => e.status === 'RESERVATED').length;

  const unavailableLockerCount = lockers.filter((e) => e.status === 'UNAVAILABLE').length;

  const availableLockerCount = lockers.length
  - inUseLockerCount - unavailableLockerCount - reservatedLockerCount;

  const handleClickReservate = (lockerId) => {
    if (locker?.status === 'AVAILABLE'
     || lockerInformation.lockerTicket?.status === 'INUSE'
      || !lockerInformation.lockerTicket) {
      return;
    }
    lockerStore.fetchLocker(lockerId);
  };

  if (!lockerInformation.lockerTicket) {
    return (
      <Container>
        <h1>티켓 없음 사오셈</h1>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Lockers</h2>
      <p>
        현재 사용중인 라커번호:
        {lockerInformation.locker.lockerNumber}
      </p>
      {lockerInformation.lockerTicket.status === 'UNUSED'
        ? (
          <p>
            락카 사용 가능일수 :
            {' '}
            {lockerInformation.lockerTicket.useOfDate}
            일
          </p>
        )
        : (
          <p>
            시작일 :
            {lockerInformation.lockerTicket.startDate}
            {' '}
            만료일 :
            {' '}
            {lockerInformation.lockerTicket.endDate}
          </p>
        )}
      <div>
        <h2>라커 현황</h2>
        <p>
          사용중 :
          {' '}
          {inUseLockerCount}
          개
        </p>
        <p>
          사용가능 :
          {' '}
          {availableLockerCount}
          개
        </p>
        <p>
          예약중 :
          {' '}
          {reservatedLockerCount}
          개
        </p>
        <p>
          사용불가 :
          {' '}
          {unavailableLockerCount}
          개
        </p>
      </div>
      <ul>
        {lockers.map((locker) => (
          <li key={locker.id} className={locker.status}>
            <button type="button" onClick={() => handleClickReservate(locker.id)}>
              {locker.lockerNumber}
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
}
