import Store from './Store';

export default class OrderFormStore extends Store {
  constructor() {
    super();
    this.name = '';
    this.age = '';
    this.birthDate = '';
    this.phoneNumber = '';
    this.type = '';
  }

  onChangeName(value) {
    this.name = value;

    this.publish();
  }

  onChangeAge(value) {
    this.age = value;

    this.publish();
  }

  onChangeBirthDate(value) {
    this.birthDate = value;

    this.publish();
  }

  onChangePhoneNumber(value) {
    this.phoneNumber = value;

    this.publish();
  }

  onChangeType(value) {
    this.type = value;

    this.publish();
  }
}

export const orderFormStore = new OrderFormStore();
