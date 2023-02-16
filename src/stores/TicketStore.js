import { apiService } from '../services/ApiService';
import Store from './Store';

export default class TicketStore extends Store {
  constructor() {
    super();
    this.lockerInformation = {};
    this.ptTickets = [];
    this.ptTicket = {};
    this.membershipTickets = [];
    this.inUseMembershipTicket = {};
    this.inUsePtTicket = {};
  }

  async findLockerTicket() {
    const lockerInformation = await apiService.findLockerTicket();

    this.lockerInformation = lockerInformation;

    this.publish();
  }

  async lockerTicketUnUse(lockerTicketId) {
    const lockerInformation = await apiService.lockerTicketUnUse(lockerTicketId);

    this.lockerInformation = lockerInformation;

    this.publish();
  }

  async fetchPtTickets() {
    const ptTickets = await apiService.fetchPtTickets();

    this.ptTickets = ptTickets;

    this.publish();
  }

  async fetchMembershipTickets() {
    const membershipTickets = await apiService.fetchMembershipTickets();

    this.membershipTickets = membershipTickets;

    this.publish();
  }

  async updatePtTicketUse(ticketId, startDate) {
    const inUsePtTicket = await apiService.updatePtTicketUse(ticketId, startDate);

    this.inUsePtTicket = inUsePtTicket;

    this.publish();
  }

  async updateMembershipUse(ticketId, startDate) {
    const inUseMembershipTicket = await apiService.updateMembershipUse(ticketId, startDate);

    this.inUseMembershipTicket = inUseMembershipTicket;

    this.publish();
  }

  async findInUseMembershipTicket() {
    const inUseMembershipTicket = await apiService.findInUseMembershipTicket();

    this.inUseMembershipTicket = inUseMembershipTicket;

    this.publish();
  }

  async findInUsePtTicket() {
    const inUsePtTicket = await apiService.findInUsePtTicket();

    this.inUsePtTicket = inUsePtTicket;

    this.publish();
  }
}

export const ticketStore = new TicketStore();
