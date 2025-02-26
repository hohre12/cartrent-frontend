import styled from 'styled-components';
import Barchart from '@/components/barchart/Barchart';
import Trophy from '@/assets/pngs/trophy.png';
import { userState } from '@/state/auth';
import { useRecoilValue } from 'recoil';
import { PermissionType } from '@/types/graphql';

const data = [
  { name: '노홍철', sales: 1200 },
  { name: '박명수', sales: 2200 },
  { name: '유재석', sales: 3200 },
  { name: '정준하', sales: 3200 },
  { name: '길성준', sales: 3200 },
  { name: '정형돈', sales: 5200 },
  { name: '강호동', sales: 1200 },
  { name: '이수근', sales: 2200 },
  { name: '이승기', sales: 3200 },
  { name: '김종민', sales: 3200 },
  { name: '하하', sales: 3200 },
  { name: '하동훈', sales: 5200 },
];
const data2 = [
  { name: '김홍철', sales: 5200 },
  { name: '정명수', sales: 1200 },
  { name: '박재석', sales: 3200 },
  { name: '홍준하', sales: 200 },
  { name: '최성준', sales: 10200 },
  { name: '김형돈', sales: 3300 },
  { name: '이호동', sales: 7200 },
  { name: '박수근', sales: 2200 },
  { name: '하승기', sales: 3600 },
  { name: '최종민', sales: 1800 },
  { name: '촤하하', sales: 500 },
  { name: '감동훈', sales: 1200 },
];
const keys = ['sales'];
const indexBy = 'name';

const Dashboard = () => {
  //   const [activeGraphTab, setActiveGraphTab] = useState<
  //     'customer' | 'counsel' | 'adjustment'
  //   >('customer');
  const my = useRecoilValue(userState);
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
                <h3>영업사원별 이번달 매출현황</h3>
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
                  data={data}
                  keys={keys}
                  indexBy={indexBy}
                ></Barchart>
              </div>
            </Box>
            <Box className="green">
              <div className="header">
                <h3>영업사원별 지난달 매출현황</h3>
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
                  data={data2}
                  keys={keys}
                  indexBy={indexBy}
                ></Barchart>
              </div>
            </Box>
          </>
        )}
        <Box>
          <div className="header">
            <h3>이번달 매출 1위</h3>
          </div>
          <div className="content">
            {/* <img src={Trophy} /> */}
            <h2>테스트님</h2>
          </div>
        </Box>
        <Box className="green">
          <div className="header">
            <h3>지난달 매출 1위</h3>
          </div>
          <div className="content">
            <h2>테스트님</h2>
          </div>
        </Box>
        <Box>
          <div className="header">
            <h3>이번달 계약1위</h3>
          </div>
          <div className="content">
            <h2>테스트님</h2>
          </div>
        </Box>
        <Box className="green">
          <div className="header">
            <h3>지난달 계약 1위</h3>
          </div>
          <div className="content">
            <h2>테스트님</h2>
          </div>
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
