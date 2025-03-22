import styles from './index.module.css';
import type { Todo, Status } from '@/types/todo';
import { StatusSelectMenu } from '../StatusSelectMenu';
import { useRef } from 'react';

type Props = {
  item: Todo;
  onClickEditCancel: (id: string) => void;
  onTextChange?: (id: string, text: string) => void;
  onStatusChange?: (id: string, status: Status) => void;
};

export const EditingTodoItem: React.FC<Props> = ({
  item,
  onTextChange,
  onStatusChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStatusChange = (status: Status) => {
    if (onStatusChange) onStatusChange(item.id, status);
  };

  return (
    <div className={styles.listRow}>
      <div className={styles.listLeftItem}>
        <div className={styles.editBlock}>
          <p className={styles.title}>Status</p>
          <StatusSelectMenu
            defaultValue={item.status}
            onStatusChange={handleStatusChange}
          />
        </div>
        <div className={styles.editBlock}>
          <p className={styles.title}>Text</p>
          <input
            ref={inputRef}
            type="text"
            defaultValue={item.text}
            className={styles.input}
            onChange={(e) => onTextChange?.(item.id, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
