// in this file you can append custom step methods to 'I' object

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = function () {
  return actor({
    setupDatabase() {
      this.amOnPage(`${backdoorBaseUrl}/setup-database`);
    },
    deleteProducts() {
      this.amOnPage(`${backdoorBaseUrl}/delete-products`);
    },
    deleteOrders() {
      this.amOnPage(`${backdoorBaseUrl}/delete-orders`);
    },
    ptOrder({
      count, dayOfWeek, time, startDate,
    }) {
      this.click('select[name=ptTimes]');
      this.selectOption('ptTimes', count);
      this.click('select[name=dayOfWeek]');
      this.selectOption('dayOfWeek', dayOfWeek);
      this.click('select[name=time]');
      this.selectOption('tiem', time);
      this.fillField('상품 시작일', startDate);
      this.click('결제하기');
    },
    licenseOrder({
      period, startDate,
    }) {
      this.click('select[name=dateOfUse]');
      this.selectOption('dateOfUse', period);
      this.fillField('상품 시작일', startDate);
      this.click('결제하기');
    },
  });
};
