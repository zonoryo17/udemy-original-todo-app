import styles from './index.module.css';
import type { Todo } from '@/types/todo';
import { StatusSelectMenu } from '../StatusSelectMenu';

type Props = {
  item: Todo;
  onClickEditCancel: (id: string) => void;
};

export const EditingTodoItem: React.FC<Props> = ({ item }) => {
  return (
    <div className={styles.listRow}>
      <div className={styles.listLeftItem}>
        <div className={styles.editBlock}>
          <p className={styles.title}>Status</p>
          <StatusSelectMenu />
        </div>
        <div className={styles.editBlock}>
          <p className={styles.title}>Text</p>
          <input
            type="text"
            defaultValue={item.text}
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
};
