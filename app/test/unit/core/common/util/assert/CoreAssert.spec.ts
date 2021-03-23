import { CoreAssert } from '@/core/common/util/assert/CoreAssert';

describe('CoreAssert', () => {
  const AssertionError: Error = new Error('AssertionError');

  describe('isTrue', () => {
    test('Quando a expressão for TRUE, espera-se que ela não lance um erro', () => {
      expect(CoreAssert.isTrue(true, AssertionError)).toBeUndefined();
    });

    test('Quando a expressão é FALSE, espera-se que ela lance um erro', () => {
      expect.hasAssertions();

      try {
        CoreAssert.isTrue(false, AssertionError);
      } catch (e) {
        expect(e).toEqual(AssertionError);
      }
    });
  });

  describe('isFalse', () => {
    test('Quando a expressão é FALSE, espera-se que ela não lance um erro', () => {
      expect(CoreAssert.isFalse(false, AssertionError)).toBeUndefined();
    });

    test('Quando a expressão for TRUE, espera-se que ela lance um erro', () => {
      expect.hasAssertions();

      try {
        CoreAssert.isFalse(true, AssertionError);
      } catch (e) {
        expect(e).toEqual(AssertionError);
      }
    });
  });

  describe('notEmpty', () => {
    test('Quando a expressão não é <NULL|UNDEFINED>, espera-se que ele retorne uma expressão', () => {
      expect(
        CoreAssert.notEmpty({ test: 'valid-value' }, AssertionError),
      ).toEqual({ test: 'valid-value' });
    });

    test('Quando a expressão é NULL, espera-se que ela lance um erro', () => {
      expect.hasAssertions();

      try {
        CoreAssert.notEmpty(null, AssertionError);
      } catch (e) {
        expect(e).toEqual(AssertionError);
      }
    });

    test('Quando a expressão é UNDEFINED, espera-se que ela lance um erro', () => {
      expect.hasAssertions();

      try {
        CoreAssert.notEmpty(undefined, AssertionError);
      } catch (e) {
        expect(e).toEqual(AssertionError);
      }
    });
  });
});
