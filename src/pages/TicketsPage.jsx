import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useTicketStore from '../hooks/useTicketStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;

  li {
    display: flex;
    width: 300px;
    justify-content: space-between;
    border: 1px solid black
  }
`;

export default function TicketsPage() {
  const navigate = useNavigate();

  const ticketStore = useTicketStore();

  const { tickets } = ticketStore;

  useEffect(() => {
    console.log(tickets);
    ticketStore.fetchTickets();
  }, []);

  return (
    <Container>
      <ul>
        {tickets?.map((ticket) => (
          <li key={ticket.id}>
            <button type="button" onClick={() => navigate(`${ticket.id}`)}>
              <p>이용권</p>
              <p>
                {ticket.status === 'UNUSED' ? '미사용' : '사용중'}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
}
