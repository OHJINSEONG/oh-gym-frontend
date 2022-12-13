Feature('주문 하기 - 고객은 상품을 구매하기 위해서 주문 할 수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
  I.click('Product');
});

Scenario('pt상품 주문하기', ({ I }) => {
  // Given
  I.click('피티');

  // When
  I.ptOrder({
    count: '12회',
    dayOfWeek: '월 수 금',
    time: '11:00',
    startDate: '2023/01/02',
  });

  // Then
  I.see('카카오페이');
});

Scenario('이용권 주문하기', ({ I }) => {
  // Given
  I.click('이용권');

  // When
  I.licenseOrder({
    period: '3개월',
    startDate: '2023/01/02',
  });

  // Then
  I.see('카카오페이');
});
