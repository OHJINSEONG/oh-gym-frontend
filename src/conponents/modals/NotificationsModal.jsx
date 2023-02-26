import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useNotificationStore from '../../hooks/useNotificationStore copy';
import useTicketStore from '../../hooks/useTicketStore';

const Container = styled.div`
  width: 150px;
  height: 400px;
  z-index: 999;
  position: absolute;
  top: 70px;
  right: 0;
  
  background-color: white;
  border: 1px solid #D1D1D1;
  border-bottom-left-radius: 30px;
`;

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow-y: auto;

  p{
    margin-top: 15px;
    display: flex;
    flex-direction: center;
    justify-content: center;
    width: 300px;
    font-size: 17px;
  }

  li{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 330px;
    border-radius: 4px;
    height: 60px;
  }
`;

const ContentButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 50px;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid #D1D1D1;
  text-align: start;
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
`;

export default function NotificationsModal({ setModalMode, modalMode }) {
  const navigator = useNavigate();
  const ticketStore = useTicketStore();
  const [value, setValue] = useState();
  const notificationStore = useNotificationStore();

  useEffect(() => {
    notificationStore.fetchNotifications();
  }, [value, modalMode]);

  const handleClickNavigator = (type) => {
    setModalMode('');

    if (type === 'PT') {
      navigator('/calendar', { state: { trainerId: ticketStore.inUsePtTicket.trainerId } });
    }
    if (type === 'PTOrder') {
      navigator('/myPage/tickets');
    }
    if (type === 'LOCKEROrder') {
      navigator('/myPage/lockers');
    }
  };

  const handleClickNotificationDelete = async (notificationId) => {
    await notificationStore.delete(notificationId);

    setValue((e) => e + 1);
  };

  return (
    <Container>
      <Wrapper>
        {notificationStore.notifications.length
          ? notificationStore.notifications.map((notification) => (
            <li key={notification.id}>
              <ContentButton type="button" onClick={() => handleClickNavigator(notification.type)}>
                {notification.content}
              </ContentButton>
              <DeleteButton type="button" onClick={() => handleClickNotificationDelete(notification.id)}>
                삭제
              </DeleteButton>
            </li>
          ))
          : <p>알림이 없습니다</p>}
      </Wrapper>
    </Container>
  );
}
