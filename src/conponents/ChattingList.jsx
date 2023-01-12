import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { dateFormatter } from '../utils/DateFormatter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 830px;

  h1{
    font-size: 2em;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px 0px;
  
  button{
    width: 130px;
    height: 40px;
    border: 1px solid black;
  }
`;

const ChattingBox = styled.div`
  border: 1px solid black;
  margin-bottom: 50px;
  border-radius: 20px;
  height: 500px;
  width: 300px;
  overflow-y: auto;
`;

const ChattingRoomList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  padding-left: 11px;
  padding-right: 17px;
  background-color: white;
  width: 100%;  
`;

const ChattingRoom = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  button{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    width: 100%;
    border: 1px solid black;  
    font-size: 0.2px;
  }
`;

const ChattingRoomMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 7px;
  width: 80%;
  height: 100%;

  h2{
    font-weight: bold;
    font-size: 12px;
  }

  p {
    text-align: start;
    word-break: break-all;
  }
`;

const ChattingRoomTime = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;

  h2{
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 30px;
    font-size: 12px;
  }

  p{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: red;
    color : white
  }
`;

export default function ChattingList({ chattingRooms }) {
  const navigator = useNavigate();

  return (
    <Container>
      <Wrapper>
        <h1>상담톡</h1>
        <MenuWrapper>
          <button type="button">최근 톡</button>
          <button type="button" onClick={() => navigator('/myPage/chats')}>상담 목록</button>
        </MenuWrapper>
        <div>
          <ChattingBox>
            <ChattingRoomList>
              {chattingRooms.length ? chattingRooms
                .map((chattingRoom) => (chattingRoom.chattingRoom.message
                  ? (
                    <ChattingRoom key={chattingRoom.chattingRoom.id}>
                      <button type="button" onClick={() => navigator(`${chattingRoom.chattingRoom.id}`)}>
                        <ChattingRoomMessage>
                          <h2>
                            {chattingRoom.chattingRoom.trainerName}
                            님
                          </h2>
                          <p>{chattingRoom.chattingRoom.message.substring(0, 60)}</p>
                        </ChattingRoomMessage>
                        <ChattingRoomTime>
                          <h2>{dateFormatter.localTime(chattingRoom.chattingRoom.updateTime)}</h2>
                          {chattingRoom.count
                            ? <p>{chattingRoom.count}</p>
                            : null}
                        </ChattingRoomTime>
                      </button>
                    </ChattingRoom>
                  )
                  : null))
                : <p>채팅상대가 없습니다.</p>}
            </ChattingRoomList>
          </ChattingBox>
        </div>
      </Wrapper>
    </Container>
  );
}
