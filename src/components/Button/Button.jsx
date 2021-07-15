import styles from './Button.module.scss';

export const BUTTON_TYPES = {
  ACCENT: 'accent',
  GHOST: 'ghost',
};

export const Button = ({
  type,
  className = '',
  buttonType = BUTTON_TYPES.ACCENT,
  onClick,
  preventDefault = false,
  children,
  label = '',
  disabled,
}) => {
  return (
    <button 
      type={type}
      value=''
      className={`${styles['button']} ${className} ${styles[buttonType]}`}
      disabled={disabled}
      onClick={(event) => {
        if (preventDefault) {
          event.preventDefault();
        }

        if (typeof onClick === 'function') {
          onClick(event);
        };
      }}
    >
      <span>{children || label}</span>
    </button>
  );
};
