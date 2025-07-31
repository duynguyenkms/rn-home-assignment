import { todoRepository } from '@/repositories/todo-repository';
import { Todo } from '@/entities';

jest.mock('@/services', () => ({
  storageService: {
    getJson: jest.fn(),
    setJson: jest.fn(),
  },
}));

jest.mock('@/utils', () => ({
  safeCast: jest.fn(),
}));

import { storageService } from '@/services';
import { safeCast } from '@/utils';

describe('todoRepository', () => {
  const mockTodos: Todo[] = [
    { id: '1', title: 'Test 1', description: '' },
    { id: '2', title: 'Test 2', description: '' },
  ];

  const mockGetJson = storageService.getJson as jest.Mock;
  const mockSetJson = storageService.setJson as jest.Mock;
  const mockSafeCast = safeCast as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAll should return todos from storage', () => {
    mockGetJson.mockReturnValue({ todos: mockTodos });
    mockSafeCast.mockReturnValue({ todos: mockTodos });

    const result = todoRepository.getAll();

    expect(result).toEqual(mockTodos);
  });

  it('getAll should return empty array if no data', () => {
    mockGetJson.mockReturnValue(null);

    const result = todoRepository.getAll();

    expect(result).toEqual([]);
  });

  it('add should store new todo', () => {
    const newTodo: Todo = { id: '3', title: 'New Todo', description: '' };

    mockGetJson.mockReturnValue({ todos: mockTodos });
    mockSafeCast.mockReturnValue({ todos: [...mockTodos] });

    todoRepository.add(newTodo);

    expect(mockSetJson).toHaveBeenCalledWith('TODO', {
      todos: [...mockTodos, newTodo],
    });
  });

  it('removeById should remove a todo by id', () => {
    mockGetJson.mockReturnValue({ todos: mockTodos });
    mockSafeCast.mockReturnValue({ todos: mockTodos });

    todoRepository.removeById('1');

    expect(mockSetJson).toHaveBeenCalledWith('TODO', {
      todos: [mockTodos[1]],
    });
  });

  it('update should modify an existing todo', () => {
    const updatedTodo: Todo = {
      id: '1',
      title: 'Updated',
      description: 'Updated Desc',
    };

    mockGetJson.mockReturnValue({ todos: [...mockTodos] });
    mockSafeCast.mockReturnValue({ todos: [...mockTodos] });

    todoRepository.update(updatedTodo);

    expect(mockSetJson).toHaveBeenCalledWith('TODO', {
      todos: [updatedTodo, mockTodos[1]],
    });
  });

  it('update should do nothing if todo not found', () => {
    mockGetJson.mockReturnValue({ todos: [...mockTodos] });
    mockSafeCast.mockReturnValue({ todos: [...mockTodos] });

    const unknownTodo: Todo = { id: '99', title: '???', description: '' };

    todoRepository.update(unknownTodo);

    expect(mockSetJson).not.toHaveBeenCalled();
  });
});
