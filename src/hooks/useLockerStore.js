import { useEffect } from 'react';
import { lockerStore } from '../stores/LockerStore';
import useForceUpdate from './useForceUpdate';

export default function useLockerStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    lockerStore.subscribe(forceUpdate);

    return () => lockerStore.unsubscribe(forceUpdate);
  }, []);

  return lockerStore;
}
