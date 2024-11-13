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
        .set("Accept", "application/json")
        .send({
            matricula:"12345",
            senha:"senhatest"
        })
        token = req.body.data.token
    })
});


describe('POST /usuario/csv - Cria usuarios utizando arquivos csv.', () => {
    const filePath = path.resolve(process.cwd(), './src/test/arquivos/correto.csv');
    const filePathTypeErrado = path.resolve(process.cwd(), './src/test/arquivos/image.png');
    const filePathStrure = path.resolve(process.cwd(), './src/test/arquivos/formatoErrado.csv');


    it('1- Cria os novos usuarios.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .post('/usuario/csv')
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .attach('file-csv', filePath)
        console.log(res.body)
        console.log(res.body);
        expect(res.body.error).toEqual(false)
        expect(res.status).toBe(201)
        expect(res.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
    })

    it('2- Gera erro se a estrutura do csv estiver errada.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
            .post('/usuario/csv')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .attach('file-csv', filePathStrure)
        
            expect(res.body.error).toEqual(true)
            expect(res.status).toBe(404)
            expect(res.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it('3- Gera erro se o tipo do arquivo não for csv.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
            .post('/usuario/csv')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .attach('file-csv', filePathTypeErrado)
        
        expect(res.body.error).toEqual(true)
        expect(res.status).toBe(404)
        expect(res.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it('4- Gera erro se o csv não for enviado.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
            .post('/usuario/csv')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
        
        expect(res.body.error).toEqual(true)
        console.log(res.body)
        console.log(res.body)
        expect(res.status).toBe(400)
        expect(res.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

})

describe('PATCH /usuario/senha - Altera a senha do usuário.', () => {
    it("1-Deve retornar um status 201 quando o recurso for atualizado.", async () => {
        const res = await request(app)
        .patch('/usuario/senha/1')
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({
            senhaAntiga: "senhatest",
            senhaNova: "senhatest"
        })
        expect(res.body.error).toEqual(false)
        expect(res.status).toBe(201)
        expect(res.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
    })

    it("2-Deve retornar um erro 400 quando a senha não atender ao padrão.", async () => {
        const res = await request(app)
        .patch('/usuario/senha/4')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            senhaNova: "sen",
            senhaAntiga: "senhatest"
        })
        expect(res.body.error).toEqual(true)
        expect(res.status).toBe(400)
        expect(res.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

    it("3-Deve retornar um erro 404 quando o usuário não existir.", async () => {
        const res = await request(app)
        .patch('/usuario/senha/4456565')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            senhaAntiga:"senhatest",
            senhaNova:"senhatest"
        })
        console.log(res.body)
        expect(res.body.error).toEqual(true)
        expect(res.status).toBe(404)
        expect(res.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("4-Deve retornar um erro 403 quando a senha antiga não estiver correta.", async () => {
        const res = await request(app)
        .patch('/usuario/senha/4')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            senhaNova: "senhatest",
            senhaAntiga: "senhaincorreta"
        })
        console.log(res.body)
        expect(res.body.error).toEqual(true)
        expect(res.status).toBe(403)
        expect(res.body.message).toEqual("Sem permissão para atender a requisição.")
    })
})