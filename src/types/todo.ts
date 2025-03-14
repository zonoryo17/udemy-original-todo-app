export type Status = 'todo' | 'inProgress' | 'done';

export type Todo = {
  id: string;
  text: string;
  status: Status;
  isEditing: boolean;
};
