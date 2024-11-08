import styled from 'styled-components';
import Barchart from '@/components/barchart/Barchart';

const Dashboard = () => {
  //   const [activeGraphTab, setActiveGraphTab] = useState<
  //     'customer' | 'counsel' | 'adjustment'
  //   >('customer');
  return (
    <DashboardWrapper>
      <DashboardHeader>
        <h2>대시보드</h2>
      </DashboardHeader>
      <DashboardContent>
        <Box>
          <div className="header">
            <h3>이번달 매출현황</h3>
          </div>
          <div className="content">
            <Barchart></Barchart>
          </div>
        </Box>
        <Box className="green">
          <div className="header">
            <h3>지난달 매출현황</h3>
          </div>
          <div className="content"></div>
        </Box>
        <Box>
          <div className="header">
            <h3>이번달 매출 1위</h3>
          </div>
          <div className="content"></div>
        </Box>
        <Box className="green">
          <div className="header">
            <h3>지난달 매출 1위</h3>
          </div>
          <div className="content"></div>
        </Box>
        <Box>
          <div className="header">
            <h3>이번달 계약1위</h3>
          </div>
          <div className="content"></div>
        </Box>
        <Box className="green">
          <div className="header">
            <h3>지난달 계약 1위</h3>
          </div>
          <div className="content"></div>
        </Box>
      </DashboardContent>
      {/* <InfoWrapper>
        <LeftWrapper>
          <DashboardBoxWrapper>
            <DashboardBox className="red">
              <div className="numberWrapper">
                <h2>10,000</h2>
                <p>10월 신규고객</p>
              </div>
              <div className="textWrapper">
                <p>지난달: 100명</p>
                <span>100</span>
              </div>
            </DashboardBox>
            <DashboardBox className="purple">
              <div className="numberWrapper">
                <h2>10,000</h2>
                <p>원하시는거로 변경가능</p>
              </div>
              <div className="textWrapper">
                <p>지난달: 100명</p>
                <span>100</span>
              </div>
            </DashboardBox>
            <DashboardBox className="blue">
              <div className="numberWrapper">
                <h2>10,000</h2>
                <p>원하시는거로 변경가능</p>
              </div>
              <div className="textWrapper">
                <p>지난달: 100원</p>
                <span>100</span>
              </div>
            </DashboardBox>
          </DashboardBoxWrapper>
          <SmallGraphWrapper>
            <SmallGraphBox>
              <h6>그래프</h6>
            </SmallGraphBox>
            <SmallGraphBox>
              <h6>그래프</h6>
            </SmallGraphBox>
          </SmallGraphWrapper>
        </LeftWrapper>
        <StatusBox>
          <h6>오늘 현황</h6>
        </StatusBox>
      </InfoWrapper>
      <GraphBox>
        <ul className="title">
          <li
            className={activeGraphTab === 'customer' ? 'active' : ''}
            onClick={() => setActiveGraphTab('customer')}
          >
            고객
          </li>
          <li
            className={activeGraphTab === 'counsel' ? 'active' : ''}
            onClick={() => setActiveGraphTab('counsel')}
          >
            상담
          </li>
          <li
            className={activeGraphTab === 'adjustment' ? 'active' : ''}
            onClick={() => setActiveGraphTab('adjustment')}
          >
            정산
          </li>
        </ul>
      </GraphBox> */}
    </DashboardWrapper>
  );
};

export default Dashboard;

const DashboardWrapper = styled.div`
  background: #fff;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DashboardHeader = styled.div`
  text-align: left;
  h2 {
    font-size: 24px;
    font-weight: 700;
  }
`;
const DashboardContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
const Box = styled.div`
  width: 49%;
  border-radius: 10px;
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &.green {
    background-color: #e7faf2;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-size: 20px;
      font-weight: 700;
    }
  }
  .content {
  }
`;
// const InfoWrapper = styled.div`
//   display: flex;
//   gap: 30px;
// `;

// const LeftWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 30px;
// `;

// const DashboardBoxWrapper = styled.div`
//   display: flex;
//   gap: 30px;
// `;

// const DashboardBox = styled.div`
//   width: 400px;
//   height: 200px;
//   border: 1px solid #ddd;
//   display: flex;
//   flex-direction: column;
//   .numberWrapper {
//     background: #fff;
//     height: 80%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     gap: 20px;
//     & > h2 {
//       font-size: 36px;
//       font-weight: 700;
//     }
//   }
//   .textWrapper {
//     padding: 10px;
//     display: flex;
//     justify-content: space-between;
//     border-top: 1px solid #ddd;
//     align-items: center;
//     & > span {
//       width: 100px;
//       padding: 5px;
//       color: #fff;
//     }
//   }
//   &.red {
//     .numberWrapper {
//       & > h2 {
//         color: #ff3126;
//       }
//     }
//     .textWrapper {
//       & > span {
//         background: #ff3126;
//       }
//     }
//   }
//   &.purple {
//     .numberWrapper {
//       & > h2 {
//         color: #871fff;
//       }
//     }
//     .textWrapper {
//       & > span {
//         background: #871fff;
//       }
//     }
//   }
//   &.blue {
//     .numberWrapper {
//       & > h2 {
//         color: #1c24ff;
//       }
//     }
//     .textWrapper {
//       & > span {
//         background: #1c24ff;
//       }
//     }
//   }
// `;

// const SmallGraphWrapper = styled.div`
//   display: flex;
//   gap: 30px;
// `;

// const SmallGraphBox = styled.div`
//   width: 600px;
//   height: 270px;
//   background: #fff;
//   border: 1px solid #ddd;
//   border-radius: 16px;
//   text-align: left;
//   padding: 10px;
//   & > h6 {
//     color: #1aa18f;
//   }
// `;

// const StatusBox = styled.div`
//   width: 25%;
//   height: 500px;
//   background: #fff;
//   border: 1px solid #ddd;
//   border-radius: 16px;
//   margin-left: auto;
//   text-align: left;
//   padding: 10px;
//   & > h6 {
//     color: #1aa18f;
//   }
// `;

// const GraphBox = styled.div`
//   background: #fff;
//   border: 1px solid #ddd;
//   border-radius: 16px;
//   height: 500px;
//   .title {
//     text-align: left;
//     display: flex;
//     gap: 20px;
//     border-bottom: 1px solid #ddd;
//     padding: 10px;
//     li {
//       cursor: pointer;
//       &.active {
//         color: #ff3126;
//       }
//     }
//   }
//   .content {
//     padding: 10px;
//   }
// `;
