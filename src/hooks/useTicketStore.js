import { useEffect } from 'react';
import useForceUpdate from './useForceUpdate';
import { ticketStore } from '../stores/TicketStore';

export default function useTicketStore() {
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        ticketStore.subscribe(forceUpdate);

        return () => ticketStore.unsubscribe(forceUpdate);
    }, []);

    return ticketStore;
}
