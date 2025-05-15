import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import { useToast } from '@/hooks/useToast';
import { useGetBrands } from '@/services/brand';
import { useCreateCar } from '@/services/car';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { Brand, CreateCarDto } from '@/types/graphql';
import { numberFormat } from '@/utils/common';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const RegistCarModal = (props: TModal) => {
  const { ...modalProps } = props;
  const [brand, setBrand] = useState<Brand>();
  const [name, setName] = useState<CreateCarDto['name']>();
  const [carFee, setCarFee] = useState<CreateCarDto['carFee']>();
  const [submit, setSubmit] = useState<boolean>();
  const { addToast } = useToast();

  const { data: brands } = useGetBrands({});
  const { createCar } = useCreateCar();

  const handleCarRegist = useCallback(async () => {
    setSubmit(true);
    if (!brand) return;
    if (!name) return;
    try {
      const response = await createCar({
        brandId: brand.id,
        name,
        carFee,
      });
      if (response && response.data.createCar.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `차량이 등록되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    }
  }, [brand, addToast, createCar, modalProps, name, carFee]);
  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleCarRegist();
      }
    },
    [handleCarRegist],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [handleEnter]);

  return (
    <>
      <SModal
        {...modalProps}
        title="차량 등록"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '등록',
        }}
        onConfirm={handleCarRegist}
      >
        <RegistTeamModalContentWrapper>
          <div className="InputWrapper">
            <span>
              브랜드 <p className="required">*</p>
            </span>
            <Select
              size="medium"
              value={{ ...brand }}
              onChange={(value) => setBrand(value)}
              list={brands?.getBrands ? brands.getBrands : []}
              trackBy="id"
              valueBy="name"
              placeholder="브랜드를 선택해주세요"
            />
          </div>
          <div className="InputWrapper">
            <span>
              차량명 <p className="required">*</p>
            </span>
            <Input
              value={name}
              onTextChange={(text) => setName(text)}
            />
          </div>
          <div className="InputWrapper">
            <span>차량 수수료율</span>
            <Input
              value={numberFormat(carFee)}
              onTextChange={(text) => {
                const value = Number(text.replace(/,/g, ''));
                if (value > 100) {
                  setCarFee(100);
                } else setCarFee(value);
              }}
              max={100}
              type="number"
              isNumber
              postfixNode={'%'}
            />
          </div>
        </RegistTeamModalContentWrapper>
      </SModal>
    </>
  );
};

export default RegistCarModal;

const SModal = styled(Modal)`
  .modalWrapper {
    .modalHeader {
      padding: 30px 30px 0px;
    }
  }
`;
const RegistTeamModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .InputWrapper {
    .inputBox {
      height: 48px;
      width: 100%;
      & > input {
        ${textXs12Medium}
      }
    }
  }
`;
