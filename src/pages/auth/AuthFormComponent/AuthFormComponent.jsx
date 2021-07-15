import { Input, Button, PasswordInput } from '../../../components';
import { useState } from 'react';
import styles from './AuthFormComponent.module.scss';

export const AuthFormComponent = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form 
      className={styles['form']}
      onSubmit={props.onSubmitForm}
    >
      <div className={styles['form-header']}>
        <h1 className={styles['form-header-title']}>
          {props.title}
        </h1>
        <h2 className={styles['form-header-subtitle']}>
          {props.subtitle}
        </h2>
      </div>
      <div className={styles['form-body']}>
        <div className={styles['form-body-username']}>
          <Input 
            value={props.usernameValue}
            type='username'
            placeholder='Enter your username'
            hasErrors={true}
            error={props.usernameError}
            onChange={props.onChangeUsername}
            onBlur={props.onBlurUsername}
            disabled={props.formDisabled}
          />
        </div>
        <div className={styles['form-body-password']}>
          <PasswordInput
            value={props.passwordValue}
            placeholder='Enter your password'
            hasErrors={true}
            error={props.passwordError}
            showPassword={showPassword}
            onClickShowPassword={() => {
              setShowPassword(prevShow => !prevShow);
            }}
            onChange={props.onChangePassword}
            onBlur={props.onBlurPassword}
            disabled={props.formDisabled}
          />
        </div>
        {props.buttons?.first && (
          <div className={styles['form-body-button']}>
            <Button
              {...props.buttons?.first}
              disabled={props.formDisabled}
            />
          </div>
        )}
        {props.buttons?.second && (
          <div className={styles['form-body-button']}>
            <Button
              {...props.buttons?.second}
              disabled={props.formDisabled}
            />
          </div>
        )}
      </div>
      <div className={styles['form-error']}>
        <span>{props.formError}</span>
      </div>
    </form>
  )
};
