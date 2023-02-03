/* eslint-disable no-shadow */
import { useEffect, useRef, useState } from 'react';

import SockJs from 'sockjs-client';

import Stomp from 'stompjs';

import { useLocation } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import config from '../../config';

import useUserStore from '../hooks/useUserStore';
import Chatting from '../conponents/Chatting';

const baseUrl = config.apiBaseUrl;

export default function ChattingPage() {
  const location = useLocation();

  const userStore = useUserStore();

  const { user } = userStore;

  const [accessToken] = useLocalStorage('accessToken', '');

  const path = location.pathname;

  const roomId = Number(path.split('chats/')[1]);

  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chattingParticipants, setChatParticipants] = useState({});

  const stompClient = useRef({});

  useEffect(() => {
    console.log(user);
    const sockJs = new SockJs(`${baseUrl}/stomp/chat`);

    stompClient.current = Stomp.over(sockJs);

    stompClient.current.connect({ }, () => {
      stompClient.current.subscribe(`/sub/chats/room/${roomId}`, (chats) => {
        if (stompClient.current.connected) {
          setChatMessages([]);
        }

        const chatList = JSON.parse(chats.body);

        // eslint-disable-next-line array-callback-return
        chatList.map((chat) => {
          const {
            id, status, time, message, writer,
          } = chat;

          setChatMessages((chatMessages) => [...chatMessages, {
            id, status, time, message, writer,
          }]);
        });
      });

      stompClient.current.subscribe(`/sub/chat/room/${roomId}`, (chat) => {
        const {
          id, status, time, message, writer,
        } = JSON.parse(chat.body);

        setChatMessages((chatMessages) => [...chatMessages, {
          id, status, time, message, writer,
        }]);
      });

      stompClient.current.subscribe('/sub/user/chat', (chat) => {
        const {
          userName, trainerName, trainerImage,
        } = JSON.parse(chat.body);

        setChatParticipants({ userName, trainerName, trainerImage });
      });

      stompClient.current.send(
        '/pub/chat/messages',
        { Authorization: `Bearer ${accessToken}` },
        JSON.stringify({ roomId }),
      );

      stompClient.current.send(
        '/pub/user/chat/enter',
        { Authorization: `Bearer ${accessToken}` },
        JSON.stringify({ roomId }),
      );
    });

    return () => {
      if (stompClient.current.connected) {
        stompClient.current.disconnect(() => {
          stompClient.current.connected = false;
        });
      }
    };
  }, []);

  const publish = (message) => {
    if (!stompClient.current.connected) {
      return;
    }
    stompClient.current.send(
      '/pub/chat/message',
      { Authorization: `Bearer ${accessToken}` },
      JSON.stringify({
        roomId,
        writer: user.userName,
        message,
      }),
    );
    setMessage('');
  };

  const publishMessage = (message) => {
    publish(message);
  };

  const messageChange = (value) => {
    setMessage(value);
  };

  return (
    <Chatting
      message={message}
      messageChange={messageChange}
      chatMessages={chatMessages}
      publishMessage={publishMessage}
      chattingParticipants={chattingParticipants}
    />
  );
}
