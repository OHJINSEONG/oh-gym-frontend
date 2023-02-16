import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useLockerStore from '../hooks/useLockerStore';
import useTicketStore from '../hooks/useTicketStore';
import { PaddingTop } from '../conponents/ui/Padding';
import useProductStore from '../hooks/useProductStore';
import useOrderStore from '../hooks/useOrderStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  padding-top: 50px;
  width: 100%;
  height: 774px; 
`;

const Wapper = styled.div`
   display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  h2{
    width: 90%;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 96%;
  height: auto;
  margin-top: 20px;
}

  li{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid black;
}

  button {
  padding: 15px;
  color : white;
}

  .AVAILABLE{ 
  background-color: #97a6c2;
}

.myLocker{ 
  background-color: #EF781A;
}

  .RESERVED{ 
  background-color: red;
}

  .INUSE{ 
  background-color: #d7d7d7;
}

.NOUSE{ 
  background-color: black;
}
`;

const LockerStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
  width: 85%;
  padding-left: 20px;
  font-size: 7px;

  .inUse{
    display: flex;
    justify-content: center;
    align-items: center;

    p{
      width: 10px;
      height: 10px;
      background-color: #d7d7d7;
      margin-right: 2px;
      margin-bottom: 2px;
    }
  }

  .reserved{
    display: flex;
    justify-content: center;
    align-items: center;

    p{
      width: 10px;
      height: 10px;
      background-color: red;
      margin-right: 2px;
      margin-bottom: 2px;
    }
  }

  .my{
    display: flex;
    justify-content: center;
    align-items: center;

    p{
      width: 10px;
      height: 10px;
      background-color: #EF781A;
      margin-right: 2px;
      margin-bottom: 2px;
    }
  }

  .available{
    display: flex;
    justify-content: center;
    align-items: center;

    p{
      width: 10px;
      height: 10px;
      background-color: #97a6c2;
      margin-right: 2px;
      margin-bottom: 2px;
    }
  }

  .noUse{
    display: flex;
    justify-content: center;
    align-items: center;

    p{
      width: 10px;
      height: 10px;
      background-color: black;
      margin-right: 2px;
      margin-bottom: 2px;
    }
  }
`;

const LockerTicket = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  width: 90%;
  height: 100px;
  margin-bottom: 40px;
  border-radius: 20px;
  box-shadow: 0px 3px 3px 0px gray;
  border: 1px solid #D1D1D1;  

  h3{
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  p{
    font-size: 12px;
  }
`;

const LockerTicketInformation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
  
  div{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  button{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-radius: 20px;
    background-color: #EF781A;
    
  }
`;

const MembershipProductListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #D1D1D1;

  text-align: start;
`;

const MembershipInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80%;

  h2{
    font-weight: 600;
    font-size: 23px;
    margin-bottom: 10px;
  }
`;

const MembershipProductList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const MembershipProductOptionList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-left: 40px;
  padding-bottom: 30px;
  margin-top: 20px;
  
  button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    border: 1px solid black;
    background-color: white;
    width: 320px;
    height: 130px;
    padding: 15px 10px;
    border-radius: 20px;
    margin-bottom: 20px;
    box-shadow: 2px 6px 6px 2px gray;
  }
