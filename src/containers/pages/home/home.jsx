import { observer } from 'mobx-react';
import { HomeComponent } from '../../../pages';
import { useEffect, useContext, useState } from 'react';
import { ProductsContext } from '../../../providers';

export const HomeContainer = observer((props) => {
  const products = useContext(ProductsContext);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      if (!products.isLoaded.getProducts) {
        const { success, message } = await products.getProducts();

        if (!success && message) {
          setErrorMessage(message);
        }
      }
    })();
  }, [products]);

  return (
    <HomeComponent 
      errorMessage={errorMessage}
      products={products.listForRander}
      contentLoading={!products.isLoaded.getProducts}
    />
  );
});
