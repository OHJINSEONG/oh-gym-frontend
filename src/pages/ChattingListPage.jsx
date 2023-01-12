/* eslint-disable no-shadow */
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useLocalStorage } from 'usehooks-ts';
import config from '../../config';
import ChattingList from '../conponents/ChattingList';
import useUserStore from '../hooks/useUserStore';

const baseUrl = config.apiBaseUrl;

export default function ChattingListPage() {
  const userStore = useUserStore();

  const { user } = userStore;

  const [accessToken] = useLocalStorage('accessToken', '');

  const [chattingRooms, setChattingRooms] = useState([]);

  const stompClient = useRef({});

  useEffect(() => {
    console.log(user);
    const sockJs = new SockJS(`${baseUrl}/stomp/chat`);

    stompClient.current = Stomp.over(sockJs);

    stompClient.current.connect({ }, () => {
      console.log('hi');
      stompClient.current.subscribe('/sub/user/chattingRooms', (chattingRooms) => {
        if (stompClient.current.connected) {
          setChattingRooms([]);
        }

        const chattingRoomList = JSON.parse(chattingRooms.body);

        // eslint-disable-next-line array-callback-return
        chattingRoomList.map((chattingRoom) => {
          setChattingRooms((chattingRooms) => [...chattingRooms, chattingRoom]);
        });
      });

      stompClient.current.subscribe(`/sub/user/${user.email}`, () => {
        console.log('hi');
        stompClient.current.send(
          '/pub/user/chat/enter',
          { Authorization: `Bearer ${accessToken}` },
        );
      });

      stompClient.current.send(
        '/pub/user/chat/enter',
        { Authorization: `Bearer ${accessToken}` },
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

  return (
    <ChattingList chattingRooms={chattingRooms} />
  );
}
