import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Calendar } from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

import Diary from '../conponents/Diary';
import useDiaryStore from '../hooks/useDiaryStore';
import { dateFormatter } from '../utils/DateFormatter';
import useTrainerStore from '../hooks/useTrainerStore';
import useChattingRoomStore from '../hooks/useChattingRoomStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  
  h1{
    font-size: 2em;
    margin-bottom: 40px;
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
    <Container>
      트레이너
      <ul>
        {trainers.map((trainer) => (
          <li key={trainer.id}>
            {trainer.name}
            <button type="button" onClick={() => handleClickChatting(trainer.id)}>상담톡</button>
          </li>
        ))}
      </ul>
    </Container>
  );
}
