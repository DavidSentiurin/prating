import { observer } from "mobx-react";
import { ProductComponent } from "../../../pages";
import { withRouter } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { ProductsContext } from '../../../providers';
import { session } from '../../../data';

export const ProductContainer = withRouter(observer((props) => {
  const [pageError, setPageError] = useState('');
  const products = useContext(ProductsContext);
  const productId = props.match.params.productId;
  const [formData, setFormData] = useState({
    votedRating: 0,
    review: '',
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    // if we have no products in the store, get it
    (async () => {
      if (!products.isLoaded.getProducts) {
        const { success, message } = await products.getProducts();

        if (!success && message) {
          setPageError(message);
          return;
        }
      }

      // get product reviews
      if (
        productId &&
        products.isLoaded.getProducts && 
        products.map[productId] &&
        !products.map[productId].isLoaded.getReviews
      ) {
        const { success, message } = await products.map[productId].getReviews(productId);

        if (!success && message) {
          setPageError(message);
          return;
        }
      }
    })();
  }, [products, productId]);

  useEffect(() => {
    // if the product is not found in the products store after receiving the products from the server, show an error message
    if (!products.map[productId] && products.isLoaded.getProducts) {
      setPageError('Opps. Product not found =(');

      return;
    }
  }, [productId, products.map, products.isLoaded.getProducts]);

  const onChangeRatingToVote = (votedRatingValue) => {
    setFormData(prevData => ({
      ...prevData,
      votedRating: votedRatingValue
    }));
  }

  const onChangeReviewInput = ({target}) => {
    const review = target.value;

    setFormData(prevData => {      
      return ({
        ...prevData,
        review,
      })
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const product = products.map[productId];

    if (formData.review === '' && formData.votedRating === 0) {
      setFormError('Rating and review should not be empty');
      return;
    }

    if (formData.review === '') {
      setFormError('Review should not be empty');
      return;
    }

    if (formData.votedRating === 0) {
      setFormError('Rating should not be empty');
      return;
    }

    if (formError) {
      setFormError('');
    }
    
    if (product) {
      const { success } = await product.sendReview(
        product.data.id,
        formData.votedRating,
        formData.review
      );

      if (success) {
        setFormData({
          votedRating: 0,
          review: '',
        });
      }
    }
  }

  return (
    <ProductComponent 
      loadingContent={!products.isLoaded.getProducts}
      title={products.map[productId]?.data?.title}
      body={products.map[productId]?.data?.text}
      imageProps={{
        src: products.map[productId]?.data?.img,
        alt: `Product ${products.map[productId]?.data?.title}`,
        width: 576,
        height: 489,
      }}
      pageError={pageError}
      isAuthorized={session.isAuthorized}
      reviews={products.map[productId]?.reviews}
      averageRating={products.map[productId]?.averageRating}
      numberOfReviews={products.map[productId]?.numberOfReviews}

      // form
      onSubmit={onSubmit}
      ratingToVoteValue={formData.votedRating}
      onChangeRatingToVote={onChangeRatingToVote}
      reviewValue={formData.review}
      onChangeReviewInput={onChangeReviewInput}
      formError={formError}
      ownUsername={session.profile?.username}
    />
  );
}));
