import Button from '@/components/button/Button';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Modal } from '@/components/modal/Modal';
import {
  COUNSEL_LIST_WATCH_OPTIONS,
  COUNSEL_LIST_WATCH_REQUIRED_OPTIONS,
} from '@/constants/counsel';
import { selectedCounselHideWatchOptionsState } from '@/state/counsel';
import { textS14Medium, textS14Regular } from '@/styles/typography';
import { TModal } from '@/types/common';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const WatchOptionModal = (props: TModal) => {
  const { ...modalProps } = props;
  const [selectedHideOptionsList, setSelectedHideOptionsList] = useState<
    string[]
  >([]);
  const [selectedHideWatchOptions, setSelectedHideWatchOptions] =
    useRecoilState(selectedCounselHideWatchOptionsState);

  const hideWatchOptionKeys = useMemo(() => {
    return Object.keys(
      COUNSEL_LIST_WATCH_OPTIONS,
    ) as (keyof typeof COUNSEL_LIST_WATCH_OPTIONS)[];
  }, []);

  const handleSetWatchOptions = useCallback(
    (key: string) => {
      if (!COUNSEL_LIST_WATCH_REQUIRED_OPTIONS.includes(key)) {
        if (selectedHideOptionsList.includes(key)) {
          const newList = selectedHideOptionsList.filter((it) => it !== key);
          setSelectedHideOptionsList(newList);
        } else {
          setSelectedHideOptionsList([...selectedHideOptionsList, key]);
        }
      }
    },
    [selectedHideOptionsList, setSelectedHideOptionsList],
  );

  const handleSetAllWatchOptions = useCallback(() => {
    if (
      selectedHideOptionsList.length ===
      hideWatchOptionKeys.filter(
        (it) => !COUNSEL_LIST_WATCH_REQUIRED_OPTIONS.includes(it),
      ).length
    ) {
      setSelectedHideOptionsList([]);
    } else {
      setSelectedHideOptionsList([
        ...hideWatchOptionKeys.filter(
          (it) => !COUNSEL_LIST_WATCH_REQUIRED_OPTIONS.includes(it),
        ),
      ]);
    }
  }, [
    selectedHideOptionsList,
    hideWatchOptionKeys,
    setSelectedHideOptionsList,
  ]);

  const handleSave = useCallback(() => {
    setSelectedHideWatchOptions([...selectedHideOptionsList]);
    if (modalProps.onConfirm) {
      modalProps.onConfirm();
    }
  }, [modalProps, selectedHideOptionsList, setSelectedHideWatchOptions]);

  useEffect(() => {
    if (selectedHideWatchOptions.length) {
      setSelectedHideOptionsList([...selectedHideWatchOptions]);
    }
  }, [selectedHideWatchOptions]);

  return (
    <SWatchOptionModal
      {...modalProps}
      title="보기옵션"
      wrapperClass="watchOptionModalWrapper"
      footerOption={{
        cancelText: '취소',
        confirmText: '저장',
      }}
      size={'small'}
      onConfirm={handleSave}
    >
      <WatchOptionWrapper>
        <Button
          size="large"
          className={selectedHideOptionsList.length === 0 ? 'active' : ''}
          onClick={handleSetAllWatchOptions}
        >
          전체선택
          {selectedHideOptionsList.length === 0 && (
            <SvgIcon iconName="icon-check" />
          )}
        </Button>
        <div className="optionWrapper">
          {hideWatchOptionKeys.map((it, idx) => (
            <Button
              key={idx}
              size="large"
              className={[
                `${selectedHideOptionsList.includes(it) ? '' : 'active'} ${COUNSEL_LIST_WATCH_REQUIRED_OPTIONS.includes(it) ? 'required' : ''}`,
              ].join(' ')}
              onClick={() => handleSetWatchOptions(it)}
            >
              <div>{COUNSEL_LIST_WATCH_OPTIONS[it]}</div>
              {COUNSEL_LIST_WATCH_REQUIRED_OPTIONS.includes(it) ? (
                <SvgIcon iconName="icon-lock" />
              ) : !selectedHideOptionsList.includes(it) ? (
                <SvgIcon iconName="icon-check" />
              ) : null}
            </Button>
          ))}
        </div>
      </WatchOptionWrapper>
    </SWatchOptionModal>
  );
};

export default WatchOptionModal;

export const SWatchOptionModal = styled(Modal)`
  .watchOptionModalWrapper .modalContentBody {
    padding: 0 30px;
  }
`;

export const WatchOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fff;
  border-radius: 20px;
  .optionWrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  button {
    ${textS14Regular}
    width: calc(50% - 10px);
    display: flex;
    justify-content: space-between;
    padding: 10px 12px;
    transition: none;
    & > div {
      display: flex;
      gap: 5px;
      align-items: center;
    }
    &.active {
      ${textS14Medium}
      background: #e5f0ff;
    }
    &.required {
      cursor: default;
    }
  }
`;
