import styles from './RatingToVote.module.scss';
import { useState } from 'react';
import { jc } from '../../../utils';
import config from '../../../config/index.json';

export const RatingToVote = ({
  selectedRating,
  onChange,
}) => {
  const maxRating = config.rating.maxValue;
  const [hover, setHover] = useState({
    itemId: 0, 
    isHovered: false
  });

  const starElementsForRander = () => {
    const starElements = [];

    // create start element for rander
    for (let i = 1; i <= maxRating; i++) {
      const starElementCheckbox = (
        <div 
          key={i}
          className={styles['rating_to_vote-item']}
        >

          {/* star icon in background */}
          <div 
            className={jc(
              styles['rating_to_vote-item-star_icon'],
              (hover.itemId >= i && hover.isHovered) ? styles['hover'] : '',
              (selectedRating >= i) ? styles['selected'] : '',
            )}
            onClick={() => onChange(i)}

            // We determine on which element the hover was produced and write it to the state
            onMouseOver={() => setHover({
              itemId: i, 
              isHovered: true
            })}
            onMouseLeave={() => setHover({
              itemId: i, 
              isHovered: false
            })}
          />

          <input 
            type='checkbox'
            checked={selectedRating >= i ? true : false}
            readOnly
          />
        </div>
      );

      starElements.push(starElementCheckbox);
    };

    return starElements;
  }

  return (
    <div className={styles['rating_to_vote']}>
      {starElementsForRander()}

      {/* hover view is more priority then selected rating view */}
      {(selectedRating > 0 || hover.isHovered) && (
        <span className={styles['rating_to_vote-number']}>
          <span className={styles['rating_to_vote-number-selected']}>
            {hover.isHovered ? hover.itemId : selectedRating }
          </span>
          <span className={styles['rating_to_vote-number-max_rating']}>/{maxRating}</span>
        </span>
      )}
    </div>
  );
};
