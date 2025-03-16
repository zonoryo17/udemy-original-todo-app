import { memo } from 'react';
import styles from './index.module.css';

type Variant = 'primary' | 'secondary' | 'danger' | 'cancel' | 'icon';

type Props = {
  variant?: Variant;
} & React.ComponentProps<'button'>;

export const Button: React.FC<Props> = memo((props) => {
  const {
    type = 'button',
    variant = 'primary',
    children,
    disabled,
    onClick,
  } = props;

  return (
    <button
      type={type}
      data-variant={variant}
      className={styles.button}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
});
