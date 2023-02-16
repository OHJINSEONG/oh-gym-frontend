import { useEffect } from 'react';
import { diaryStore } from '../stores/DiaryStore';
import useForceUpdate from './useForceUpdate';

export default function useDiaryStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    diaryStore.subscribe(forceUpdate);

    return () => diaryStore.unsubscribe(forceUpdate);
  }, []);

  return diaryStore;
}
