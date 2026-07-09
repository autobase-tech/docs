import clsx from 'clsx';
import styles from './styles.module.css';

export function Step({children, title}) {
  return (
    <section className={styles.step}>
      <div className={styles.marker} aria-hidden="true" />
      <div className={styles.body}>
        {title && <h4 className={styles.title}>{title}</h4>}
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}

export default function Steps({children, className}) {
  return <div className={clsx(styles.steps, className)}>{children}</div>;
}
