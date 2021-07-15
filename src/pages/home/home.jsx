import styles from './home.module.scss';
import { ErrorContent, PageContainer, ProductCard } from '../../components';
import { ReactComponent as LoadingIcon } from '../../images/loading.svg';

export const HomeComponent = (props) => {
  return (
    <PageContainer
      title='Products with rating'
    >
      {(props.errorMessage) ? (

        // Error content
        <div className={styles['home-error']}>
          <ErrorContent 
            message={props.errorMessage}
          />
        </div>


      ) : (props.contentLoading) ? (
        
        // Loading content
        <div className={styles['home-loading']}>
          <LoadingIcon />
        </div>

      ) : (
        
        // Render content
        <div className={styles['home-content']}>
          {props.products.map(({data}) => {
            return (
              <ProductCard 
                key={data.id}
                linkProps={{
                  to: `/product/${data.id}`
                }}
                image={{
                  src: data.img,
                  alt: `Product: ${data.title}`
                }}
                title={data.title}
                body={data.text}
              />
            );
          }, [])}
        </div>

      )}
    </PageContainer>
  );
};
