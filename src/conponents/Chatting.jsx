import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import useChatStore from '../hooks/useChatStore';
import useUserStore from '../hooks/useUserStore';
import { PaddingTop } from './ui/Padding';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    background-color: white;

    h1 {
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

const Fix = styled.div`
    position: fixed;
    padding: 0 10px;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color: white;
    z-index: 999;

    div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h2 {
        font-size: 18px;
        font-weight: 650;
        margin-right: 3px;
        margin-bottom: 4px;
    }

    button {
        color: #ef781a;
    }
`;

const MenuWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;

    .chattingList {
        background-color: #ef781a;
        color: white;
        box-shadow: 0px 3px 3px 3px gray;
    }

    button {
        width: 100%;
        height: 50px;
        font-size: 17px;
        font-weight: bold;
    }
`;

const ChattingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    background-color: white;
    width: 100%;
    height: 75%;
    overflow-y: auto;
`;

const ChattingOpponent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f9fa;
    width: 100%;
    height: 70px;

    h2 {
        font-size: 18px;
        font-weight: 650;
        margin-right: 3px;
        margin-bottom: 4px;
    }
`;

const ChattingBox = styled.div`
    border-radius: 20px;
    width: 100%;
    height: 400px;
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
        padding-right: 10px;

        div {
            position: relative;
            display: inline-block;
            border-radius: 10px;
            padding: 10px 15px;
            max-width: 50%;
            background: #a5d6ed;
            color: white;
            font-size: 15px;
            z-index: 300;
        }

        .newChat {
            position: relative;
            display: inline-block;
            border-radius: 10px;
            border-top-right-radius: 0px;
            padding: 10px 15px;
            max-width: 50%;
            background: #a5d6ed;
            color: white;
            font-size: 15px;
            z-index: 300;
        }

        .newChat:after {
            content: '';
            position: absolute;
            top: 0%;
            right: -7px;
            border-top: 7px solid #a5d6ed;
            border-right: 7px solid transparent;
            z-index: 300;
        }

        .myChatTime {
            align-self: flex-end;
            margin-right: 1em;
            font-size: 10px;
            color: #6f7b87;
        }
    }

    .otherChat {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin: 3px;
        width: 100%;
        height: auto;
        word-break: break-all;
        padding-left: 60px;

        div {
            position: relative;
            display: inline-block;
            border-radius: 10px;
            padding: 10px 15px;
            max-width: 60%;
            background: #6f7b87;
            color: white;
            font-size: 15px;
            z-index: 300;
        }

        .myChatTime {
            align-self: flex-end;
            margin-left: 1em;
            font-size: 10px;
            color: #6f7b87;
        }
    }

    h3 {
        font-size: 0.7em;
        color: #6f7b87;
    }

    .chat:after {
        content: '';
        position: absolute;
        bottom: 30%;
        left: -10px;
        border-right: 15px solid #333c44;
        border-bottom: 15px solid transparent;
        z-index: 300;
    }
`;

const List = styled.li`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    img {
        width: 50px;
        height: 50px;
        border-radius: 15px;
    }

    .nextOtherChat {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        margin-top: 10px;

        .other {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            margin: 3px;
            width: 100%;
            height: auto;
            word-break: break-all;

            div {
                position: relative;
                display: inline-block;
                border-radius: 10px;
                border-top-left-radius: 0px;
                padding: 10px 15px;
                max-width: 64%;
                background: #6f7b87;
                color: white;
                font-size: 15px;
                z-index: 300;
            }

            div:after {
                content: '';
                position: absolute;
                top: 0%;
                left: -7px;
                border-right: 7px solid #6f7b87;
                border-bottom: 7px solid transparent;
                z-index: 300;
            }
        }
    }

    .myChatTime {
        align-self: flex-end;
        margin-left: 1em;
        font-size: 10px;
        color: #6f7b87;
        margin-bottom: 4px;
    }
`;

const FirstChat = styled.div`
    display: flex;
    width: 80%;
    margin-top: 6px;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 10px;

    h3 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 2px;
    }
`;

const Input = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 70px;
    padding-top: 10px;
    padding-bottom: 10px;

    textarea {
        border: 1px solid #d9d9d9;
        font-size: 15px;
        width: 270px;
        height: 30px;
    }

    button {
        margin-left: 10px;
        padding: 10px 20px;
        font-size: 0.5em;
        color: white;
        background-color: #ef781a;
    }
`;

export default function Chatting({ message, messageChange, chatMessages, publishMessage, chattingParticipants }) {
    const userStore = useUserStore();
    const chatStore = useChatStore();
    const navigator = useNavigate();

    const { chats } = chatStore;

    const scroll = useRef(null);

    useEffect(() => {
        chatStore.setChats(chatMessages, userStore.user.userName);
        setTimeout(() => {
            scroll?.current.scrollIntoView(false);
        }, 3);
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
        <PaddingTop>
            <Container className="noBottom">
                <Wrapper>
                    <Fix>
                        <button type="button" onClick={() => navigator(-1)}>
                            이전
                        </button>
                        <div>
                            <h2>{chattingParticipants.trainerName}</h2>
                            <p>트레이너</p>
                        </div>
                        <button type="button" onClick={() => navigator(-1)}>
                            정보
                        </button>
                    </Fix>
                    <MenuWrapper>
                        <button type="button" className="chattingList" onClick={() => navigator('/myPage/chats')}>
                            상담 목록
                        </button>
                    </MenuWrapper>
                    <ChattingWrapper>
                        <ChattingOpponent>
                            <h2>{chattingParticipants.trainerName}</h2>
                            <p>트레이너</p>
                        </ChattingOpponent>
                        <ChattingBox>
                            <ChattingList>
                                {chats.map((chat) =>
                                    chat.user === 'myChat' ? (
                                        <List key={chat.id}>
                                            {chat.writer || chat.status === 'new' ? (
                                                <div className={chat.user}>
                                                    {chat.time ? <p className="myChatTime">{chat.time}</p> : null}
                                                    <div className="newChat">
                                                        <p>{chat.message}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={chat.user}>
                                                    {chat.time ? <p className="myChatTime">{chat.time}</p> : null}
                                                    <div>
                                                        <p>{chat.message}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </List>
                                    ) : (
                                        <List key={chat.id}>
                                            {chat.writer || chat.status === 'new' ? (
                                                <div className="nextOtherChat">
                                                    <img src={chattingParticipants.trainerImage} />
                                                    <FirstChat>
                                                        <h3>{chattingParticipants.trainerName}</h3>
                                                        <div className="other">
                                                            <div>
                                                                <p>{chat.message}</p>
                                                            </div>
                                                            {chat.time ? (
                                                                <p className="myChatTime">{chat.time}</p>
                                                            ) : null}
                                                        </div>
                                                    </FirstChat>
                                                </div>
                                            ) : (
                                                <div className={chat.user}>
                                                    <div>
                                                        <p>{chat.message}</p>
                                                    </div>
                                                    {chat.time ? <p className="myChatTime">{chat.time}</p> : null}
                                                </div>
                                            )}
                                        </List>
                                    )
                                )}
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
                            <button type="button" onClick={handleClickSend}>
                                입력
                            </button>
                        </Input>
                    </ChattingWrapper>
                </Wrapper>
            </Container>
        </PaddingTop>
    );
}
