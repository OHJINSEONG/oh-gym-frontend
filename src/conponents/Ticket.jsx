import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useChattingRoomStore from '../hooks/useChattingRoomStore';
import useTicketStore from '../hooks/useTicketStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 245px;  

  h1{
    font-size: 20px;
  }

  h2{
    font-size: 20px;
    width: 100%;
    font-weight: bold;
    border-bottom: 1px solid #D9D9D9;
    padding-bottom: 5px;
  }

  @keyframes blink-effect {
    0% {
      opacity: 100%;
    }

    50% {
      opacity: 30%;
    }

    100% {
      opacity: 100%;
    }
  }

  .myTicket{
      animation: blink-effect 2.5s infinite;
  }
`;

const Wrapper = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 85%;
  font-size: 12px;
`;

const TicketWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 190px;
    width: 100%;
`;

const TicketInformation = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100px;
    width: 100%;
    padding-top: 8px;
    
    img{
      margin-top: 10px;
      height: 100px;
      width: 100px;
      border-radius: 20px;
      box-shadow: 0px 3px 3px 0px gray;
    }

    .alarm{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
      width: 100%;
      height: 100%;
    }
`;

const InformationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 18px;
    height: 100px;
    width: 75%;

    h2{
      margin-bottom: 10px;
    }

    h3{
    font-size: 14px;
    width: 100%;
    font-weight: bold;
    padding-bottom: 5px;
    margin-bottom: 8px;
  }

   .ptTimes{
    font-size: 16px;
   }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    img{
      width: 16px;
      font-weight: 600;
      margin-left: 10px;
      margin-bottom: 3px;
    }
    
    button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 40px;
    border-radius: 5px;
    padding-left: 20px;
    border: 1px solid #D1D1D1;
    font-size: 17px;
    font-weight: 600;
    box-shadow: 0px 3px 3px 0px gray;
  }
`;

export default function Ticket() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const ticketStore = useTicketStore();
  const navigator = useNavigate();
  const chattingRoomStore = useChattingRoomStore();

  const fetch = async () => {
    await ticketStore.findInUsePtTicket();
    await ticketStore.findInUseMembershipTicket();
  };

  useEffect(() => {
    fetch();

    console.log(ticketStore.inUsePtTicket);
  }, [accessToken]);

  const handleClickChat = async () => {
    const chattingRoom = await chattingRoomStore.create(ticketStore.inUsePtTicket.trainerId);

    navigator(`/myPage/chats/${chattingRoom.id}`);
  };

  return (
    <Container>
      <Wrapper>
        <h2>현재 사용중인 이용권</h2>
        {Object.keys(ticketStore.inUsePtTicket).length
          ? (
            <TicketWrapper>
              <TicketInformation>
                <img src={ticketStore.inUsePtTicket.trainerImage} />
                <InformationWrapper>
                  <div>
                    <h2>{`담당 트레이너 : ${ticketStore.inUsePtTicket.trainerUserName}`}</h2>
                  </div>
                  <div>
                    <h3 className="ptTimes">{`남은 PT 횟수 : ${ticketStore.inUsePtTicket.ptTimes}회`}</h3>
                  </div>
                  <div>
                    <p>
                      이용 기간:
                      {' '}
                      {`${ticketStore.inUsePtTicket.startDate} ~ ${ticketStore.inUsePtTicket.endDate}`}
                    </p>
                  </div>
                  <div>
                    <p>
                      남은 일수:
                      {' '}
                      {`${Math.ceil((new Date(ticketStore.inUsePtTicket.endDate) - new Date()) / (1000 * 60 * 60 * 24))} 일`}
                    </p>
                  </div>
                </InformationWrapper>
              </TicketInformation>
              <ButtonWrapper>
                <button
                  type="button"
                  onClick={() => navigator('/calendar', { state: { trainerId: ticketStore.inUsePtTicket.trainerId } })}
                >
                  PT시간표
                  <img src="assets/images/Schedule.png" />
                </button>
                <button type="button" onClick={handleClickChat}>
                  상담톡
                  <img src="assets/images/chatting.png" />
                </button>
              </ButtonWrapper>
            </TicketWrapper>
          )
          : (
            <TicketWrapper>
              <TicketInformation>
                <p className="alarm">현재 이용하는 상품이 없습니다</p>
              </TicketInformation>
              <ButtonWrapper>
                <button type="button" onClick={() => navigator('/products')}>
                  상품 구입하기
                  <img src="assets/images/shopping.png" />
                </button>
                <button type="button" className="myTicket" onClick={() => navigator('/myPage/tickets')}>
                  내 회원권
                  <img src="assets/images/membership.png" />
                </button>
              </ButtonWrapper>
            </TicketWrapper>
          )}
      </Wrapper>
    </Container>
  );
}
