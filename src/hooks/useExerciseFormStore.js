import { useEffect } from 'react';
import { exerciseFormStore } from '../stores/ExerciseFormStore';
import useForceUpdate from './useForceUpdate';

export default function useExerciseFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    exerciseFormStore.subscribe(forceUpdate);

    return () => exerciseFormStore.unsubscribe(forceUpdate);
  }, []);

  return exerciseFormStore;
}
