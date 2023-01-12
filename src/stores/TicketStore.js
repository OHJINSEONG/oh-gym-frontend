import { apiService } from '../services/ApiService';
import Store from './Store';

export default class TicketStore extends Store {
  constructor() {
    super();
    this.lockerInformation = {};
    this.tickets = [];
    this.ticket = {};
  }

  async findLockerTicket() {
    const lockerInformation = await apiService.findLockerTicket();

    this.lockerInformation = lockerInformation;

    this.publish();
  }

  async fetchLockerTicket(lockerTicketId, startDate) {
    const lockerTicket = await apiService.fetchLockerTicket(lockerTicketId, startDate);

    console.log(startDate);

    this.lockerTicket = lockerTicket;

    this.publish();
  }

  async fetchTickets() {
    const tickets = await apiService.fetchTickets();

    this.tickets = tickets;

    this.publish();
  }

  async findTicket(ticketId) {
    const ticket = await apiService.findTicket(ticketId);

    this.ticket = ticket;

    this.publish();
  }
}

export const ticketStore = new TicketStore();
