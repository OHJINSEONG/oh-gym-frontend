import { useEffect } from 'react';
import { trainerStore } from '../stores/TrainerStore';
import useForceUpdate from './useForceUpdate';

export default function useTrainerStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    trainerStore.subscribe(forceUpdate);

    return () => trainerStore.unsubscribe(forceUpdate);
  }, []);

  return trainerStore;
}
