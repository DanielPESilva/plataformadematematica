import loginController from '../../controllers/loginController.js';
import {describe, expect} from '@jest/globals';

jest.mock('../../services/loginService.js', () => ({
  login: jest
    .fn()
    .mockRejectedValue(new Error("Erro interno do serviço")),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Controller login', () => {
    
    it("1-should return status 500 when campusService throws an error", async () => {
      const sendErrorMock = jest.fn();
      const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

      const req = { body: { matricula: "12345" , senha: "senhatest"} };

      await loginController.logar(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(sendErrorMock).toHaveBeenCalledWith(
        expect.objectContaining({
          code: 500,
          data: [],
          error: true,
          errors: [{ message: "Ocorreu um erro interno no servidor!" }],
          message: "Servidor encontrou um erro interno.",
        })
      );
    });
})