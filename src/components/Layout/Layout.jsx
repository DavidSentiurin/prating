import { useEffect } from 'react';
import { HeaderComponent } from './Header/Header';
import styles from './Layout.module.scss';

export const LayoutComponent = (props) => {
  const mainElement = (
    <main>
      {props.children}
    </main>
  );

  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const resizeHandler = () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // We listen to the resize event
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <div className={styles['layout']}>
      <HeaderComponent onClickSignOut={props.onClickSignOut} isAuthorized={props.isAuthorized}/>
      <div id={'main-wrapper'} style={{overflow: 'auto'}}>
        {mainElement}
      </div>
    </div>
  );
};
