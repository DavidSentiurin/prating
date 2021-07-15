import styles from './ErrorContent.module.scss';
import { ReactComponent as ImageErrorIcon } from '../../images/components/Image/error.svg';

export const ErrorContent = ({
  message,
}) => {
  return (
    <div className={styles['error-content']}>
      <div className={styles['error-content-img']}>
        <ImageErrorIcon />
      </div>
      {message && (
         <div className={styles['error-content-message']}>
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};
