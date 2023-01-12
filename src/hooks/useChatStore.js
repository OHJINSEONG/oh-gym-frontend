import { useEffect } from 'react';
import { chatStore } from '../stores/ChatStore';
import useForceUpdate from './useForceUpdate';

export default function useChatStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    chatStore.subscribe(forceUpdate);

    return () => chatStore.unsubscribe(forceUpdate);
  }, []);

  return chatStore;
}
