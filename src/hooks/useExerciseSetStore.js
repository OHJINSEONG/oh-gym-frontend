import { useEffect } from 'react';
import { exerciseSetStore } from '../stores/ExerciseSetStore';
import useForceUpdate from './useForceUpdate';

export default function useExerciseSetStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    exerciseSetStore.subscribe(forceUpdate);

    return () => exerciseSetStore.unsubscribe(forceUpdate);
  }, []);

  return exerciseSetStore;
}
