import { apiService } from '../services/ApiService';
import Store from './Store';

export default class NotificationStore extends Store {
    constructor() {
        super();
        this.notification = {};
        this.notifications = [];
    }

    sseConnect() {
        const sseEmitter = apiService.connectSseEmitter();

        return sseEmitter;
    }

    async fetchNotifications() {
        console.log('fe');

        const notifications = await apiService.fetchNotifications();

        this.notifications = notifications;

        this.publish();
    }

    async checkNotifications() {
        const notifications = await apiService.checkNotifications();

        this.notifications = notifications;

        this.publish();
    }

    async delete(notificationId) {
        await apiService.deleteNotification(notificationId);

        this.publish();
    }
}

export const notificationStore = new NotificationStore();
