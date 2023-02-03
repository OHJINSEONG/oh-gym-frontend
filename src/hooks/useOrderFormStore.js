import { useEffect } from 'react';
import { orderFormStore } from '../stores/OrderFormStore';

import useForceUpdate from './useForceUpdate';

export default function useOrderFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    orderFormStore.subscribe(forceUpdate);

    return () => orderFormStore.unsubscribe(forceUpdate);
  }, []);

  return orderFormStore;
}
