Feature('시간표 - 고객은 자신의 시간을 확인하기 위해 시간표을 확인 할수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
});

Scenario('상품을 구입 하지 않았을때', ({ I }) => {
  // When
  I.click('Calender');

  // Then
  I.see('이용중인 상품이 없습니다.');
});

Scenario('pt상품을 구입 했 을때', ({ I }) => {
  // Given
  I.click('Product');
  I.click('피티');
  I.ptOrder({
    count: '12회',
    dayOfWeek: '월 수 금',
    time: '11:00',
    startDate: '2022/01/02',
  });
  I.click('결제하기');

  // When
  I.click('Calender');

  // Then
  I.see('시간표');
});
