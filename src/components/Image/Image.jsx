import styles from './Image.module.scss';
import { ReactComponent as ImageErrorIcon } from '../../images/components/Image/error.svg';
import { useState } from 'react';
import { omit } from '../../utils';

export const Image = (props) => {
  const [error, setError] = useState(false);

  return (
    <div className={`${styles['image']} ${props.classNameContainer || ''}`}>
      {(error || !props.src) ? (
        <span className={styles['image-error-icon']}>
          <ImageErrorIcon />
        </span>
      ) : (
        <img 
          {...omit(props, ['classNameContainer', 'alt'])}
          alt={props.alt || ''}
          onError={() => {
            setError(true);
          }}
        />
      )}
    </div>
  )
};
