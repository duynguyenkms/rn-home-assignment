import { storageService } from '@/services/storage-service';

jest.mock('react-native-mmkv');

describe('StorageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should store an object as JSON string', () => {
    const setSpy = jest.spyOn(storageService.mmkv, 'set');

    const data = { todos: [{ id: '1', title: 'Hello', description: '' }] };
    storageService.setJson('todos', data);

    expect(setSpy).toHaveBeenCalledWith('todos', JSON.stringify(data));
  });

  it('should return parsed object from getJson', () => {
    storageService.setJson('todos', { example: 123 });

    const result = storageService.getJson('todos');

    expect(result).toEqual({ example: 123 });
  });

  it('should return undefined for invalid JSON', () => {
    (storageService.mmkv as any).storage.todos = '{ message:';

    const result = storageService.getJson('todos');

    expect(result).toBeUndefined();
  });

  it('should return undefined if key does not exist', () => {
    const result = storageService.getJson('dumb');

    expect(result).toBeUndefined();
  });
});
