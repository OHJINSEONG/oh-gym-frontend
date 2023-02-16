import Store from './Store';

export default class TimeStore extends Store {
  constructor() {
    super();
    this.time = 0;
    this.hours = '00';
    this.minutes = '00';
    this.seconds = '00';
    this.status = '';
    this.setTime = 5;
    this.setTimerMinutes = '1';
    this.setTimerSeconds = '00';
    this.setTimerStatus = 'pause';
  }

  tick() {
    this.time += 1;
    this.hours = Math.floor(this.time / 3600) < 10
      ? `0${Math.floor(this.time / 3600)}`
      : Math.floor(this.time / 3600);
    this.minutes = Math.floor(this.time / 60) % 60 < 10
      ? `0${Math.floor(this.time / 60) % 60}`
      : Math.floor(this.time / 60) % 60;
    this.seconds = this.time % 60 < 10
      ? `0${this.time % 60}`
      : this.time % 60;

    this.publish();
  }

  start() {
    this.status = 'start';

    this.publish();
  }

  pause() {
    this.status = 'pause';

    this.publish();
  }

  async stop() {
    this.status = 'stop';
    this.time = await 0;

    this.publish();
  }

  setTick() {
    if (this.setTime === -1) {
      this.setTimerStatus = 'stop';
      this.setTime = 60;

      return;
    }

    this.setTimerMinutes = Math.floor(this.setTime / 60) % 60 < 10
      ? `${Math.floor(this.setTime / 60) % 60}`
      : Math.floor(this.setTime / 60) % 60;
    this.setTimerSeconds = this.setTime % 60 < 10
      ? `0${this.setTime % 60}`
      : this.setTime % 60;

    this.setTime -= 1;

    this.publish();
  }

  setStart() {
    this.setTimerStatus = 'start';

    this.publish();
  }

  setTimeReset() {
    this.setTimerStatus = 'stop';
    this.setTime = 60;

    this.publish();
  }
}

export const timeStore = new TimeStore();
