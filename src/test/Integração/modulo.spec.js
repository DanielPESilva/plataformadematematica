import request from "supertest";
import { describe, expect, it} from '@jest/globals';
import app from '../../app.js'
import path from "path";
import fs from "fs";
import faker from 'faker-br';
let token = null
let modulo_id = null

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
         const res = await request(app)
             .get(`/modulo`)
             .set("Authorization", `Bearer ${token}`)
             .set("Content-Type", "application/json")

         expect(res.status).toBe(200);
         expect(res.body.message).toBe("Requisição bem sucedida.")
         expect(res.body.error).toBe(false) 
     });

     it('Deve retornar erro quando não encontrar nem um modulo.', async () => {
         const res = await request(app)
             .get(`/modulo`)
             .set("Authorization", `Bearer ${token}`)
             .set("Content-Type", "application/json")
             .query({
                turma_id:100000,
            })

         expect(res.statusCode).toBe(404);
         expect(res.body.message).toBe("O recurso solicitado não foi encontrado no servidor.")
         expect(res.body.error).toBe(true) 
     });

     it('Deve retornar erro um parametro envido for do tipo errado.', async () => {
        const res = await request(app)
            .get(`/modulo`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .query({
                turma_id:"string",
            })

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe("Requisição com sintaxe incorreta ou outros problemas.",)
            expect(res.body.error).toBe(true) 
    });
 })

 describe("Listar modulo por id", () => {

    it('Deve listar a modulo conforme parametros passados', async () => {
        const res = await request(app)
            .get(`/modulo/1`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Requisição bem sucedida.")
        expect(res.body.error).toEqual(false)
    });

    it('Deve retornar erro ao tentar listar modulo com id invalido', async () => {
        const res = await request(app)
            .get(`/modulo/11111111111`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")

            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe("O recurso solicitado não foi encontrado no servidor.")
            expect(res.body.error).toBe(true) 
    });

    it('Deve retornar erro ao tentar listar modulo com id invalido', async () => {
       const res = await request(app)
           .get(`/modulo/string`)
           .set("Authorization", `Bearer ${token}`)
           .set("Content-Type", "application/json")

           expect(res.statusCode).toBe(400);
           expect(res.body.message).toBe("Requisição com sintaxe incorreta ou outros problemas.",)
           expect(res.body.error).toBe(true) 
   });
})

 describe('POST modulo - Criando modulos.', () => {
    const filePath = path.resolve(process.cwd(), './src/test/arquivos/image.png');

    it('1-Cria um novo modulo e envia a imagem do modulo.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .post('/modulo')
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .field('turma_id', 1)
                .field('titulo', faker.commerce.productName())
                .field('descricao', faker.commerce.productMaterial())
                .attach('imagem', filePath)
        modulo_id = res.body.data.id
        
        expect(res.body.error).toEqual(false)
        expect(res.status).toBe(201)
        expect(res.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
        expect(res.body.data).toBeInstanceOf(Object)
        expect(res.body.data.id).toBeDefined()
    })
 })

describe('PATCH /modulo/:id - Atualizar uma modulo.', () => {
    const filePath = path.resolve(process.cwd(), './src/test/arquivos/image.png');
    const filePathTypeErrado = path.resolve(process.cwd(), './src/test/arquivos/pdf.pdf');

    it('1- modulo deve ser atualizada e deverá retornar uma respota positiva.', async () => {

        const res = await request(app)
            .patch('/modulo/'+modulo_id)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .field('turma_id', 1)
            .field('titulo', faker.commerce.productName())
            .field('descricao', faker.commerce.productMaterial())
            .attach('imagem', filePath)

        expect(res.status).toBe(200);
        expect(res.body.error).toBe(false);
        expect(res.body.message).toBe("Requisição bem sucedida.");
    });
    it('2- Deve retornar erro 404 quando não encontrar uma modulo', async () => {

        const res = await request(app)
            .patch('/modulo/9999')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .field('turma_id', 1)
            .field('titulo', faker.commerce.productName())
            .field('descricao', faker.commerce.productMaterial())
            .attach('imagem', filePath)
        console.log(res.body)

        expect(res.status).toBe(404);
        expect(res.body.code).toBe(404);
        expect(res.body.message).toBe("O recurso solicitado não foi encontrado no servidor.");
    });
    
    it('3- Deve retornar erro 400 quando houver um bad request', async () => {

        const res = await request(app)
            .patch('/modulo/'+modulo_id)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .field('turma_id', "string")
            .field('titulo', faker.commerce.productName())
            .field('descricao', faker.commerce.productMaterial())
            .attach('imagem', filePath)

        expect(res.body.error).toBe(true);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Requisição com sintaxe incorreta ou outros problemas.");
    });

    it('2-Gera erro quando o arquivo enviado não for uma imagem.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .patch('/modulo/'+modulo_id)
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .field('turma_id', 1)
                .field('titulo', faker.commerce.productName())
                .field('descricao', faker.commerce.productMaterial())
                .attach('imagem', filePathTypeErrado)
        
            expect(res.body.error).toEqual(true)
            expect(res.status).toBe(400)
            expect(res.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

    it('3-Gera erro quando o turma_id não existir.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .patch('/modulo/'+modulo_id)
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .field('turma_id', 1000000)
                .field('titulo', faker.commerce.productName())
                .field('descricao', faker.commerce.productMaterial())
                .attach('imagem', filePath)
        
        expect(res.body.error).toEqual(true)
        expect(res.status).toBe(404)
        expect(res.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })
});

describe('DELETE modulo/:id - Dele um modulo através do id del.', () => {
    it('1- Deve deletar um modulo utilizando o ID.', async () => {

        const res = await request(app)
            .delete("/modulo/"+modulo_id)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)

        expect(res.status).toBe(200);
        expect(res.body.code).toBe(200);
        expect(res.body.error).toBe(false);
        expect(res.body).toHaveProperty('data');
        expect(res.body.message).toBe("Requisição bem sucedida.");
    });
    it('2- Deve retornar erro 404 quando não encontrar umamodulo', async () => {

        const res = await request(app)
            .delete('/modulo/999')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)

        expect(res.status).toBe(404);
        expect(res.body.code).toBe(404);
        expect(res.body.message).toBe("O recurso solicitado não foi encontrado no servidor.");
    });
    
    it('3- Deve retornar erro 400 quando houver um bad request', async () => {
        const res = await request(app)
            .delete('/modulo/ASduasidg')
        expect(res.body.error).toBe(true);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Requisição com sintaxe incorreta ou outros problemas.");
    });
});
   