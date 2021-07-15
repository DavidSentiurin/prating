import styles from './sing-in.module.scss';
import { AuthFormComponent } from '../AuthFormComponent/AuthFormComponent';
import { BUTTON_TYPES } from '../../../components';

export const SignInComponent = (props) => {

  return (
    <section className={styles['container']}>
      <AuthFormComponent 
        {...props}
        title='Sign in'
        subtitle={(
          <span>
            Welcome back to 
            <span className={styles['logo-first-color-part']}> P</span>
            <span className={styles['logo-second-color-part']}>Rating</span>
            <span className={styles['logo-third-color-part']}>.</span>
          </span>
        )}
        buttons={{
          first: {
            label: 'Sign In',
            type: 'submit',
            buttonType: BUTTON_TYPES.ACCENT,
          },
          second: {
            label: 'Registration',
            buttonType: BUTTON_TYPES.GHOST,
            preventDefault: true,
            onClick: props.onClickRegistrationBtn
          },
        }}
      />
    </section>
  )
};
