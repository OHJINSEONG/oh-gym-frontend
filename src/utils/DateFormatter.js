/* eslint-disable class-methods-use-this */
import moment from 'moment';
import 'moment/locale/ko';

export default class DateFormatter {
  localDate(time) {
    return moment(time).format('YYYY-MM-DD');
  }

  localTime(time) {
    return moment(time).format('LT');
  }

  localDateTime(time) {
    return moment(time).format('LLL');
  }
}

export const dateFormatter = new DateFormatter();
