import type { Status } from '@/types/todo';
import styles from './index.module.css';

type Props = {
  status: Status;
};

const STATUS_LABEL = {
  todo: 'Todo',
  inProgress: 'InProgress',
  done: 'Done',
} as const;

export const StatusBudge: React.FC<Props> = ({ status }) => {
  return (
    <div className={styles.container} data-status={status}>
      {STATUS_LABEL[status]}
    </div>
  );
};
