const { default: TicketStore } = require('./TicketStore.js');

const context = describe;

describe('ticketStore', () => {
  let ticketStore;

  beforeEach(() => {
    ticketStore = new TicketStore();
  });

  describe('fetchTickets', () => {
    it('fetchTickets', async () => {
      await ticketStore.fetchTickets();

      expect(ticketStore.tickets.length).toEqual(2);
    });
  });

  describe('findTicket', () => {
    it('findTicket', async () => {
      await ticketStore.findTicket(1);

      expect(ticketStore.ticket.ptTimes).toEqual(12);
    });
  });

  describe('findLockerTicket', () => {
    it('findLockerTicket', async () => {
      await ticketStore.findLockerTicket(1);

      expect(ticketStore.lockerTicket.ptTimes).toEqual(12);
    });
  });

  describe('fetchLockerTicket', () => {
    it('fetchLockerTicket', async () => {
      await ticketStore.fetchLockerTicket(1, '2022-12-25');

      expect(ticketStore.lockerTicket.startDate).toEqual('2022-12-25');
    });
  });
});
