import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { dateFormatter } from '../utils/DateFormatter';
import { PaddingTop } from './ui/Padding';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: white;
  min-height: 774px;

  h1{
    font-size: 2em;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  .chattingList{
    background-color: #EF781A;
    color: white;
    box-shadow: 0px 3px 3px 3px gray;
  }
  
  button{
    width: 50%;
    height: 50px;
    font-size: 17px;
    font-weight: bold;
  }
`;

const ChattingBox = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 8px;
  overflow-y: auto;
`;

const ChattingRoomList = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;  
  height: 100%;
`;

const ChattingRoom = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  button{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    width: 100%;
    font-size: 0.2px;
  }

  img{
    width: 60px;
    height: 60px;
    border-radius: 20px;
    box-shadow: 0px 2px 6px 0px gray;
  }
`;

const ChattingRoomMessage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
  width: 81%;
  height: 65%;
`;

const ChattingOpponentInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  height: 100%;
   
  p {
    font-size: 15px;
    text-align: start;
    word-break: break-all;
  }
`;

const OpponentName = styled.div`
  display: flex;
  align-items: flex-end;

  h2{
    font-weight: bold;
    font-size: 17px;
    margin-right: 3px;
  }

  p {
    font-size: 16px;
    font-weight: 700;
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
  padding-top: 9px;

  h2{
    height: 16px;
    font-size: 12px;
  }

  p{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    font-size: 12px;
    padding: 6px 9px;
    border-radius: 50%;
    background-color: #EF781A;
    color : white
  }
`;

export default function ChattingList({ chattingRooms }) {
  const navigator = useNavigate();

  return (
    <PaddingTop>
      <Container>
        <Wrapper>
          <MenuWrapper>
            <button type="button" className="chatting">최근 톡</button>
            <button type="button" className="chattingList" onClick={() => navigator('/myPage/chats')}>상담 목록</button>
          </MenuWrapper>
          <ChattingBox>
            <ChattingRoomList>
              {chattingRooms.length ? chattingRooms
                .map((chattingRoom) => (chattingRoom.chattingRoom.message
                  ? (
                    <ChattingRoom key={chattingRoom.chattingRoom.id}>
                      <button type="button" onClick={() => navigator(`${chattingRoom.chattingRoom.id}`)}>
                        <img src={chattingRoom.chattingRoom.trainerImage} />
                        <ChattingRoomMessage>
                          <ChattingOpponentInformation>
                            <OpponentName>
                              <h2>
                                {chattingRoom.chattingRoom.trainerName}
                              </h2>
                              <p>
                                트레이너
                              </p>
                            </OpponentName>
                            <p>{chattingRoom.chattingRoom.message.substring(0, 30)}</p>
                          </ChattingOpponentInformation>
                          <ChattingRoomTime>
                            <h2>{dateFormatter.localTime(chattingRoom.chattingRoom.updateTime)}</h2>
                            {chattingRoom.count
                              ? <p>{chattingRoom.count}</p>
                              : null}
                          </ChattingRoomTime>
                        </ChattingRoomMessage>
                      </button>
                    </ChattingRoom>
                  )
                  : null))
                : <p>채팅상대가 없습니다.</p>}
            </ChattingRoomList>
          </ChattingBox>
        </Wrapper>
      </Container>
    </PaddingTop>
  );
}
