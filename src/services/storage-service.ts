/**
 * Handle saving local data in the app
 *
 * I used `react-native-mmkv` for fast local storage
 * because it was written in pure C++ with fully JSI support
 * It also supports data encryption to make data more secure
 */

import { MMKV } from 'react-native-mmkv';

class StorageService {
  mmkv = new MMKV({
    // name of the storage file
    id: 'TODO_STORAGE',
    // `encryptionKey` allows us to encrypt saving data to make the app more secure
    encryptionKey: 'f05aa585f7a9470dbb602cfebb98eaa9',
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
