import request from "supertest";
import { describe, expect, it} from '@jest/globals';
import app from '../../app.js'
import path from "path";
import fs from "fs";
import faker from 'faker-br';
import exp from "constants";
import { array } from "zod";

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
describe('GET /usuario - Listar todos os usuários.', () => {
    it('1-Deve retornar todos os usuários', async () => {

        const res = await request(app)
            .get('/usuario')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.code).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.message).toBe("Requisição bem sucedida."); // Incluindo o ponto final
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("2-deve retornar um erro casa o usuário não exista.", async () => {
        const req = await request(app)
        .patch('/usuario/20909090')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            nome: faker.name.findName(),
            funcao:"auditor",
            status:true
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(404)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })
});

