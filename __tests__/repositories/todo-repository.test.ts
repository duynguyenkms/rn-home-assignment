import { storageService } from '@/services';
import { Todo } from '@/entities';
import { todoRepository } from '@/repositories';

jest.mock('@/services', () => ({
  storageService: {
    getJson: jest.fn(),
    setJson: jest.fn(),
  },
}));

describe('TodoRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all todos if present', () => {
      const todos: Todo[] = [{ id: '1', title: 'Test', completed: false }];
      (storageService.getJson as jest.Mock).mockReturnValue({ todos });

      const result = todoRepository.getAll();
      expect(result).toEqual(todos);
    });

    it('should return empty array if no data', () => {
      (storageService.getJson as jest.Mock).mockReturnValue(undefined);

      const result = todoRepository.getAll();
      expect(result).toEqual([]);
    });

    it('should return empty array if invalid shape', () => {
      (storageService.getJson as jest.Mock).mockReturnValue(null);

      const result = todoRepository.getAll();
      expect(result).toEqual([]);
    });
  });

  describe('add', () => {
    it('should add a todo to storage', () => {
      const existingTodos: Todo[] = [];
      const newTodo: Todo = { id: '2', title: 'New Todo', completed: false };

      (storageService.getJson as jest.Mock).mockReturnValue({
        todos: existingTodos,
      });

      todoRepository.add(newTodo);

      expect(storageService.setJson).toHaveBeenCalledWith('TODO', {
        todos: [newTodo],
      });
    });
  });

  describe('removeById', () => {
    it('should remove the correct todo by id', () => {
      const todos: Todo[] = [
        { id: '1', title: 'A', completed: false },
        { id: '2', title: 'B', completed: false },
      ];
      (storageService.getJson as jest.Mock).mockReturnValue({ todos });

      todoRepository.removeById('1');

      expect(storageService.setJson).toHaveBeenCalledWith('TODO', {
        todos: [{ id: '2', title: 'B', completed: false }],
      });
    });
  });

  describe('update', () => {
    it('should update an existing todo', () => {
      const todos: Todo[] = [{ id: '1', title: 'Old', completed: false }];
      const updated: Todo = { id: '1', title: 'Updated', completed: true };

      (storageService.getJson as jest.Mock).mockReturnValue({ todos });

      todoRepository.update(updated);

      expect(storageService.setJson).toHaveBeenCalledWith('TODO', {
        todos: [updated],
      });
    });

    it('should not update if todo id does not exist', () => {
      const todos: Todo[] = [{ id: '1', title: 'Existing', completed: false }];
      const notFoundTodo: Todo = { id: '999', title: 'Ghost', completed: true };

      (storageService.getJson as jest.Mock).mockReturnValue({ todos });

      todoRepository.update(notFoundTodo);

      expect(storageService.setJson).not.toHaveBeenCalled();
    });
  });

  describe('updateList', () => {
    it('should update multiple todos in the list', () => {
      const todos: Todo[] = [
        { id: '1', title: 'A', completed: false },
        { id: '2', title: 'B', completed: false },
        { id: '3', title: 'C', completed: false },
      ];
      const map: Record<string, Todo> = {
        '2': { id: '2', title: 'B Updated', completed: true },
        '3': { id: '3', title: 'C Updated', completed: true },
      };

      (storageService.getJson as jest.Mock).mockReturnValue({ todos });

      todoRepository.updateList(map);

      expect(storageService.setJson).toHaveBeenCalledWith('TODO', {
        todos: [
          { id: '1', title: 'A', completed: false },
          { id: '2', title: 'B Updated', completed: true },
          { id: '3', title: 'C Updated', completed: true },
        ],
      });
    });

    it('should leave todos unchanged if not in the map', () => {
      const todos: Todo[] = [{ id: '1', title: 'A', completed: false }];
      (storageService.getJson as jest.Mock).mockReturnValue({ todos });

      todoRepository.updateList({});

      expect(storageService.setJson).toHaveBeenCalledWith('TODO', {
        todos,
      });
    });

    it('should handle empty storage gracefully', () => {
      (storageService.getJson as jest.Mock).mockReturnValue(undefined);

      todoRepository.updateList({
        '1': { id: '1', title: 'Should Not Crash', completed: true },
      });

      expect(storageService.setJson).toHaveBeenCalledWith('TODO', {
        todos: [],
      });
    });
  });
});
