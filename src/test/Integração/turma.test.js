import request from "supertest";
import { describe, expect, it} from '@jest/globals';
import app from '../../app.js'
import path from "path";
import fs from "fs";
import faker from 'faker-br';

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

describe('GET /turma - Listar todas as turmas.', () => {
    it('1- Deve retornar todas as turmas.', async () => {

        const res = await request(app)
            .get('/turma')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(201);
        expect(res.body.code).toBe(201);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.message).toBe("Requisição bem sucedida, recurso foi criado");
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('2- Deve retornar erro 400 quando houver um bad request', async () => {
        const res = await request(app)
            .get('/turma')
            .set("Authorization", `Bearer ${token}`)
            .set("Accept", "application/json")
            .send({
                nome: true
            });


        expect(res.body.error).toBe(true);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Requisição com sintaxe incorreta ou outros problemas.");
        expect(res.body.errors[0].message).toBe("O nome informado não é do tipo string.");
    });

    it('3- Deve retornar erro 404 quando houver retorno', async () => {
        const res = await request(app)
            .get('/turma')
            .set("Authorization", `Bearer ${token}`)
            .set("Accept", "application/json")
            .send({
                nome: "nome que não existe no banco"
            });
            console.log(res.body)


        expect(res.body.error).toBe(true);
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("O recurso solicitado não foi encontrado no servidor.");
    });


    describe('GET /turma/:id - Listar todas as turmas pelo ID.', () => {
        it('1- Deve retornar as turmas utilizando o ID.', async () => {
    
            const res = await request(app)
                .get('/turma/1')
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
    
            expect(res.status).toBe(201);
            expect(res.body.code).toBe(201);
            expect(res.body.error).toBe(false);
            expect(res.body).toHaveProperty('data');
            expect(res.body.message).toBe("Requisição bem sucedida, recurso foi criado");
        });

        it('2- Deve retornar erro 404 quando não encontrar uma turma', async () => {
    
            const res = await request(app)
                .get('/turma/9999')
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
    
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(404);
            expect(res.body.message).toBe("O recurso solicitado não foi encontrado no servidor.");
            expect(res.body.errors[0]).toBe("Nenhuma turma foi encontrada.");
        });
        
        it('3- Deve retornar erro 400 quando houver um bad request', async () => {
            const res = await request(app)
                .get('/turma/ASduasidg')
            expect(res.body.error).toBe(true);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Requisição com sintaxe incorreta ou outros problemas.");
            expect(res.body.errors[0].message).toBe("Id informado não é do tipo number.");
        });
 });


    describe('PATCH /turma/:id - Atualizar uma turma.', () => {
        it('1- turma deve ser atualizada e deverá retornar uma respota positiva.', async () => {
            const updatedData = {
                nome: faker.commerce.productName(), 
                id: 2
            }
            const res = await request(app)
                .patch('/turma/1')
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .send(updatedData)
    
            expect(res.status).toBe(201);
            expect(res.body.code).toBe(201);
            expect(res.body.error).toBe(false);
            expect(res.body).toHaveProperty('data');
            expect(res.body.message).toBe("Requisição bem sucedida, recurso foi criado");
        });
        it('2- Deve retornar erro 404 quando não encontrar uma turma', async () => {

            const updatedData = {
                nome: faker.commerce.productName(), 
                id: 2
            }
    
            const res = await request(app)
                .patch('/turma/999')
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .send(updatedData)
    
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(404);
            expect(res.body.message).toBe("O recurso solicitado não foi encontrado no servidor.");
        });
        
        it('3- Deve retornar erro 400 quando houver um bad request', async () => {
            const updatedData = {
                nome: faker.commerce.productName(), 
            }
            const res = await request(app)
                .patch('/turma/string')
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .send(updatedData)
            expect(res.body.error).toBe(true);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Requisição com sintaxe incorreta ou outros problemas.");
        });
    });
    
})