import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PaddingTop } from '../conponents/ui/Padding';
import useTicketStore from '../hooks/useTicketStore';
import { dateFormatter } from '../utils/DateFormatter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 400px;
  height: 774px;
  padding-top: 30px;
  background-color: white;

  h1{
    font-size: 28px;
    width: 90%;
    font-weight: 600;
    padding-left: 10px;
    padding-bottom: 30px;
    border-bottom: 1px solid #D1D1D1;
  }
`;

const TicketListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  height: 70%;
  width: 90%;
  
  h2{
    font-size: 20px;
    width: 90%;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #D1D1D1;
  }
`;

const TicketList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 10px;
 
li{
   width: 100%;
   margin-bottom: 20px;
 }
`;

const Ticket = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 150px;
  padding: 10px 15px;
  border-radius: 30px;
  box-shadow: 0px 3px 3px 3px gray;

  img{
    width: 110px;
    height: 120px;
    border-radius: 20px;
  }
`;

const TicketInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items:flex-start;
  padding: 13px;
  padding-bottom: 0px;
  height: 100%;
  width: 65%;

  button{
    width: 90px;
    height: 40px;
    border-radius: 20px;
    font-size: 15px;
    font-weight: 600;
    color: white;
    background-color: #EF781A;
  }
`;

const TrainerName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 15px;

  p{
    font-size: 16px;
    font-weight: 600;
    margin-right: 5px;
  }

  h3{
    font-size: 19px;
    font-weight: 600;
  }
`;

const TicketPeriod = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 7px;
  

  p{
    font-size: 16px;
    font-weight: 600;
    margin-right: 10px;
  }

  h3{
    font-size: 19px;
    font-weight: 600;
  }
`;

export default function TicketsPage() {
  const navigator = useNavigate();

  const ticketStore = useTicketStore();

  const { ptTickets, membershipTickets, lockerInformation } = ticketStore;

  const date = dateFormatter.localDate(new Date());

  useEffect(() => {
    ticketStore.fetchPtTickets();
    ticketStore.fetchMembershipTickets();
    ticketStore.findLockerTicket();

    console.log(ptTickets);
  }, []);

  const handleClickPtTicketUse = async (ticketId, type) => {
    if (type === 'MEMBERSHIP') {
      await ticketStore.updateMembershipUse(ticketId, date);
    }

    if (type === 'PT') {
      await ticketStore.updatePtTicketUse(ticketId, date);
    }

    navigator('/');
  };

  return (
    <PaddingTop>
      <Container>
        <h1>오짐 회원권</h1>
        <TicketListWrapper>
          <h2>{`보유 가능 회원권 갯수(${ptTickets.length}/3)`}</h2>
          {ptTickets.length
            ? (
              <TicketList>
                { ptTickets.map((ticket) => (
                  <li key={ticket.id}>
                    <Ticket>
                      <img src={ticket.trainerImage} />
                      <TicketInformation>
                        <TrainerName>
                          <p>담당 트레이너 : </p>
                          <h3>{ticket.trainerUserName}</h3>
                        </TrainerName>
                        <TicketPeriod>
                          <p>
                            PT 횟수 :
                            {' '}
                            {ticket.ptTimes}
                            회
                          </p>
                          <p>
                            유효기간 :
                            {' '}
                            {ticket.periodOfUse / 30}
                            개월
                          </p>
                        </TicketPeriod>
                        {ticket.status === 'INUSE'
                          ? (
                            <p>
                              <button type="button">사용중</button>
                            </p>
                          )

                          : (
                            <p>
                              <button type="button" onClick={() => handleClickPtTicketUse(ticket.id, ticket.type)}>사용하기</button>
                            </p>
                          )}
                      </TicketInformation>
                    </Ticket>
                  </li>
                ))}
              </TicketList>
            )
            : <p>피티 이용권이 없습니다</p>}
        </TicketListWrapper>
      </Container>
    </PaddingTop>
  );
}
