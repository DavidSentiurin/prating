import styles from './ProductCard.module.scss';
import { Image } from '../../components';
import { Link } from 'react-router-dom';

export const ProductCard = (props) => {
  return (
    <article>
      <div className={styles['card']}>
        <figure className={styles['card-image']}>
          <Link {...props.linkProps}>
            <Image 
              classNameContainer={styles['card-image-item']}
              {...props.image}
            />
          </Link>
        </figure>
        <div className={styles['card-line']} />
        <div className={styles['card-content']}>
          <header className={styles['card-content-title']}>
            <h2>{props.title}</h2>
          </header>
          <section className={styles['card-content-body']}>
            <p>{props.body}</p>
          </section>
          <footer className={styles['card-content-footer']}>
            <Link 
              {...props.linkProps} 
              className={styles['card-content-footer-link']}
            >
              <span className={styles['card-content-footer-link-text']}>
                Show more info
              </span>
            </Link>
          </footer>
        </div>
      </div>
    </article>
  )
};
