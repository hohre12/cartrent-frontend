import { SvgIcon } from '@/components/common/SvgIcon';
import Input from '@/components/input/Input';
import { dummyCustomerList } from '@/dummy/customer';
import { selectedCustomerIdxState } from '@/state/customer';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import TextArea from '@/components/textArea/TextArea';

const CounselDetail = () => {
  const selectedCustomerIdx = useRecoilValue(selectedCustomerIdxState);

  //   const { data, isLoading, error } = useGetCustomer({
  //     userIdx: selectedCustomerIdx,
  //   });
  //   if (isLoading) return <div className="loading">Loading...</div>;
  //   if (error) return <div className="error">{String(error)}</div>;

  const data = dummyCustomerList.find(
    (it) => it.userIdx === selectedCustomerIdx,
  );

  return (
    <DetailWrapper>
      <InfoWrapper>
        <div className="ControlWrapper">
          <div>
            <SvgIcon iconName="icon-setting" />
          </div>
          <div>
            <SvgIcon iconName="icon-trash" />
          </div>
        </div>
        <div className="InputAreaWrapper">
          <div className="InputWrapper">
            <div>
              <span>고객명</span>
              <Input></Input>
            </div>
            <div>
              <span style={{ color: '#ff3261' }}>상담일</span>
              <Input></Input>
            </div>
            <div>
              <span>상담자</span>
              <Input></Input>
            </div>
          </div>
          <div className="TextAreaWrapper">
            <span style={{ color: '#ff3261' }}>상담내용</span>
            <TextArea
              value={''}
              style={{ width: '500px' }}
            ></TextArea>
          </div>
        </div>
      </InfoWrapper>
    </DetailWrapper>
  );
};

export default CounselDetail;

export const DetailWrapper = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InfoWrapper = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  gap: 20px;
  height: 100%;

  .ControlWrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
    & > div {
      border: 1px solid #eee;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .InputAreaWrapper {
    width: 510px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .InputWrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      & > div {
        display: flex;
        width: 49%;
        gap: 5px;
        & > span {
          width: 50px;
        }
      }
    }
    .TextAreaWrapper {
      display: flex;
      gap: 5px;
      & > span {
        width: 50px;
      }
    }
  }
`;
