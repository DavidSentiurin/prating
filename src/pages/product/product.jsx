import styles from './product.module.scss';
import { PageContainer } from '../../components';
import { Image, ErrorContent, Rating, Button, BUTTON_TYPES } from '../../components';
import { RatingToVote } from './RatingToVote/RatingToVote';
import { ReactComponent as LoadingIcon } from '../../images/loading.svg';
import { ReactComponent as ReviewIcon } from '../../images/reviews.svg';
import { ReviewCard } from './ReviewCard/ReveiwCard';

export const ProductComponent = ({
  title,
  imageProps = {},
  loadingContent,
  pageError,
  averageRating,
  numberOfReviews,
  ratingToVoteValue,
  onChangeRatingToVote,
  reviewValue,
  onChangeReviewInput,
  body,
  onSubmit,
  formError,
  isAuthorized,
  reviews = [],
  ownUsername
}) => {
  return (
    <PageContainer
      title={title ? `Product: ${title}` : ''}
    >
      {(pageError) ? (

        <ErrorContent
          message={pageError}
        />

      ) : (loadingContent) ? (

        <div className={styles['product-loading']}>
          <LoadingIcon />
        </div>

      ) : (

        <div className={styles['product']}>
          <div className={styles['product-info']}>
            <div className={styles['product-info-image']}>
              <Image 
                classNameContainer={styles['product-info-image-item']}
                {...imageProps}
              />
            </div>
            <div className={styles['product-info-line']}>
              <Rating rating={averageRating}/>

              <div className={styles['product-info-line-number_of_reviews']}>
                <span className={styles['product-info-line-number_of_reviews-icon']}>
                  <ReviewIcon />
                </span>
                <span>{numberOfReviews}</span>
              </div>
            </div>
            <div className={styles['product-info-content']}>
              <div className={styles['product-info-content-title']}>
                <h2>{title}</h2>
              </div>
              <div className={styles['product-info-content-body']}>
                <p>{body}</p>
              </div>

              {isAuthorized && (
                <>
                  <div className={styles['product-info-separator']} />

                  <form 
                    className={styles['product-info-content-form']}
                    onSubmit={onSubmit}
                  >
                    <h6 className={styles['product-info-content-form-title']}>
                      Leave your review
                    </h6>
                    <div className={styles['product-info-content-form-to_vote']}>
                      <h6 className={styles['product-info-content-form-to_vote-title']}>
                        Rate:
                      </h6>
                      <RatingToVote
                        selectedRating={ratingToVoteValue}
                        onChange={onChangeRatingToVote}
                      />
                    </div>
                    <div className={styles['product-info-content-form-reaview']}>
                      <h6 className={styles['product-info-content-form-reaview-title']}>
                        Leave a review:
                      </h6>

                      <textarea 
                        className={styles['product-info-content-form-reaview-textarea']}
                        placeholder='Enter review'
                        value={reviewValue}
                        onChange={onChangeReviewInput}
                      />

                      <Button 
                        buttonType={BUTTON_TYPES.GHOST}
                        type='submit'
                      >
                        Send review
                      </Button>
                    </div>
                    <div className={styles['product-info-content-form-errors']}>
                      <span>{formError}</span>
                    </div>
                  </form>
                </>
              )}

            </div>
          </div>
          <div className={styles['product-reviews']}>
            {reviews.map((review, index) => (
              <div 
                key={review.id}
                className={styles['product-reviews-item']}
              >
                <ReviewCard 
                  username={review.created_by?.username}
                  reviewText={review.text}
                  rating={review.rate}
                  ownUsername={ownUsername}
                />
              </div>
            ))}
          </div>
        </div>

      )}
    </PageContainer>
  );
}
