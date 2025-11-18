import styled from 'styled-components';
import Barchart from '@/components/barchart/Barchart';
import { userState } from '@/state/auth';
import { useRecoilValue } from 'recoil';
import { useGetMonthlyTotalNetIncomeUsersByMonth } from '@/services/user';
import moment from 'moment';
import { useGetLatestNotice } from '@/services/notice';
import { useNavigate } from 'react-router-dom';
import { PermissionType } from '@/types/graphql';
import Loading from '@/components/loading/Loading';

const thisYear = moment().format('YYYY');
const thisMonth = moment().format('M');

const Dashboard = () => {
  const navigate = useNavigate();
  const my = useRecoilValue(userState);

  const { data: monthlyNetIncomeUsers, loading: loading1 } =
    useGetMonthlyTotalNetIncomeUsersByMonth({
      year: thisYear,
      month: thisMonth,
    });

  const { data: latestNotice, loading: loading2 } = useGetLatestNotice();

  if (loading1 || loading2) return <Loading message="대시보드 데이터를 불러오는 중..." />;

  return (
    <DashboardWrapper>
      <DashboardHeader>
        <h2>대시보드</h2>
      </DashboardHeader>
      <NoticeWrapper
        onClick={() => {
          if (my?.role.name === PermissionType.Admin && latestNotice) {
            navigate(`/admin/notice/${latestNotice.getLatestNotice.id}`);
          }
        }}
      >
        <h3>공지사항 영역</h3>
        <NoticeContent>
          {latestNotice
            ? latestNotice.getLatestNotice.body
            : '공지사항이 없습니다.'}
        </NoticeContent>
      </NoticeWrapper>
      <DashboardContent>
        <FullWidthBox>
          <div className="header">
            <h3>
              이번달 전체 직원 계약순익 현황 ({thisYear}년 {thisMonth}월)
            </h3>
          </div>
          <div className="content">
            <Barchart
              data={
                monthlyNetIncomeUsers?.getMonthlyTotalNetIncomeUsersByMonth ??
                []
              }
              keys={['totalNetIncomeContract']}
              indexBy={'user.name'}
              unitKey="계약순익"
              unit="원"
              marginLeft={100}
              countKey="totalCountContract"
            />
          </div>
        </FullWidthBox>
      </DashboardContent>
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
const NoticeWrapper = styled.div`
  cursor: pointer;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 20px;
  h3 {
    font-size: 20px;
    font-weight: 700;
    text-align: left;
  }
`;
const NoticeContent = styled.div`
  font-size: 16px;
  text-align: left;
`;
const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 50px;
`;

const FullWidthBox = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  padding: 30px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 20px;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));

  .header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h3 {
      font-size: 22px;
      font-weight: 700;
      color: #333;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 600px;
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
