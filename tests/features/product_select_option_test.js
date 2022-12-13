Feature('상품 옵션 선택 - 고객은 원하는 상품을 구매하기 위해 옵션을 선택 할수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
  I.click('Product');
});

Scenario('pt상품 옵션(횟수)', ({ I }) => {
  // Given
  I.click('피티');

  // When
  I.click('.ptTimes');

  // Then
  I.see('12회');
});

Scenario('pt상품 옵션(요일)', ({ I }) => {
  // Given
  I.click('피티');

  // When
  I.click('.dayOfWeek');

  // Then
  I.see('월 수 금');
});

Scenario('pt상품 옵션(시간)', ({ I }) => {
  // Given
  I.click('피티');

  // When
  I.click('.time');

  // Then
  I.see('11:00');
});

Scenario('기간제 이용권 옵션(3개월)', ({ I }) => {
  // Given
  I.click('헬스장 이용권');

  // When
  I.click('.dateOfUse');

  // Then
  I.see('3개월');
});
