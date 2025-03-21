import styles from './index.module.css';
import type { Todo, Status } from '@/types/todo';
import { StatusSelectMenu } from '../StatusSelectMenu';
import { useRef, useEffect, useState } from 'react';

type Props = {
  item: Todo;
  onClickEditCancel: (id: string) => void;
  onUpdateText?: (id: string, text: string) => void;
  onUpdateStatus?: (id: string, status: Status) => void;
};

export const EditingTodoItem: React.FC<Props> = ({
  item,
  onUpdateText,
  onUpdateStatus,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentStatus, setCurrentStatus] = useState<Status>(item.status);

  const handleStatusChange = (status: Status) => {
    setCurrentStatus(status);

    if (onUpdateStatus) {
      onUpdateStatus(item.id, status);
    }
  };

  const handleTextChange = () => {
    if (inputRef.current && onUpdateText) {
      const newText = inputRef.current.value;
      onUpdateText(item.id, newText);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = item.text;
    }

    setCurrentStatus(item.status);

    if (onUpdateStatus) {
      onUpdateStatus(item.id, item.status);
    }
    if (onUpdateText && inputRef.current) {
      onUpdateText(item.id, item.text);
    }
  }, [item, onUpdateStatus, onUpdateText]);

  return (
    <div className={styles.listRow}>
      <div className={styles.listLeftItem}>
        <div className={styles.editBlock}>
          <p className={styles.title}>Status</p>
          <StatusSelectMenu
            defaultValue={currentStatus}
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
            onChange={handleTextChange}
          />
        </div>
      </div>
    </div>
  );
};
