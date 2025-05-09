import Checkbox from '@/components/checkbox/Checkbox';
import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import { useCreateBrand } from '@/services/brand';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { CreateBrandDto } from '@/types/graphql';
import { numberFormat } from '@/utils/common';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const RegistBrandModal = (props: TModal) => {
  const { ...modalProps } = props;
  const [name, setName] = useState<CreateBrandDto['name']>();
  const [brandFee, setBrandFee] = useState<CreateBrandDto['brandFee']>();
  const [isDomestic, setIsDomestic] =
    useState<CreateBrandDto['isDomestic']>(false);
  const [submit, setSubmit] = useState<boolean>();
  const { addToast } = useToast();

  const { createBrand } = useCreateBrand();

  const handleBrandRegist = useCallback(async () => {
    setSubmit(true);
    if (!name) return;
    if (!brandFee) return;
    try {
      const response = await createBrand({
        name,
        brandFee,
        isDomestic,
      });
      if (response && response.data.createBrand.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `브랜드가 등록되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    }
  }, [addToast, createBrand, modalProps, name, brandFee, isDomestic]);
  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleBrandRegist();
      }
    },
    [handleBrandRegist],
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
        title="브랜드 등록"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '등록',
        }}
        onConfirm={handleBrandRegist}
      >
        <RegistTeamModalContentWrapper>
          <div className="InputWrapper">
            <span>
              브랜드 명 <p className="required">*</p>
            </span>
            <Input
              value={name}
              onTextChange={(text) => setName(text)}
            />
          </div>
          <div className="InputWrapper">
            <span>
              브랜드 수수료율 <p className="required">*</p>
            </span>
            <Input
              value={numberFormat(brandFee)}
              onTextChange={(text) => {
                const value = Number(text.replace(/,/g, ''));
                if (value > 100) {
                  setBrandFee(100);
                } else setBrandFee(value);
              }}
              max={100}
              type="number"
              isNumber
              postfixNode={'%'}
            />
          </div>
          <div className="InputWrapper">
            <span>
              국산여부 <p className="required">*</p>
            </span>
            <Checkbox
              value={isDomestic}
              onCheckedChange={() => setIsDomestic(!isDomestic)}
            ></Checkbox>
          </div>
        </RegistTeamModalContentWrapper>
      </SModal>
    </>
  );
};

export default RegistBrandModal;

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
