export type Todo = {
  id: string;
  title: string;
  timeAdded: string;
  completed: boolean;
};

export type SaveModalProps = {
  isShown: boolean;
  handleClose: () => void;
  onAddTodo: (todo: Todo) => void;
  selectedTodo: Todo;
  onEditTodo: (todo: Todo) => void;
};

export type TodoItemProps = {
  todo: Todo;
  onDeleteTodo: (todoId: string) => void;
  onEditTodo: (todo: Todo) => void;
  onShowModal: (todo: Todo) => void;
};
