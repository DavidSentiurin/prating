import React from 'react';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from '../../../images/logotype.svg';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../constants';

export const HeaderComponent = ({ isAuthorized, onClickSignOut }) => {
  return (
    <header className={styles['header-main']}>
      <div className={styles['header-main-logo']}>
        <Link to={PATHS.HOME}>
          <Logo className={styles['header-main-logo-img']}/>
        </Link>
      </div>
      <ul className={styles['header-main-link-list']}>
        {isAuthorized ? (
          <li className={styles['header-main-link-list-item']}>
            <button onClick={onClickSignOut}>Sign Out</button>
          </li>
        ) : (
          <React.Fragment>
            <li className={styles['header-main-link-list-item']}>
              <Link to={PATHS.SIGN_IN}>Sign In</Link>
            </li>
            <span className={styles['header-main-link-list-decoration-line']}/>
            <li className={styles['header-main-link-list-item']}>
              <Link to={PATHS.SIGN_UP}>Sign Up</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </header>
  );
};
