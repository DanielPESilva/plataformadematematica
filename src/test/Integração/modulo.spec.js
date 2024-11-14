// import request from 'supertest';
// import express from 'express';
// import ModuloController from './../../controllers/moduloController.js';
// import moduloService from './../../services/moduloService';
// import { sendError, sendResponse } from '../../utils/messages';
// // import { ZodError } from 'zod';


// jest.mock('../../services/moduloService.js');
// jest.mock('../../utils/messages');

// const app = express();
// app.use(express.json());
// app.use('/modulos', (req, res) => {
//     const { method } = req;
//     if (method === 'GET' && req.params.id) {
//         return ModuloController.listarPorId(req, res);
//     } else if (method === 'GET') {
//         return ModuloController.listar(req, res);
//     } else if (method === 'POST') {
//         return ModuloController.inserir(req, res);
//     } else if (method === 'DELETE') {
//         return ModuloController.deletar(req, res);
//     } else if (method === 'PUT') {
//         return ModuloController.atualizar(req, res);
//     }
// });

// afterEach(() => {
//     jest.clearAllMocks();
// });

// describe('listar', () => {
//     it('should list modules', async () => {


//         const mockResponse = [{ id: 1, titulo: 'Modulo 1' }];
//         moduloService.listar.mockResolvedValue(mockResponse);

//         await request(app)
//             .get('/modulos')
//             .send({ turma_id: 1, titulo: 'Modulo 1', descricao: 'Descricao', image: 'image.png' })
//             .expect(201);

//         expect(moduloService.listar).toHaveBeenCalled();
//         expect(sendResponse).toHaveBeenCalledWith(expect.anything(), 201, { data: mockResponse });
//     });
// }, 10000);



// describe('listarPorId', () => {
//     it('should list module by id', async () => {

//         const mockResponse = { id: 1, titulo: 'Modulo 1' };
//         moduloService.listarPorId.mockResolvedValue(mockResponse);

//         await request(app)
//             .get('/modulos/1')
//             .expect(201);

//         expect(moduloService.listarPorId).toHaveBeenCalledWith(1);
//         expect(sendResponse).toHaveBeenCalledWith(expect.anything(), 201, { data: mockResponse });
//     }, 10000);
// });

// it('should handle errors', async () => {
//     const error = new Error('Internal Server Error');
//     moduloService.listarPorId.mockRejectedValue(error);

//     await request(app)
//         .get('/modulos/1')
//         .expect(500);

//     expect(sendError).toHaveBeenCalledWith(expect.anything(), 500, 'Ocorreu um erro interno no servidor!');
// });


// describe('inserir', () => {
//     it('should insert a module', async () => {
//         const mockResponse = { id: 1, titulo: 'Modulo 1' };

//         moduloService.inserir.mockResolvedValue(mockResponse);

//         await request(app)
//             .post('/modulos')
//             .send({ turma_id: 1, titulo: 'Modulo 1', descricao: 'Descricao' })
//             .expect(201);

//         expect(moduloService.inserir).toHaveBeenCalled();
//         expect(sendResponse).toHaveBeenCalledWith(expect.anything(), 201, { data: mockResponse });
//     }, 10000);
// });

// it('should handle errors', async () => {
//     const error = new Error('Internal Server Error');
//     moduloService.inserir.mockRejectedValue(error);

//     await request(app)
//         .post('/modulos')
//         .send({ turma_id: 1, titulo: 'Modulo 1', descricao: 'Descricao' })
//         .expect(500);

//     expect(sendError).toHaveBeenCalledWith(expect.anything(), 500, 'Ocorreu um erro interno no servidor!');
// });


// describe('deletar', () => {
//     it('should delete a module', async () => {

//         const mockResponse = { id: 1, titulo: 'Modulo 1' };
//         moduloService.deletar.mockResolvedValue(mockResponse);

//         await request(app)
//             .delete('/modulos/1')
//             .expect(201);

//         expect(moduloService.deletar).toHaveBeenCalledWith(1);
//         expect(sendResponse).toHaveBeenCalledWith(expect.anything(), 201, { data: mockResponse });
//     }, 10000);
// });

// it('should handle errors', async () => {
//     const error = new Error('Internal Server Error');
//     moduloService.deletar.mockRejectedValue(error);

//     await request(app)
//         .delete('/modulos/1')
//         .expect(500);

//     expect(sendError).toHaveBeenCalledWith(expect.anything(), 500, 'Ocorreu um erro interno no servidor!');
// });


// describe('atualizar', () => {
//     it('should update a module', async () => {

//         const mockResponse = { id: 1, titulo: 'Modulo 1' };
//         moduloService.atualizar.mockResolvedValue(mockResponse);

//         await request(app)
//             .put('/modulos/1')
//             .send({ turma_id: 1, titulo: 'Modulo 1', descricao: 'Descricao', image: 'image.png' })
//             .expect(201);

//         expect(moduloService.atualizar).toHaveBeenCalledWith(1, expect.anything());
//         expect(sendResponse).toHaveBeenCalledWith(expect.anything(), 201, { data: mockResponse });
//     }, 10000);
// });

// it('should handle errors', async () => {
//     const error = new Error('Internal Server Error');
//     moduloService.atualizar.mockRejectedValue(error);

//     await request(app)
//         .put('/modulos/1')
//         .send({ turma_id: 1, titulo: 'Modulo 1', descricao: 'Descricao', image: 'image.png' })
//         .expect(500);

//     expect(sendError).toHaveBeenCalledWith(expect.anything(), 500, 'Ocorreu um erro interno no servidor!');
// });