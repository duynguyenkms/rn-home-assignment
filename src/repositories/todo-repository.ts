import { Todo } from '@/entities';
import { TodoData } from '@/models';
import { storageService } from '@/services';
import { safeCast } from '@/utils';

const TODO_STORAGE_KEY = 'TODO';

class TodoRepository {
  getAll(): Todo[] {
    const json = storageService.getJson(TODO_STORAGE_KEY);
    if (!json) {
      return [];
    }

    const todoData = safeCast<TodoData>(json);

    return todoData?.todos ?? [];
  }

  add(todo: Todo) {
    const todos = this.getAll();

    todos.push(todo);

    storageService.setJson(TODO_STORAGE_KEY, { todos });
  }

  removeById(todoId: string) {
    const todos = this.getAll().filter(item => item.id !== todoId);

    storageService.setJson(TODO_STORAGE_KEY, { todos });
  }

  update(todo: Todo) {
    const todos = this.getAll();

    const existingTodoIndex = todos.findIndex(item => item.id === todo.id);

    if (existingTodoIndex === -1) {
      return;
    }

    todos[existingTodoIndex] = todo;

    storageService.setJson(TODO_STORAGE_KEY, { todos });
  }
}

export const todoRepository = new TodoRepository();
