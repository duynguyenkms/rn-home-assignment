export const safeCast = <T>(value: any) => {
  try {
    return value as T;
  } catch {
    return undefined;
  }
};
