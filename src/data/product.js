import { makeObservable, runInAction, observable, toJS } from 'mobx';
import { service } from './base/service';
import { session } from '../data';
import moment from 'moment';

export class Product {
  data = [];
  // initial reviews with server
  _reviews = [];
  numberOfReviews = 0;
  averageRating = 0;
  isLoaded = {
    getReviews: false,
  }

  constructor(data) {
    this.data = data;
    
    makeObservable(this, {
      data: observable,
      _reviews: observable,
      isLoaded: observable,
      numberOfReviews: observable,
      averageRating: observable,
    })
  }

  get reviews() {
    return this._sortReview(this._reviews);
  }

  async getReviews(productId) {
    if (typeof service.request === 'function' && productId) {
      try {
        const { status, data } = await service.request.get(`/api/reviews/${productId}`);

        if (status >= 200 && status < 300 && Array.isArray(data)) {

          runInAction(() => {
            this.averageRating = this._countAverageRating(data);
            this.numberOfReviews = data.length;
            this._reviews = data;
          });

          return {success: true, message: ''};
        }

        if (status >= 500) {
          return {success: false, message: 'Server is not available'};
        }

        return {success: false, message: 'Something went wrong, please try again later'};
      } catch (exception) {
        console.error(exception);
        return {success: false, message: 'Something went wrong, please try again later'};
      } finally {
        this._setIsLoaded('getReviews', true);
      }
    }

    this._setIsLoaded('getReviews', false);
  }

  async sendReview(productId, rate, review) {
    if (typeof service.request === 'function') {
      try {
        const { status } = await service.request.post(`/api/reviews/${productId}`, {
          rate,
          text: review
        });

        if (status >= 200 && status < 300) {
          // set new review to all the product reviews
          this._setNewReview(
            productId, 
            rate, 
            review, 
            session.profile.username
          );

          return {success: true, message: ''};
        }

        if (status >= 500) {
          return {success: false, message: 'Server is not available'};
        }

        return {success: false, message: 'Something went wrong, please try again later'};
      } catch (exception) {
        console.error(exception);
        return {success: false, message: 'Something went wrong, please try again later'};
      } finally {
        this._setIsLoaded('getReviews', true);
      }
    }

    this._setIsLoaded('getReviews', false);
  }

  _countAverageRating(review) {
    if (Array.isArray(review)) {
      const totalRating = review.reduce((acc, review) => {
        if (typeof review.rate === 'number') {
          return acc + review.rate;
        }

        return acc;
      }, 0);
      const numberOfReviews = review.length;

      return Number(totalRating / numberOfReviews)
        .toString()
        .slice(0, 3);
    }
  }

  _setNewReview(productId, rate, review, username) {
    runInAction(() => {
      this._reviews.push({
        // create an id to use it as a key for a list of React elements
        "id": Math.random(),
        "product": productId,
        "rate": rate,
        "text": review,
        "created_by": {
            "username": username,
            "first_name": "",
            "last_name": "",
            "email": ""
        },
        "created_at": moment(new Date()).format("YYYY-MM-DD HH:mm:ssZ"),
      });

      // recalculate averageRating
      this.averageRating = this._countAverageRating(this._reviews);
      // recalculate numberOfReviews
      this.numberOfReviews = this._reviews.length;
    })
  }


  _sortReview(reviews) {
    if (!Array.isArray(reviews)) {
      return [];
    }

    const sortedReviews = toJS(reviews).sort((a, b) => {
      return moment(b.created_at).unix() - moment(a.created_at).unix();
    });

    return sortedReviews;
  }

  _setIsLoaded(key, value) {
    runInAction(() => {
      this.isLoaded = {
        ...this.isLoaded,
        [key]: value,
      };
    })
  }
}
