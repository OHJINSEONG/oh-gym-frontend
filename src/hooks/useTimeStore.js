import { useEffect } from 'react';
import { timeStore } from '../stores/TimeStore';

import useForceUpdate from './useForceUpdate';

export default function useTimeStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    timeStore.subscribe(forceUpdate);

    return () => timeStore.unsubscribe(forceUpdate);
  }, []);

  return timeStore;
}
