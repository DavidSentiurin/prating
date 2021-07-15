import styles from './Rating.module.scss';
import { ReactComponent as FillStarIcon } from '../../images/fill_star.svg';
import { ReactComponent as NoFillStarIcon } from '../../images/no_fill_star.svg';
import config from '../../config/index.json';

export const Rating = ({
  rating = 0,
}) => {
  const maxRating = config.rating.maxValue;

  const starIconElementsForRander = () => {
    const retingElements = [];

    for (let i = 1; i <= maxRating; i++) {
      const fillStarElement = (
        <div key={i} className={styles['rating-icons-item']}>
          <FillStarIcon />
        </div>
      );
    
      const noFillStarElement = (
        <div key={i} className={styles['rating-icons-item']}>
          <NoFillStarIcon />
        </div>
      );

      if (i <= Math.floor(rating)) {
        retingElements.push(fillStarElement);
      } else {
        retingElements.push(noFillStarElement);
      }

    }

    return retingElements;
  }
  

  return (
    <div className={styles['rating']}>
      <div className={styles['rating-icons']}>
        {starIconElementsForRander()}
      </div>
      <div className={styles['rating-numbers']}>
        <span className={styles['rating-numbers-current']}>{rating}</span>
        <span className={styles['rating-numbers-max']}>/{maxRating}</span>
      </div>
    </div>
  );
};
