import { create } from 'zustand';
import { Todo } from '@/entities';
import { todoRepository } from '@/repositories';

interface TodoStore {
  todos: Todo[];
  checkedTodoIds: string[];
  getTodos: () => void;
  addTodo: (todo: Todo) => void;
  removeTodo: (todoId: string) => void;
  updateTodo: (todo: Todo) => void;
  toggleCheckTodo: (todoId: string) => void;
  completeTodos: () => void;
  resetCheckedTodos: () => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  checkedTodoIds: [],
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
  toggleCheckTodo: todoId => {
    set(state => {
      let checkedTodoIds = [...state.checkedTodoIds];
      if (checkedTodoIds.includes(todoId)) {
        checkedTodoIds = checkedTodoIds.filter(id => todoId !== id);
      } else {
        checkedTodoIds.push(todoId);
      }

      return { checkedTodoIds };
    });
  },
  completeTodos: () => {
    let todos = [...get().todos];
    const checkedTodoIds = get().checkedTodoIds;

    const completedTodoMap: Record<string, Todo> = {};
    todos.forEach((todo, index) => {
      if (checkedTodoIds.includes(todo.id)) {
        const newTodo = { ...todo, completed: true };
        todos[index] = newTodo;
        completedTodoMap[todo.id] = newTodo;
      }
    });
    todoRepository.updateList(completedTodoMap);
    set({ todos, checkedTodoIds: [] });
  },
  resetCheckedTodos: () => {
    set({ checkedTodoIds: [] });
  },
}));
