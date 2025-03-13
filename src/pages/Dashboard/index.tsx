import styled from 'styled-components';
import Barchart from '@/components/barchart/Barchart';
import Trophy from '@/assets/pngs/trophy.png';
import { userState } from '@/state/auth';
import { useRecoilValue } from 'recoil';
import { PermissionType } from '@/types/graphql';
import {
  useGetTopFiveDeliveryUsersByMonth,
  useGetTopFiveTotalFeeDeliveryUsersByMonth,
} from '@/services/user';
import moment from 'moment';

const data = [
  { name: '노홍철', 매출: 1200 },
  { name: '박명수', 매출: 2200 },
  { name: '유재석', 매출: 3200 },
  { name: '정형돈', 매출: 5200 },
  { name: '강호동', 매출: 1200 },
];
const data2 = [
  { name: '김홍철', 출고건수: 5 },
  { name: '정명수', 출고건수: 1 },
  { name: '박재석', 출고건수: 3 },
  { name: '홍준하', 출고건수: 0 },
  { name: '최성준', 출고건수: 10 },
];
const keys = ['매출'];
const keys2 = ['출고건수'];
const indexBy = 'name';

const Dashboard = () => {
  //   const [activeGraphTab, setActiveGraphTab] = useState<
  //     'customer' | 'counsel' | 'adjustment'
  //   >('customer');
  const my = useRecoilValue(userState);
  const { data: thisMonthTopFiveDeliveryUsers } =
    useGetTopFiveDeliveryUsersByMonth({
      year: moment().format('YYYY'),
      month: moment().format('MM'),
    });
  const { data: lastMonthTopFiveDeliveryUsers } =
    useGetTopFiveDeliveryUsersByMonth({
      year: moment().subtract(1, 'months').format('YYYY'),
      month: moment().subtract(1, 'months').format('MM'),
    });
  const { data: thisMonthTopFiveTotalFeeDeliveryUsers } =
    useGetTopFiveTotalFeeDeliveryUsersByMonth({
      year: moment().format('YYYY'),
      month: moment().format('MM'),
    });
  const { data: lastMonthTopFiveTotalFeeDeliveryUsers } =
    useGetTopFiveTotalFeeDeliveryUsersByMonth({
      year: moment().subtract(1, 'months').format('YYYY'),
      month: moment().subtract(1, 'months').format('MM'),
    });

  return (
    <DashboardWrapper>
      <DashboardHeader>
        <h2>대시보드</h2>
      </DashboardHeader>
      <DashboardContent>
        {my?.role?.name === PermissionType.Admin && (
          <>
            <Box>
              <div className="header">
                <h3>영업사원별 이번달 매출현황 TOP 5</h3>
              </div>
              <div className="content">
                <span
                  style={{
                    marginRight: 'auto',
                    marginTop: '50px',
                    fontSize: '14px',
                  }}
                >
                  단위(만원)
                </span>
                <Barchart
                  data={
                    thisMonthTopFiveTotalFeeDeliveryUsers?.getTopFiveTotalFeeDeliveryUsersByMonth
                      ? thisMonthTopFiveTotalFeeDeliveryUsers.getTopFiveTotalFeeDeliveryUsersByMonth.map(
                          (it) => ({
                            name: it.user.name,
                            매출: it.totalFeeDelivery,
                          }),
                        )
                      : []
                  }
                  keys={keys}
                  indexBy={indexBy}
                  formatText="원"
                ></Barchart>
              </div>
            </Box>
            <Box className="green">
              <div className="header">
                <h3>영업사원별 지난달 매출현황 TOP 5</h3>
              </div>
              <div className="content">
                <span
                  style={{
                    marginRight: 'auto',
                    marginTop: '50px',
                    fontSize: '14px',
                  }}
                >
                  단위(만원)
                </span>
                <Barchart
                  data={
                    lastMonthTopFiveTotalFeeDeliveryUsers?.getTopFiveTotalFeeDeliveryUsersByMonth
                      ? lastMonthTopFiveTotalFeeDeliveryUsers.getTopFiveTotalFeeDeliveryUsersByMonth.map(
                          (it) => ({
                            name: it.user.name,
                            매출: it.totalFeeDelivery,
                          }),
                        )
                      : []
                  }
                  keys={keys}
                  indexBy={indexBy}
                  formatText="원"
                ></Barchart>
              </div>
            </Box>
            <Box>
              <div className="header">
                <h3>영업사원별 이번달 출고건수 TOP 5</h3>
              </div>
              <div className="content">
                <span
                  style={{
                    marginRight: 'auto',
                    marginTop: '50px',
                    fontSize: '14px',
                  }}
                >
                  단위(건)
                </span>
                <Barchart
                  data={
                    thisMonthTopFiveDeliveryUsers?.getTopFiveDeliveryUsersByMonth
                      ? thisMonthTopFiveDeliveryUsers.getTopFiveDeliveryUsersByMonth.map(
                          (it) => ({
                            name: it.user.name,
                            출고건수: it.totalCountDelivery,
                          }),
                        )
                      : []
                  }
                  keys={keys2}
                  indexBy={indexBy}
                  formatText="건"
                ></Barchart>
              </div>
            </Box>
            <Box className="green">
              <div className="header">
                <h3>영업사원별 지난달 출고건수 TOP 5</h3>
              </div>
              <div className="content">
                <span
                  style={{
                    marginRight: 'auto',
                    marginTop: '50px',
                    fontSize: '14px',
                  }}
                >
                  단위(건)
                </span>
                <Barchart
                  data={
                    lastMonthTopFiveDeliveryUsers?.getTopFiveDeliveryUsersByMonth
                      ? lastMonthTopFiveDeliveryUsers.getTopFiveDeliveryUsersByMonth.map(
                          (it) => ({
                            name: it.user.name,
                            출고건수: it.totalCountDelivery,
                          }),
                        )
                      : []
                  }
                  keys={keys2}
                  indexBy={indexBy}
                  formatText="건"
                ></Barchart>
              </div>
            </Box>
          </>
        )}
        {/* <Box>
          <div className="header">
            <h3>이번달 매출 1위</h3>
          </div>
          <div className="content">
            <h2>
              {thisMonthRevenueUser?.getFirstRevenueUserByMonth
                ? `${thisMonthRevenueUser?.getFirstRevenueUserByMonth.name}님`
                : '데이터 없음'}
            </h2>
          </div>
        </Box>
        <Box className="green">
          <div className="header">
            <h3>지난달 매출 1위</h3>
          </div>
          <div className="content">
            <h2>
              {lastMonthRevenueUser?.getFirstRevenueUserByMonth
                ? `${lastMonthRevenueUser?.getFirstRevenueUserByMonth.name}님`
                : '데이터 없음'}
            </h2>
          </div>
        </Box>
        <Box>
          <div className="header">
            <h3>이번달 계약1위</h3>
          </div>
          <div className="content">
            <h2>
              {thisMonthContractUser?.getFirstContractUserByMonth
                ? `${thisMonthContractUser?.getFirstContractUserByMonth.name}님`
                : '데이터 없음'}
            </h2>
          </div>
        </Box>
        <Box className="green">
          <div className="header">
            <h3>지난달 계약 1위</h3>
          </div>
          <div className="content">
            <h2>
              {lastMonthContractUser?.getFirstContractUserByMonth
                ? `${lastMonthContractUser?.getFirstContractUserByMonth.name}님`
                : '데이터 없음'}
            </h2>
          </div>
        </Box> */}
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
  background: #f9f9f9;
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
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 10px;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
  &.green {
    background-color: #e7faf2;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h3 {
      font-size: 20px;
      font-weight: 700;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    & > h2 {
      font-size: 24px;
      font-weight: 700;
    }
    & > img {
      width: 300px;
      height: 300px;
    }
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
