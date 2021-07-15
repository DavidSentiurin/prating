import styles from './Input.module.scss';

export const Input = ({
  type = 'text',
  value = '',
  placeholder = '',
  onBlur,
  onChange,
  className = '',
  maxLength,
  minLength,
  hasErrors = false,
  error = '',
  disabled,
  autoComplete,
  name,
}) => {
  return (
    <div className={styles['input-wrapper']}>
      <input 
        name={name}
        autoComplete={autoComplete}
        value={value}
        type={type}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        className={`${styles['input']} ${error ? styles['error'] : ''} ${className}`}
        maxLength={maxLength}
        minLength={minLength}
        disabled={disabled}
      />
      {hasErrors && (
        <div className={styles['input-error-message']}>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}