import styles from './pagination.module.scss';
import { TPagination } from '@/types/common';
import { useCallback, useEffect, useState } from 'react';
import { SvgIcon } from '../common/SvgIcon';
import Button from '../button/Button';
import { PAGE_LENGTH_LIST } from '@/constants/common';
import useClickOutside from '@/hooks/useClickOutside';

const Pagination = ({
  totalCount,
  length,
  propsCurrentPage,
  getPage,
}: TPagination) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageList, setPageList] = useState<number[]>([]);
  const [isOpenLength, setIsOpenLength] = useState<boolean>(false);
  const totalPage = Math.ceil(totalCount / length);
  const lengthRef = useClickOutside(() => setIsOpenLength(false));

  const handleGetPage = useCallback(
    (offset: number, length: number) => {
      if (getPage) getPage(offset, length);
    },
    [getPage],
  );

  const handleSetCurrentPage = useCallback(
    (current: number) => {
      setCurrentPage(current);
      handleGetPage(current - 1, length);
    },
    [handleGetPage, length],
  );

  const handleSetLength = useCallback(
    (val: number) => {
      setIsOpenLength(false);
      handleGetPage(0, val);
    },
    [handleGetPage],
  );

  useEffect(() => {
    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    let maxPage = 0;

    if (totalPage > 5) {
      maxPage =
        Math.ceil(currentPage / 5) * 5 > totalPage
          ? totalPage
          : Math.ceil(currentPage / 5) * 5;
    } else maxPage = totalPage;

    let list = [];

    for (let i = startPage; i <= maxPage; i++) {
      list.push(i);
    }
    setPageList([...list]);
  }, [totalPage, length, currentPage, setPageList]);

  useEffect(() => {
    if (propsCurrentPage && propsCurrentPage !== currentPage) {
      handleSetCurrentPage(propsCurrentPage);
    }
  }, [propsCurrentPage, totalCount, length, handleSetCurrentPage, currentPage]);

  if (totalCount <= 0) return null;

  return (
    <div className={styles.paginationWrapper}>
      <ul>
        <li className={`${currentPage === 1 && styles.disabled}`}>
          <SvgIcon
            iconName="icon-pagination-arrow-first"
            alt="first"
            onClick={() => currentPage !== 1 && handleSetCurrentPage(1)}
          />
        </li>
        <li className={`${currentPage === 1 && styles.disabled}`}>
          <SvgIcon
            iconName="icon-pagination-arrow-prev"
            alt="prev"
            onClick={() =>
              currentPage !== 1 && handleSetCurrentPage(currentPage - 1)
            }
          />
        </li>
        {pageList.map((it, idx) => (
          <li
            key={idx}
            className={it === currentPage ? styles.active : ''}
            onClick={() => handleSetCurrentPage(it)}
          >
            {it}
          </li>
        ))}
        <li className={`${currentPage >= totalPage && styles.disabled}`}>
          <SvgIcon
            iconName="icon-pagination-arrow-next"
            alt="next"
            onClick={() =>
              currentPage < totalPage && handleSetCurrentPage(currentPage + 1)
            }
          />
        </li>
        <li className={`${currentPage >= totalPage && styles.disabled}`}>
          <SvgIcon
            iconName="icon-pagination-arrow-last"
            alt="last"
            onClick={() =>
              currentPage < totalPage &&
              handleSetCurrentPage(Math.ceil(totalCount / length))
            }
          />
        </li>
      </ul>
      <div
        className={styles.controlWrapper}
        ref={lengthRef}
      >
        <p>
          {totalCount}개 중 {(currentPage - 1) * length + 1} -{' '}
          {totalCount <= currentPage * length
            ? totalCount
            : currentPage * length}
        </p>
        <Button onClick={() => setIsOpenLength(!isOpenLength)}>
          <span>{length}개</span>
          <SvgIcon
            iconName="icon-arrowDown"
            alt="down"
          />
          {isOpenLength && (
            <ul>
              {PAGE_LENGTH_LIST.map((it, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSetLength(it)}
                >
                  <p>{it}개</p>
                </li>
              ))}
            </ul>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
