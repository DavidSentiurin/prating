import styles from './sign-up.module.scss';
import { AuthFormComponent } from '../AuthFormComponent/AuthFormComponent';
import { BUTTON_TYPES } from '../../../components';

export const SignUpComponent = (props) => {

  return (
    <section className={styles['container']}>
      <AuthFormComponent 
        {...props}
        title='Sign Up'
        subtitle={(
          <span>
            Welcome to 
            <span className={styles['logo-first-color-part']}> P</span>
            <span className={styles['logo-second-color-part']}>Rating</span>
            <span className={styles['logo-third-color-part']}>.</span>
          </span>
        )}
        buttons={{
          first: {
            label: 'Sign Up',
            type: 'submit',
            buttonType: BUTTON_TYPES.ACCENT,
          },
        }}
      />
    </section>
  )
};