`;

const PeriodWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50%;
  padding: 10px;
  border-radius: 5px;

  h2{
    font-size: 20px;
    font-weight: 750;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #EBEBEB;
  width: 100%;
  height: 50%;
  padding: 10px;
  border-radius: 10px;

  p{
    font-size: 14px;
  }

  h2{
    font-weight: 600;
    font-size: 23px;
  }

  h3{
    font-size: 14px;
    margin: 8px;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LockersPage() {
  const lockerStore = useLockerStore();
  const ticketStore = useTicketStore();
  const productStore = useProductStore();
  const orderStore = useOrderStore();
  const userStore = useUserStore();

  const { lockers, locker } = lockerStore;

  const { lockerInformation } = ticketStore;

  const [value, setValue] = useState(0);

  useEffect(() => {
    ticketStore.findLockerTicket();
    lockerStore.fetchLockers();
    productStore.fetchProducts();
    console.log(lockerInformation);
  }, [value]);

  const inUseLockerCount = lockers.filter((e) => e.status === 'INUSE').length;

  const reservedLockerCount = lockers.filter((e) => e.status === 'RESERVED').length;

  const unavailableLockerCount = lockers.filter((e) => e.status === 'NOUSE').length;

  const availableLockerCount = lockers.length
  - inUseLockerCount - unavailableLockerCount - reservedLockerCount;

  const handleClickReserve = (lockerId) => {
    if (locker?.status === 'AVAILABLE'
     || lockerInformation.lockerTicket?.status === 'INUSE'
      || !lockerInformation.lockerTicket) {
      return;
    }
    lockerStore.fetchLocker(lockerId);
  };

  const handleClickOrderLocker = async (productId, option) => {
    await orderStore.create({
      productId,
      optionId: option.id,
      itemName: '락커',
      totalPrice: option.price,
      cunsumerName: userStore.user.name,
      consumerAge: 27,
      consumerBirthDate: '950828',
      consumerPhoneNumber: '010-5239-8955',
      consumerAddress: '서울',
      consumerAddressDetail: '성수동',
    });
    setValue(value + 1);
  };

  const handleClickLockerCancel = async () => {
    await lockerStore.lockerCancel(lockerInformation.locker.id);
    await ticketStore.lockerTicketUnUse(lockerInformation.lockerTicket.id);
    setValue(value + 1);
  };

  if (!lockerInformation.lockerTicket) {
    return (
      <PaddingTop>
        <Container>
          <MembershipProductListWrapper>
            <MembershipInformation>
              <h2>락커 이용권</h2>
              <p>락커 이용권을 구매하셔야 사용하실 수 있습니다.</p>
            </MembershipInformation>
            <MembershipProductList>
              {productStore.products?.filter((product) => product.type === 'LOCKER').map((product) => (
                <li key={product.id}>
                  <MembershipProductOptionList>
                    {product.options?.map((option) => (
                      <li key={option.id}>
                        <button
                          type="button"
                          onClick={() => handleClickOrderLocker(product.id, option)}
                        >
                          <PeriodWrapper>
                            <h2>
                              {option.dateOfUse / 30}
                              개월
                            </h2>
                          </PeriodWrapper>
                          <PriceWrapper>
                            <p>정상가</p>
                            {option.dateOfUse === 30 ? (
                              <Price>
                                <h2>
                                  월
                                  {' '}
                                  {option.price.toLocaleString()}
                                  원
                                </h2>
                              </Price>
                            ) : (
                              <Price>
                                <h3>
                                  {option.price.toLocaleString()}
                                  원
                                </h3>
                                <h2>
                                  월
                                  {' '}
                                  {Math.ceil((option.price / (option.dateOfUse / 30)))
                                    .toLocaleString()}
                                  원
                                </h2>
                              </Price>
                            )}
                          </PriceWrapper>
                        </button>
                      </li>
                    ))}
                  </MembershipProductOptionList>
                </li>
              ))}
            </MembershipProductList>
          </MembershipProductListWrapper>
        </Container>
      </PaddingTop>
    );
  }

  return (
    <PaddingTop>
      <Container>
        <Wapper>
          <h2>락카 이용권</h2>
          {lockerInformation.lockerTicket?.status === 'UNUSED'
            ? (
              <LockerTicket>
                <h3>락커를 선택해주세요</h3>
                <p>
                  락카 사용 가능일수 :
                  {' '}
                  {lockerInformation.lockerTicket.useOfDate}
                  일
                </p>
              </LockerTicket>
            )
            : (
              <LockerTicket>
                <h3>
                  나의 라커
                  {' '}
                  {lockerInformation.locker.lockerNumber}
                  번
                </h3>
                <LockerTicketInformation>
                  <div>
                    <p>
                      유효 기간 :
                      {' '}
                      {lockerInformation.lockerTicket.startDate}
                      {' ~ '}
                      {lockerInformation.lockerTicket.endDate}
                    </p>
                    <p>
                      남은 기간 :
                      {' '}
                      {`${Math.ceil((new Date(lockerInformation.lockerTicket.endDate) - new Date()) / (1000 * 60 * 60 * 24)) - 1}일`}
                    </p>
                  </div>
                  <button type="button" onClick={handleClickLockerCancel}>라커 해제</button>
                </LockerTicketInformation>
              </LockerTicket>
            )}
          <LockerStatus>
            <div className="inUse">
              <p />
              사용중
              {`(${inUseLockerCount})`}
            </div>
            <div className="available">
              <p />
              사용가능
              {`(${availableLockerCount})`}
            </div>
            <div className="noUse">
              <p />
              사용불가
              {`(${unavailableLockerCount})`}
            </div>
            <div className="reserved">
              <p />
              예약중
              {`(${reservedLockerCount})`}
            </div>
            <div className="my">
              <p />
              내 라카룸
            </div>
          </LockerStatus>
          <ul>
            {lockers.map((locker) => (
              <li key={locker.id} className={locker.status === 'INUSE' && locker.id === lockerInformation.locker?.id ? 'myLocker' : locker.status}>
                <button type="button" onClick={() => handleClickReserve(locker.id)}>
                  {locker.lockerNumber}
                </button>
              </li>
            ))}
          </ul>
        </Wapper>
      </Container>
    </PaddingTop>
  );
}
