import { useEffect } from 'react';

import { setStore } from '../stores/SetStore';
import useForceUpdate from './useForceUpdate';

export default function useSetStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    setStore.subscribe(forceUpdate);

    return () => setStore.unsubscribe(forceUpdate);
  }, []);

  return setStore;
}
