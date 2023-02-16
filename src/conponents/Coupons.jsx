import styled from 'styled-components';

const MyCouponWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: white;
  margin-top: 8px;
`;

const MyCoupons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  .coupon{
    border-right: 1px solid #D9D9D9;
  }

  .point{
    border-right: 1px solid #D9D9D9;
  }

  div{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    
    p{
      font-size: 12px;
    }
  }

  .value{
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    margin-left: 6px;
    font-size: 12px;
  }
`;

export default function Coupons() {
  return (
    <MyCouponWrapper>
      <MyCoupons>
        <div className="point">
          <p>포인트 </p>
          <p className="value">0,000P</p>
        </div>
        <div className="coupon">
          <p>쿠폰 </p>
          <p className="value">0개</p>
        </div>
        <div>
          <p>찜 </p>
          <p className="value">0개</p>
        </div>
      </MyCoupons>
    </MyCouponWrapper>
  );
}
