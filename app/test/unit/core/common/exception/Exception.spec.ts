import { Code } from '@/core/common/code/Code';
import { Exception } from '@/core/common/exception/Exception';

describe('Exception', () => {
  describe('new', () => {
    test('Quando os dados de entrada e argumentos overrideMessage estão vazios,\n\tespera-se que ele crie uma instância de Exception com parâmetros padrão', () => {
      const exception: Exception<void> = Exception.new({
        code: Code.BAD_REQUEST_ERROR,
      });

      expect(exception.code).toBe(Code.BAD_REQUEST_ERROR.code);
      expect(exception.message).toBe(Code.BAD_REQUEST_ERROR.message);
      expect(exception.data).toBeUndefined();
    });

    test('Quando dados de entrada e argumentos overrideMessage são definidos,\n\tespera-se que ele crie uma instância Exception com parâmetros personalizados', () => {
      const customMessage = 'Erro interno personalizado.';
      const customData: Record<string, unknown> = {
        result: 'Erro interno personalizado.',
      };

      const exception: Exception<Record<string, unknown>> = Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        message: customMessage,
        data: customData,
      });

      expect(exception.code).toBe(Code.BAD_REQUEST_ERROR.code);
      expect(exception.message).toBe(customMessage);
      expect(exception.data).toEqual(customData);
    });
  });
});
