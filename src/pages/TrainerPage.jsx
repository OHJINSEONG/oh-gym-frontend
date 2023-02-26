import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import 'react-calendar/dist/Calendar.css';

import useTrainerStore from '../hooks/useTrainerStore';
import useChattingRoomStore from '../hooks/useChattingRoomStore';
import Padding from '../conponents/ui/Padding';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  min-height: 800px;
  background-color: white;
  padding-bottom: 150px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const TrainerListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 30px;

  h1{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 30px;
    padding-bottom: 40px;
    border-bottom: 1px solid #D1D1D1;
  }
`;

const TrainerList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Trainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 150px;
  margin-bottom: 20px;

  button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 30px;
    padding: 0 13px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: white;
    
    background-color: #EF781A;
    box-shadow: 0px 3px 3px 3px gray;
    
    img{
      width: 13px;
      height: 13px;
      margin-bottom: 1px;
    }
  }
`;

const TrainerInformation = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding:5px;
  width: 55%;
  height: 100%;

  h3{
    font-size: 16px;
    color: gray
  }
`;

const TrainerImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  box-shadow: 0px 3px 3px 3px gray;
`;

const TrainerName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  div{
    display: flex;
  justify-content: center;
  align-items: center;
  }
  
  h2{
    font-weight: 600;
    font-size: 18px;
    margin-right: 3px;
  }

  p{
    font-size: 15px;
    font-weight: 600;
  }
`;

export default function TrainerPage() {
  const trainerStore = useTrainerStore();
  const chattingRoomStore = useChattingRoomStore();
  const navigator = useNavigate();

  const { trainers } = trainerStore;

  useEffect(() => {
    trainerStore.fetchTrainers();
  }, []);

  const handleClickChatting = async (trainerId) => {
    const chattingRoom = await chattingRoomStore.create(trainerId);

    navigator(`/myPage/chats/${chattingRoom.id}`);
  };

  return (
    <Padding>
      <Container>
        <Wrapper>
          <TrainerListWrapper>
            <h1>오짐 트레이너</h1>
            <TrainerList>
              {trainers.map((trainer) => (
                <Trainer key={trainer.id}>
                  <TrainerImage src={trainer.image} />
                  <TrainerInformation>
                    <div>
                      <TrainerName>
                        <div>
                          <h2>
                            {trainer.userName}
                          </h2>
                          <p>트레이너</p>
                        </div>
                        <button type="button" onClick={() => handleClickChatting(trainer.id)}>
                          상담하기
                        </button>
                      </TrainerName>
                      <h3>
                        전문적인 티칭과 최고의 서비스를 제공하는
                        {' '}
                        {trainer.userName}
                        {' '}
                        트레이너입니다!
                      </h3>
                    </div>

                  </TrainerInformation>
                </Trainer>
              ))}
            </TrainerList>
          </TrainerListWrapper>
        </Wrapper>
      </Container>
    </Padding>
  );
}
