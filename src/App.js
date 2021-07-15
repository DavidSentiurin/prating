import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { 
  ProductsProvider
} from './providers';
import { 
  LayoutContainer,
  SignInContainer, 
  SignUpContainer, 
  HomeContainer,
  ProductContainer,
} from './containers';
import { PageNotFound } from './pages';
import { session, Products } from './data';
import { PATHS } from './constants';
import { PLATFORM_NAME, PAGE_TITLES } from './constants/pageTitles';
import { useEffect, useLayoutEffect } from 'react';

const products = new Products();

function App() {
  return (
    <Router>
      <ProductsProvider products={products}>
        <LayoutContainer isAuthorized={session.isAuthorized}>
          <Switch>
            <Route path={PATHS.SIGN_UP}>
              <PageWrapper
                title={PAGE_TITLES.SIGN_UP}
              >
                <SignUpContainer />
              </PageWrapper>
            </Route>
            <Route path={PATHS.SIGN_IN}>
              <PageWrapper
                title={PAGE_TITLES.SIGN_IN}
              >
                <SignInContainer />
              </PageWrapper>
            </Route>
            <Route path={PATHS.PRODUCT_CARD}>
              <PageWrapper
                title={PAGE_TITLES.PRODUCT_CARD}
              >
                <ProductContainer />
              </PageWrapper>
            </Route>
            <Route path={PATHS.PAGE_NOT_FOUND}>
              <PageWrapper
                title={PAGE_TITLES.PAGE_NOT_FOUND}
              >
                <PageNotFound />
              </PageWrapper>
            </Route>
            <Route exact path={PATHS.HOME}>
              <PageWrapper
                title={PAGE_TITLES.HOME}
              >
                <HomeContainer />
              </PageWrapper>
            </Route>
            <Redirect from='*' to={PATHS.PAGE_NOT_FOUND} />
          </Switch>
        </LayoutContainer>
      </ProductsProvider>
    </Router>
  );
};

const PageWrapper = ({
  title = PLATFORM_NAME, 
  children
}) => {
  const history = useHistory();

  // add title to page
  useEffect(() => {
    document.title = title;
  }, [title]);

  // move the page scroll up
  useLayoutEffect(() => {
    const mainWrapperElement = document.getElementById('main-wrapper');
    
    if (mainWrapperElement) {
      mainWrapperElement.scrollTo(0, 0)
    };

  }, [history.location.pathname]);

  return children;
}

export default App;
