import Checkbox from '@/components/checkbox/Checkbox';
import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import { UserPositionHangleEnum } from '@/constants/user';
import { useToast } from '@/hooks/useToast';
// TODO: 백엔드 스키마 완성 후 실제 서비스로 교체
// import { useCreateDepartmentAllowance } from '@/services/departmentAllowance';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { Position, PositionType } from '@/types/graphql';
import { numberFormat } from '@/utils/common';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const RegistDepartmentAllowanceModal = (
  props: TModal & { positions: Position[] },
) => {
  const { positions, ...modalProps } = props;
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null,
  );
  const [minThreshold, setMinThreshold] = useState<number>(0);
  const [maxThreshold, setMaxThreshold] = useState<number>(0);
  const [noMaxThreshold, setNoMaxThreshold] = useState<boolean>(false);
  // TODO: 백엔드 스키마 완성 후 departmentAllowanceRate로 교체
  const [positionIncentiveRate, setPositionIncentiveRate] = useState<number>(0);
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  // TODO: 백엔드 스키마 완성 후 주석 해제
  // const { createDepartmentAllowance } = useCreateDepartmentAllowance();

  // 팀장과 본부장만 선택 가능
  const filteredPositions = useMemo(() => {
    return positions
      .filter(
        (p) =>
          p.name === PositionType.TeamLeader ||
          p.name === PositionType.GeneralManager,
      )
      .map((p) => ({
        ...p,
        koreanName: UserPositionHangleEnum[p.name],
      }));
  }, [positions]);

  const handleRegist = useCallback(async () => {
    setSubmit(true);
    if (!selectedPosition) return;

    try {
      // TODO: 백엔드 스키마 완성 후 주석 해제
      // const response = await createDepartmentAllowance({
      //   positionId: selectedPosition.id,
      //   minThreshold,
      //   maxThreshold: noMaxThreshold ? (null as any) : maxThreshold,
      //   departmentAllowanceRate: positionIncentiveRate,
      // });
      // if (response && response.data.createDepartmentAllowance.id) {
      //   addToast({
      //     id: Date.now(),
      //     isImage: true,
      //     content: `본부별 수당이 등록되었습니다.`,
      //     type: 'success',
      //   });
      //   modalProps.onConfirm?.();
      // }

      // 임시 처리
      addToast({
        id: Date.now(),
        isImage: true,
        content: `본부별 수당 등록 기능은 백엔드 스키마 완성 후 사용 가능합니다.`,
        type: 'warning',
      });
      modalProps.onConfirm?.();
    } catch (e) {
      console.warn(e);
      addToast({
        id: Date.now(),
        isImage: true,
        content: `등록에 실패했습니다.`,
        type: 'error',
      });
    }
  }, [
    addToast,
    // createDepartmentAllowance,
    modalProps,
    selectedPosition,
    minThreshold,
    maxThreshold,
    noMaxThreshold,
    positionIncentiveRate,
  ]);

  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleRegist();
      }
    },
    [handleRegist],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);

    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [handleEnter]);

  return (
    <>
      <SModal
        {...modalProps}
        title="본부별 수당 생성"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '등록',
        }}
        onConfirm={handleRegist}
      >
        <RegistModalContentWrapper>
          <div className="InputWrapper">
            <span>
              직급 선택 <p className="required">*</p>
            </span>
            <Select
              value={selectedPosition || { id: '', koreanName: '' }}
              list={filteredPositions}
              trackBy="id"
              valueBy="koreanName"
              onChange={(value) => setSelectedPosition(value)}
              placeholder="직급을 선택하세요"
            />
          </div>
          <div className="InputWrapper">
            <span>
              하한값(이상) <p className="required">*</p>
            </span>
            <Input
              value={numberFormat(minThreshold)}
              onTextChange={(text) => {
                const value = Number(text.replace(/,/g, ''));
                setMinThreshold(value);
              }}
              type="text"
              isNumber
              postfixNode={'원'}
            />
          </div>
          <div className="InputWrapper">
            <span>상한값(미만)</span>
            <Input
              value={noMaxThreshold ? '' : numberFormat(maxThreshold)}
              onTextChange={(text) => {
                const value = Number(text.replace(/,/g, ''));
                setMaxThreshold(value);
              }}
              type="text"
              isNumber
              postfixNode={'원'}
              disabled={noMaxThreshold}
              placeholder={noMaxThreshold ? '상한 없음' : ''}
            />
          </div>
          <div className="CheckboxWrapper">
            <Checkbox
              value={noMaxThreshold}
              onCheckedChange={() => setNoMaxThreshold(!noMaxThreshold)}
            />
            <span>상한 없음</span>
          </div>
          <div className="InputWrapper">
            <span>
              수당율 <p className="required">*</p>
            </span>
            <Input
              value={numberFormat(positionIncentiveRate)}
              onTextChange={(text) => {
                const value = Number(text.replace(/,/g, ''));
                if (value > 100) {
                  setPositionIncentiveRate(100);
                } else setPositionIncentiveRate(value);
              }}
              max={100}
              type="text"
              isNumber
              postfixNode={'%'}
            />
          </div>
        </RegistModalContentWrapper>
      </SModal>
    </>
  );
};

export default RegistDepartmentAllowanceModal;

const SModal = styled(Modal)`
  .modalWrapper {
    .modalHeader {
      padding: 30px 30px 0px;
    }
  }
`;
const RegistModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .InputWrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
    span {
      display: flex;
      gap: 5px;
      .required {
        color: red;
      }
    }
    .inputBox {
      height: 48px;
      width: 100%;
      & > input {
        ${textXs12Medium}
      }
    }
  }
  .CheckboxWrapper {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;
