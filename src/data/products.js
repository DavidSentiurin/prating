import { service } from './base/service';
import { computed, makeObservable, observable, runInAction } from 'mobx';
import { Product } from './product';
import config from '../config/index.json';

export class Products {
  // _data is initial data from server
  _data = [];
  // map is formatted data for rander
  map = {};
  isLoaded = {
    getProducts: false,
    getProductById: false,
  }

  constructor() {
    makeObservable(this, {
      _data: observable,
      map: observable,
      isLoaded: observable,
      listForRander: computed,
    });
  }

  get listForRander() {
    return Object.values(this.map);
  }

  async getProducts() {
    if (typeof service.request === 'function') {
      try {
        const { status, data } = await service.request.get('/api/products/');

        if (status >= 200 && status < 300) {
          /** 
           * We create a map in the form of an object for easy picking of the product by id 
           * 
           * Example: products.map[productId];
           * 
          */
          const productsMap = data.reduce((acc, product) => {
            // if img has no URL path, add domain URL with '/static/' route
            if (!product.img.startsWith('http')) {
              product.img = config.apiURL + '/static/' + product.img;
            }

            /**
             * We create an exemplar of each product that contains methods of working with a separate product (for example, leave a comment on the product). 
             */
            acc[product.id] = new Product(product);

            return acc;
          }, {});

          runInAction(() => {
            this._data = data;
            this.map = productsMap;
          });

          return {success: true, message: ''};
        }

        if (status >= 500) {
          return {success: false, message: 'Server is not available'};
        }

        return {success: false, message: 'Something went wrong, please try again later'};
      } catch (exception) {
        return {success: false, message: 'Something went wrong, please try again later'};
      } finally {
        if (!this.isLoaded.getProducts) {
          this._setIsLoaded('getProducts', true);
        }
      }
    }

    if (!this.isLoaded.getProducts) {
      this._setIsLoaded('getProducts', true);
    }
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
