import { useRecoilValue } from 'recoil';
import { toastListState } from '@/state/common';
import styles from './toast.module.scss';
import { SvgIcon } from '../common/SvgIcon';

const Toast = () => {
  const toastList = useRecoilValue(toastListState);

  return (
    <div className={styles.toastListWrapper}>
      {toastList.map((it, idx) => (
        <div
          className={styles.toastWrapper}
          key={idx}
        >
          {it.isImage && (
            <SvgIcon
              iconName={it.imgUrl ? it.imgUrl : `icon-toast-${it.type}`}
              alt={`img_${idx}`}
            />
          )}
          <div className={styles.toastText}>
            <h4>{it.title}</h4>
            <p>{it.content}</p>
          </div>
          {it.children}
        </div>
      ))}
    </div>
  );
};

export default Toast;
