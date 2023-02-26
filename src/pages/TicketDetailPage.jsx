import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useTicketStore from '../hooks/useTicketStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  width: 400px;
`;

export default function TicketDetailPage() {
  const { ticketId } = useParams();

  const ticketStore = useTicketStore();

  const { ticket } = ticketStore;

  useEffect(() => {
    console.log(ticket);
    ticketStore.findTicket(ticketId);
  }, []);

  return (
    <Container>
      <p>{ticket?.ptTimes}</p>
    </Container>
  );
}
