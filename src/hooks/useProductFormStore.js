import { useEffect } from 'react';
import { productFormStore } from '../stores/ProductFormStore';
import useForceUpdate from './useForceUpdate';

export default function useProductFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    productFormStore.subscribe(forceUpdate);

    return () => productFormStore.unsubscribe(forceUpdate);
  }, []);

  return productFormStore;
}
