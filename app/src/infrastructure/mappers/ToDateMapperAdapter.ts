export class ToDateMapperAdapter {
  static toDateMapper<T>(adapter: T, keys: string[]): Partial<T> {
    function toOptionalDate(date?: string | Date): Date | undefined {
      return date ? new Date(date) : undefined;
    }

    const adapterKeys: Partial<T> = {};

    keys.forEach(key => {
      Object.assign(adapterKeys, {
        [key]: toOptionalDate(adapter[key]),
      });
    });

    return adapterKeys;
  }
}
