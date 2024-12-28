import styles from './searchBox.module.scss';
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import LocalStorage from '@/utils/localStorage';
import { SvgIcon } from '../common/SvgIcon';

interface ISearchBoxProps {
  className?: string;
  value: string;
  placeholder?: string;
  recentKey?: string;
  keyword?: string;
  isQr?: boolean;
  onTextChange?: (value: string) => void;
  onKeyDown?: (value: string) => void;
  onRemoveClick?: () => void;
  onRecentClick?: (value: string) => void;
}

const SearchBox = ({
  className,
  value,
  placeholder,
  recentKey,
  keyword,
  isQr,
  onTextChange,
  onKeyDown,
  onRemoveClick,
  onRecentClick,
  ...props
}: ISearchBoxProps) => {
  const [text, setText] = useState<string>('');
  const [barcode, setBarcode] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setText(e.target.value);
      if (onTextChange) onTextChange(e.target.value);
    },
    [onTextChange],
  );

  const handleRemoveClick = useCallback(() => {
    setText('');
    if (onTextChange) onTextChange('');
    if (onRemoveClick) onRemoveClick();
  }, [onTextChange, onRemoveClick]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (text && recentKey) {
          const updatedSearches = [
            text,
            ...recentSearches.filter((recent) => recent !== text),
          ];
          setRecentSearches(updatedSearches);
          LocalStorage.setItem(recentKey, JSON.stringify(updatedSearches));
        }
        if (onKeyDown) onKeyDown(text);
      }
    },
    [text, recentKey, onKeyDown, recentSearches],
  );

  const handleBarcodeKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Enter') {
        if (
          e.key !== 'ㅂ' &&
          e.key !== 'ㄱ' &&
          e.key !== 'q' &&
          e.key !== 'r' &&
          e.key !== ';'
        ) {
          setBarcode((prev) => prev + e.key);
        }
      } else {
        setText(barcode);
        if (onKeyDown) onKeyDown(barcode);
        setBarcode('');
      }
    },
    [barcode, onKeyDown],
  );

  const handleRecentDelete = useCallback(
    (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, keyword: string) => {
      if (recentKey) {
        e.stopPropagation();
        const updatedSearches = [
          ...recentSearches.filter((recent) => recent !== keyword),
        ];
        setRecentSearches(updatedSearches);
        LocalStorage.setItem(recentKey, JSON.stringify(updatedSearches));
      }
    },
    [recentKey, recentSearches],
  );

  const handleAllRecentDelete = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      if (recentKey) {
        LocalStorage.removeItem(recentKey);
        setRecentSearches([]);
        setIsFocus(false);
      }
    },
    [recentKey],
  );

  const handleRecentClick = useCallback(
    (value: string) => {
      setText(value);
      if (onTextChange) onTextChange(value);
      if (onRecentClick) onRecentClick(value);
      setIsFocus(false);
    },
    [onTextChange, onRecentClick],
  );

  const handleFocusOut = (event: MouseEvent) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target as Node)
    ) {
      setIsFocus(false);
    }
  };

  useEffect(() => {
    setText(value);
  }, [value, setText]);

  useEffect(() => {
    document.addEventListener('click', (e: any) => {
      handleFocusOut(e);
    });
    if (recentKey) {
      const storedSearches = LocalStorage.getItem(recentKey);
      if (storedSearches) setRecentSearches(JSON.parse(storedSearches));
    }
    return () => {
      document.removeEventListener('click', (e: any) => {
        handleFocusOut(e);
      });
    };
  }, [recentKey]);

  // 컴포넌트가 마운트될 때 이벤트 리스너 등록
  useEffect(() => {
    if (isQr) {
      window.addEventListener('keydown', handleBarcodeKeyDown);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      if (isQr) {
        window.removeEventListener('keydown', handleBarcodeKeyDown);
      }
    };
  }, [handleBarcodeKeyDown, isQr]);

  return (
    <div
      className={[className, styles.searchBoxWrapper].join(' ')}
      ref={searchBoxRef}
    >
      <SvgIcon
        iconName="icon-search"
        alt="search"
      />

      <input
        value={text}
        onFocus={() => setIsFocus(true)}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
      {isQr && text?.length === 0 && (
        <div className="hover">
          <SvgIcon iconName="icon-qrCode" />
          <div
            className="tooltip"
            style={{ top: '100%', width: 'auto' }}
          >
            <span style={{ whiteSpace: 'nowrap', maxWidth: '100%' }}>
              QR라벨을 스캔하여 검색할 수 있습니다
            </span>
          </div>
        </div>
      )}
      {text?.length > 0 && (
        <SvgIcon
          iconName="icon-close-round"
          onClick={handleRemoveClick}
          className={styles.remove}
        />
      )}
      {recentKey && isFocus && (
        <div className={`${styles.recentWrapper} recentWrapper`}>
          {keyword ? (
            <div className={styles.keywordWrapper}>
              <p className={styles.keywordTitle}>검색 키워드</p>
              <p className={styles.keywordText}>{keyword}</p>
            </div>
          ) : null}
          <div
            className={`${styles.recentHeader} ${isScrolled ? styles.scrolled : ''}`}
          >
            <p>최근 검색어</p>
            <span onClick={handleAllRecentDelete}>전체삭제</span>
          </div>
          <ul
            onScroll={(e) =>
              setIsScrolled((e.target as HTMLUListElement).scrollTop > 2)
            }
          >
            {recentSearches.length > 0 &&
              recentSearches.map((keyword, idx) => (
                <li
                  key={idx}
                  onClick={() => handleRecentClick(keyword)}
                >
                  {keyword}
                  <SvgIcon
                    iconName="icon-close-round"
                    onClick={(e) => handleRecentDelete(e, keyword)}
                    alt="close"
                  />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
