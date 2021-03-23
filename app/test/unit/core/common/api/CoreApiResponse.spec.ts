import { Code } from '@/core/common';
import { CoreApiResponse } from '@/core/common/api/CoreApiResponse';

describe('CoreApiResponse', () => {
  describe('success', () => {
    test('Quando os argumentos de entrada estão vazios,\n\tespera-se que ele crie uma resposta de sucesso com os parâmetros padrão', () => {
      const currentDate: number = Date.now();

      const response: CoreApiResponse<unknown> = CoreApiResponse.success();

      expect(response.statusCode).toBe(200);
      expect(response.message).toBe('OK');
      expect(response.timestamp).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(response.data).toBeNull();
    });

    test('Quando os argumentos de entrada são definidos,\n\tespere que ele crie uma resposta de sucesso com parâmetros personalizados', () => {
      const currentDate: number = Date.now();

      const customMessage = 'Deu certo!';
      const customData: Record<string, unknown> = { result: customMessage };

      const response: CoreApiResponse<unknown> = CoreApiResponse.success(
        customData,
        Code.SUCCESS.code,
        customMessage,
      );

      expect(response.statusCode).toBe(200);
      expect(response.message).toBe(customMessage);
      expect(response.timestamp).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(response.data).toEqual(customData);
    });
  });

  describe('error', () => {
    test('Quando os argumentos de entrada estão vazios,\n\tespera-se que ele crie uma resposta de erro com os parâmetros padrão', () => {
      const currentDate: number = Date.now();

      const response: CoreApiResponse<unknown> = CoreApiResponse.error();

      expect(response.statusCode).toBe(500);
      expect(response.message).toBe('Internal server error.');
      expect(response.timestamp).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(response.data).toBeNull();
    });

    test('Quando os argumentos de entrada são definidos,\n\tespera-se que ele crie uma resposta de erro com parâmetros personalizados', () => {
      const currentDate: number = Date.now();

      const customCode = 404;
      const customMessage = 'Resource not found.';
      const customData: Record<string, unknown> = { result: customMessage };

      const response: CoreApiResponse<unknown> = CoreApiResponse.error(
        customCode,
        customMessage,
        customData,
      );

      expect(response.statusCode).toBe(customCode);
      expect(response.message).toBe(customMessage);
      expect(response.timestamp).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(response.data).toEqual(customData);
    });
  });
});
