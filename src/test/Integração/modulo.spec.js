import request from "supertest";
import { describe, expect, it} from '@jest/globals';
import app from '../../app.js'
let token = null

describe('Autenticação', () => {
    it("1-Deve chamar a rota de autenticação e pegar o token", async () => {
        const req = await request(app)
        .post('/login')
        .set("Accept", "aplication/json")
        .send({
            matricula:"12345",
            senha:"senhatest"
        })
        token = req.body.data.token
    })
});
 // ----------- listar modulo ---------
 describe("Listar modulo", () => {
     it('Deve listar a modulo conforme parametros passados', async () => {
         const response = await request(app)
             .get(`/modulo`)
            //  .set("Authorization", `Bearer ${token}`)
            //  .set("Content-Type", "application/json")
         const body = response.body;
         expect(response.status).toBe(201);
         expect(body.data).toBeInstanceOf(Array);
         expect(response.body.message).toBe("Requisição bem sucedida, recurso foi criado")
         expect(response.body.error).toBe(false) 
     });
     it('Deve retornar erro ao tentar listar modulo com id invalido', async () => {
         const response = await request(app)
             .get(`/modulo/10000000`)
            //  .set("Authorization", `Bearer ${token}`)
            //  .set("Content-Type", "application/json")
         expect(response.statusCode).toBe(404);
     });
 })
 // ----------- atualizar modulo ---------
 describe("Atualizar modulo", () => {
   
     it('deve retornar erro ao atualizar com id desconhecido', async () => {
         const response = await request(app)
             .patch(`/modulo/100000000`)
            //  .set("Authorization", `Bearer ${token}`)

         expect(response.status).toBe(500);
         expect(response.body.message).toBe("Servidor encontrou um erro interno.")
     });
 });
   