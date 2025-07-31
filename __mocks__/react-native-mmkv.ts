export class MMKV {
  private storage: Record<string, string> = {};

  constructor(_config?: { id?: string; encryptionKey?: string }) {}

  getString(key: string): string | undefined {
    return this.storage[key];
  }

  set(key: string, value: string) {
    this.storage[key] = value;
  }
}
