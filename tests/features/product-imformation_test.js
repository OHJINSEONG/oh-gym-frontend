Feature('상품 상세 정보 - 고객은 상품을 구매하기 위해 상품의 세부 정보를 확인할 수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
  I.click('Product');
});

Scenario('상품이 있을때', ({ I }) => {
  // When
  I.click('.item');

  // Then
  I.see('결제하기');
});
