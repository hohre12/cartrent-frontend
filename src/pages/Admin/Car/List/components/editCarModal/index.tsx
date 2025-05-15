import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import { useToast } from '@/hooks/useToast';
import { useGetBrands } from '@/services/brand';
import { useGetCar, useUpdateCar } from '@/services/car';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { Brand, UpdateCarDto } from '@/types/graphql';
import { numberFormat } from '@/utils/common';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const EditCarModal = (props: TModal & { id: number }) => {
  const { id, ...modalProps } = props;
  const { data } = useGetCar(id);
  const [brand, setBrand] = useState<Brand>();
  const [name, setName] = useState<UpdateCarDto['name']>();
  const [carFee, setCarFee] = useState<UpdateCarDto['carFee']>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { data: brands } = useGetBrands({});
  const { updateCar } = useUpdateCar();

  const handleCarEdit = useCallback(async () => {
    setSubmit(true);
    if (!name) return;
    try {
      const response = await updateCar({
        id,
        brandId: brand?.id,
        name,
        carFee,
      });
      if (response && response.data.updateCar.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `브랜드가 수정되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    }
  }, [brand, id, addToast, updateCar, modalProps, name, carFee]);
  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleCarEdit();
      }
    },
    [handleCarEdit],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [handleEnter]);

  useEffect(() => {
    const detail = data?.getCar;
    if (detail) {
      setBrand(detail.brand);
      setName(detail.name);
      setCarFee(detail.carFee);
    }
  }, [data]);

  return (
    <>
      <SModal
        {...modalProps}
        title="차량 수정"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '수정',
        }}
        onConfirm={handleCarEdit}
      >
        <EditTeamModalContentWrapper>
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
              value={name ?? ''}
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
        </EditTeamModalContentWrapper>
      </SModal>
    </>
  );
};

export default EditCarModal;

const SModal = styled(Modal)`
  .modalWrapper {
    .modalHeader {
      padding: 30px 30px 0px;
    }
  }
`;
const EditTeamModalContentWrapper = styled.div`
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
