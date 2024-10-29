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
            matricula:12345,
            senha:"senhatest"
        })
        token = req.body.data.token
    })
});


describe('POST /aula - Cria aulas e salva arquivos pdf.', () => {
    const filePath = path.resolve(process.cwd(), './src/test/arquivos/pdf.pdf');
    const filePathTypeErrado = path.resolve(process.cwd(), './src/test/arquivos/image.png');


    it('1- Cria uma nova aula, e salva os arquivos pdf.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .post('/aula')
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .field('modulo_id', 1)
                .field('titulo', faker.commerce.productName())
                .field('video', faker.internet.url())
                .field('descricao', faker.commerce.productMaterial())
                .attach('pdf_questoes', filePath)
                .attach('pdf_resolucao', filePath)
        
        expect(res.body.error).toEqual(false)
        expect(res.status).toBe(201)
        expect(res.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
        expect(res.body.data).toBeInstanceOf(Object)
        expect(res.body.data.id).toBeDefined()

    })

    it('2- Gera erro se o tipo do arquivo não for o correto.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
            .post('/aula')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .field('modulo_id', 1)
            .field('titulo', faker.commerce.productName())
            .field('video', faker.internet.url())
            .field('descricao', faker.commerce.productMaterial())
            .attach('pdf_questoes', filePath)
            .attach('pdf_resolucao', filePathTypeErrado)
        
            expect(res.body.error).toEqual(true)
            expect(res.status).toBe(400)
            expect(res.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

    it('3- Gera erro se o moduo_id não existir.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
            .post('/aula')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .field('modulo_id', 1222)
            .field('titulo', faker.commerce.productName())
            .field('video', faker.internet.url())
            .field('descricao', faker.commerce.productMaterial())
            .attach('pdf_questoes', filePath)
            .attach('pdf_resolucao', filePath)
        
        expect(res.body.error).toEqual(true)
        expect(res.status).toBe(404)
        expect(res.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")


    })
})

describe('GET /aula/arquivo/ - busca arquivos.', () => {
    const filePath = path.resolve(process.cwd(), './src/test/arquivos/pdf.pdf');
    const filePathTypeErrado = path.resolve(process.cwd(), './src/test/arquivos/image.png');


    it('1- Deve retornar o pdf informado na requisição.', async () => {

        const res = await request(app)
            .get('/aula/arquivo/teste.pdf')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('application/pdf');
        expect(Buffer.isBuffer(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);

    })

    it('2- Gera erro se o pdf não existir.', async () => {

        const res = await request(app)
            .get('/aula/arquivo/naoexiste.pdf')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
        
        expect(res.body.error).toEqual(true)
        expect(res.status).toBe(404)
        expect(res.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")


    })
})