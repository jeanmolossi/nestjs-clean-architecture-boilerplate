import { ObjectClean } from '@/core/common/util/object-clean/ObjectClean';

describe('ObjectClean', () => {
  describe('constructor', () => {
    test('Limpa chaves com valod UNDEFINED no payload', async () => {
      const fakePayloadToClean = {
        key1: 'valid-value',
        key2: undefined,
        key3: 'valid-value',
      };

      const objectClean = new ObjectClean(fakePayloadToClean);

      expect(objectClean).toEqual({
        data: {
          key1: 'valid-value',
          key3: 'valid-value',
        },
      });
    });

    test('Retorna objeto data de payload vazio quando não há nada no payload', async () => {
      const objectClean = new ObjectClean(undefined);

      expect(objectClean).toEqual({ data: {} });
    });
  });
});
