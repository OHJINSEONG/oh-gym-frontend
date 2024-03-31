const { default: TicketStore } = require('./TicketStore.js');

const context = describe;

describe('ticketStore', () => {
    let ticketStore;

    beforeEach(() => {
        ticketStore = new TicketStore();
    });

    describe('findLockerTicket', () => {
        it('findLockerTicket', async () => {
            await ticketStore.findLockerTicket();

            expect(ticketStore.lockerInformation.periodOfUse).toEqual(30);
        });
    });

    describe('lockerTicketUnUse', () => {
        it('lockerTicketUnUse', async () => {
            await ticketStore.lockerTicketUnUse(1);

            expect(ticketStore.lockerInformation.status).toEqual('UNUSED');
        });
    });

    describe('fetchPtTickets', () => {
        it('fetchPtTickets', async () => {
            await ticketStore.fetchPtTickets();

            expect(ticketStore.ptTickets.length).toEqual(2);
        });
    });

    describe('fetchMembershipTickets', () => {
        it('fetchMembershipTickets', async () => {
            await ticketStore.fetchMembershipTickets();

            expect(ticketStore.membershipTickets.length).toEqual(2);
        });
    });

    describe('updatePtTicketUse', () => {
        it('updatePtTicketUse', async () => {
            await ticketStore.updatePtTicketUse(1, '2023-01-02');

            expect(ticketStore.inUsePtTicket.status).toEqual('INUSED');
        });
    });

    describe('updateMembershipUse', () => {
        it('updateMembershipUse', async () => {
            await ticketStore.updateMembershipUse(1, '2023-01-02');

            expect(ticketStore.inUseMembershipTicket.status).toEqual('INUSED');
        });
    });

    describe('findInUseMembershipTicket', () => {
        it('findInUseMembershipTicket', async () => {
            await ticketStore.findInUseMembershipTicket();

            expect(ticketStore.inUseMembershipTicket.status).toEqual('INUSED');
        });
    });

    describe('findInUsePtTicket', () => {
        it('findInUsePtTicket', async () => {
            await ticketStore.findInUsePtTicket();

            expect(ticketStore.inUsePtTicket.periodOfUse).toEqual(30);
        });
    });
});
