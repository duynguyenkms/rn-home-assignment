/**
 * Handle saving local data in the app
 *
 * I used `react-native-mmkv` for fast local storage
 * because it was written in pure C++ with fully JSI support
 * It also supports data encryption to make data more secure
 */

import { MMKV } from 'react-native-mmkv';
import Keys from 'react-native-keys';

class StorageService {
  mmkv = new MMKV({
    // name of the storage file
    id: 'TODO_STORAGE',
    // `encryptionKey` allows us to encrypt saving data to make the app more secure
    encryptionKey: Keys.secureFor('STORAGE_ENCRYPTION_KEY'),
  });

  getJson(key: string) {
    try {
      const value = this.mmkv.getString(key);
      if (value) {
        return JSON.parse(value);
      }
      return undefined;
    } catch {
      return undefined;
    }
  }

  setJson(key: string, value: object) {
    this.mmkv.set(key, JSON.stringify(value));
  }
}

export const storageService = new StorageService();
