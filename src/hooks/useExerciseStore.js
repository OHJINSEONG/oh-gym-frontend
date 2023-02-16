import { useEffect } from 'react';
import { exerciseStore } from '../stores/ExerciseStore';
import useForceUpdate from './useForceUpdate';

export default function useExerciseStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    exerciseStore.subscribe(forceUpdate);

    return () => exerciseStore.unsubscribe(forceUpdate);
  }, []);

  return exerciseStore;
}
