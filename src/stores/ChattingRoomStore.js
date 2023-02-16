import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ChattingRoomStore extends Store {
  constructor() {
    super();
    this.chattingRoom = {};
  }

  async create(trainerId) {
    const chattingRoom = await apiService.createChattingRoom(trainerId);

    this.chattingRoom = chattingRoom;

    this.publish();

    return chattingRoom;
  }
}

export const chattingRoomStore = new ChattingRoomStore();
