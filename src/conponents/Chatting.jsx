import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import useChatStore from '../hooks/useChatStore';
import useUserStore from '../hooks/useUserStore';

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

const ChattingList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  padding-left: 11px;
  padding-right: 17px;
  background-color: white;
  width: 100%;

  .myChat {    
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 0.3em;
    width: 100%;
    height: auto;
    word-break: break-all;

    div {
      position: relative;
      display: inline-block;
      border-radius: 5px;
      padding: 10px;
      max-width: 60%;
      background: #a5d6ed;
      color: white;
      font-size: 0.7em;
    }

    div:after {
      content: '';
      position: absolute;
      bottom: 30%;
      right: -10px; 
      border-top: 15px solid #a5d6ed;
      border-right: 15px solid transparent;
    } 

    .myChatTime {
      align-self: flex-end;
      margin-right: 1em;
      font-size: 0.3em;
      color: #6F7B87
    }
  }

  .otherChat {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0.3em;
    width: 100%;
    height: auto;
    word-break: break-all;

    div {
      position: relative;
      display: inline-block;
      border-radius: 5px;
      padding: 10px;
      max-width: 60%;
      background: #6F7B87;
      color: white;
      font-size: 0.7em;
    }

    div:after {
      content: '';
      position: absolute;
      bottom: 30%;
      left: -10px; 
      border-right: 15px solid #6F7B87;
      border-bottom: 15px solid transparent;
    } 

    .myChatTime {
      align-self: flex-end;
      margin-left: 1em;
      font-size: 0.3em;
      color: #6F7B87
    }
  }

  
  h3{
    font-size: 0.7em;
    color: #6F7B87;
  }

  .chat:after {
    content: '';
    position: absolute;
    bottom: 30%;
    left: -10px;  
    border-right: 15px solid #333C44;
    border-bottom: 15px solid transparent;
  }
`;

const List = styled.li`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Input = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;


  button{
    margin-left: 10px;
    padding: 8px 15px;
    border: 1px solid black;
    font-size: 0.5em;
  }
`;

export default function Chatting({
  message, messageChange, chatMessages, publishMessage,
}) {
  const userStore = useUserStore();
  const chatStore = useChatStore();
  const navigator = useNavigate();

  const { chats } = chatStore;

  const scroll = useRef(null);

  const handleClickScrollDown = () => {
    scroll?.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    chatStore.setChats(chatMessages, userStore.user.userName);
    setTimeout(() => { scroll?.current.scrollIntoView(false); }, 3);
  }, [chatMessages]);

  const handleChangeChat = (event) => {
    messageChange(event.target.value);
  };

  const handleClickSend = () => {
    if (message.trim() === '') {
      return;
    }

    publishMessage(message);
  };

  const handlePressEnter = (e) => {
    e.preventDefault();

    if (message.trim() === '') {
      return;
    }

    publishMessage(message);
  };

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
            <ChattingList>
              {chats
                .map((chat) => (
                  chat.user === 'myChat'
                    ? (
                      <List key={chat.id}>
                        <div className={chat.user}>
                          {chat.time ? (
                            <p className="myChatTime">
                              {chat.time}
                            </p>
                          )
                            : null}
                          <div>
                            <p>
                              {chat.message}
                            </p>
                          </div>
                        </div>
                      </List>
                    )
                    : (
                      <List key={chat.id}>
                        {chat.writer ? (
                          <h3>
                            {chat.writer}
                          </h3>
                        )
                          : null}
                        <div className={chat.user}>
                          <div>
                            <p>
                              {chat.message}
                            </p>
                          </div>
                          {chat.time ? (
                            <p className="myChatTime">
                              {chat.time}
                            </p>
                          )
                            : null}
                        </div>
                      </List>
                    )
                ))}
              <p ref={scroll} />
            </ChattingList>
          </ChattingBox>
          <Input>
            <textarea
              type="textarea"
              name="input-chat"
              onChange={handleChangeChat}
              value={message}
              onKeyPress={(e) => e.key === 'Enter' && handlePressEnter(e)}
            />
            <button type="button" onClick={handleClickSend}>입력</button>
            <button type="button" onClick={handleClickScrollDown}>밑으로</button>
          </Input>
        </div>
      </Wrapper>
    </Container>
  );
}
