import Checkbox from '@/components/checkbox/Checkbox';
import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import { useGetBrand, useUpdateBrand } from '@/services/brand';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { UpdateBrandDto } from '@/types/graphql';
import { numberFormat } from '@/utils/common';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const EditBrandModal = (props: TModal & { id: number }) => {
  const { id, ...modalProps } = props;
  const { data } = useGetBrand(id);
  const [name, setName] = useState<UpdateBrandDto['name']>();
  const [brandFee, setBrandFee] = useState<UpdateBrandDto['brandFee']>();
  const [isDomestic, setIsDomestic] = useState<UpdateBrandDto['isDomestic']>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { updateBrand } = useUpdateBrand();

  const handleBrandEdit = useCallback(async () => {
    setSubmit(true);
    if (!name) return;
    try {
      const response = await updateBrand({
        id,
        name,
        brandFee,
        isDomestic,
      });
      if (response && response.data.updateBrand.id) {
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
  }, [id, addToast, updateBrand, modalProps, name, brandFee, isDomestic]);
  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleBrandEdit();
      }
    },
    [handleBrandEdit],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [handleEnter]);

  useEffect(() => {
    const detail = data?.getBrand;
    if (detail) {
      setName(detail.name);
      setIsDomestic(detail.isDomestic);
      setBrandFee(detail.brandFee);
    }
  }, [data]);

  return (
    <>
      <SModal
        {...modalProps}
        title="브랜드 수정"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '수정',
        }}
        onConfirm={handleBrandEdit}
      >
        <EditTeamModalContentWrapper>
          <div className="InputWrapper">
            <span>
              브랜드 명 <p className="required">*</p>
            </span>
            <Input
              value={name ?? ''}
              onTextChange={(text) => setName(text)}
            />
          </div>
          <div className="InputWrapper">
            <span>브랜드 수수료율</span>
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
              value={isDomestic ?? false}
              onCheckedChange={() => setIsDomestic(!isDomestic)}
            ></Checkbox>
          </div>
        </EditTeamModalContentWrapper>
      </SModal>
    </>
  );
};

export default EditBrandModal;

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
