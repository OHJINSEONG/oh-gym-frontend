import { useEffect } from 'react';
import { chattingRoomStore } from '../stores/ChattingRoomStore';
import useForceUpdate from './useForceUpdate';

export default function useChattingRoomStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    chattingRoomStore.subscribe(forceUpdate);

    return () => chattingRoomStore.unsubscribe(forceUpdate);
  }, []);

  return chattingRoomStore;
}
