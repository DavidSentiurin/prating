
import styles from './PasswordInput.module.scss';
import { Input } from '../../components';
import { ReactComponent as HidePasswordIcon } from '../../images/pages/auth/sing-in/eye.svg';
import { ReactComponent as ShowPasswordIcon } from '../../images/pages/auth/sing-in/view.svg';


export const PasswordInput = ({
  value = '',
  onChange,
  onBlur,
  className = '',
  showPassword,
  placeholder = 'Enter your password',
  hasErrors = false,
  error = '',
  onClickShowPassword,
  disabled,
  autoComplete,
}) => {
  return (
    <div className={styles['password']}>
      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles['password-field']} ${className}`}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        hasErrors={hasErrors}
        error={error}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      <div
        className={styles['password-show_state_icon']}
        onClick={onClickShowPassword}
      >
        {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
      </div>
    </div>
  );
};
