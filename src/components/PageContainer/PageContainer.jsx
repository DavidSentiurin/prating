import styles from './PageContainer.module.scss';

export const PageContainer = ({ pageTitle = 'PRating', title, className = '', children }) => {
  return (
    <section className={`${styles['container']} ${className}`}>
      <div className={styles['container-content']}>
        {title && (<div className={styles['container-content-title']}>
          <h1>{title}</h1>
        </div>)}
        
        {children}
      </div>
    </section>
  )
}
