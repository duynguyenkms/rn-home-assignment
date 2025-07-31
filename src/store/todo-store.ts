import { create } from 'zustand';
import { Todo } from '@/entities';
import { todoRepository } from '@/repositories';

interface TodoStore {
  todos: Todo[];
  getTodos: () => void;
  addTodo: (todo: Todo) => void;
  removeTodo: (todoId: string) => void;
  updateTodo: (todo: Todo) => void;
}

export const useTodoStore = create<TodoStore>(set => ({
  todos: [],
  getTodos: () => {
    const todos = todoRepository.getAll();
    set({ todos });
  },
  addTodo: todo => {
    todoRepository.add(todo);
    set(state => ({
      todos: [...state.todos, todo],
    }));
  },
  removeTodo: todoId => {
    todoRepository.removeById(todoId);

    set(state => {
      const todos = state.todos.filter(item => item.id !== todoId);
      return {
        todos,
      };
    });
  },
  updateTodo: todo => {
    todoRepository.update(todo);
    set(state => {
      const updatingTodoIndex = state.todos.findIndex(
        item => item.id === todo.id,
      );

      const newTodos = [...state.todos];

      newTodos[updatingTodoIndex] = todo;

      return {
        todos: newTodos,
      };
    });
  },
}));
