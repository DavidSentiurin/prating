import styles from './ReveiwCard.module.scss';
import { Rating } from '../../../components';
import { jc } from '../../../utils';

export const ReviewCard = ({
  ownUsername,
  username,
  rating = 0,
  reviewText,
}) => {
  if (!username || !rating || !reviewText) {
    return null;
  }

  return (
    <div className={jc(
      styles['review'],
      (ownUsername === username) ? styles['own_review'] : ''
    )}>
      <div className={styles['review-header']}>
        <div className={styles['review-header-title']}>
          {username}
        </div>
        <Rating rating={rating}/>
      </div>
      <div className={styles['review-fotter']}>
        <p className={styles['review-fotter-body']}>
          {reviewText}
        </p>
      </div>
    </div>
  );
}
