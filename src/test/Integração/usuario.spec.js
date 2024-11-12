import request from "supertest";
import { describe, expect, it} from '@jest/globals';
import app from '../../app.js'
import path from "path";
import fs from "fs";
import faker from 'faker-br';
import exp from "constants";
import { array, object } from "zod";
import { console } from "inspector";

let token = null;
let usuarioCriado = null;

describe('Autenticação', () => {
    it("1-Deve chamar a rota de autenticação e pegar o token", async () => {
        const req = await request(app)
            .post('/login')
            .set("Accept", "application/json")
            .send({
                matricula: "12345",
                senha: "senhatest"
            });
        token = req.body.data.token;
    });
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
        expect(res.body.message).toBe("Requisição bem sucedida.");
        expect(res.body.data.length).toBeGreaterThan(0);
    });
});

describe('GET /usuario - Listar usuários por ID', () => {
    it("1-Deve retornar um usuário existente.", async () => {
        const res = await request(app)
            .get('/usuario/1') // Supondo que o ID 1 exista
            .set("Authorization", `Bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.body.error).toEqual(false);
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual("Requisição bem sucedida.");
        expect(res.body.data).toBeInstanceOf(Object);
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.nome).toBeDefined();
        expect(res.body.data.active).toBeDefined();
    });

    it("2-Deve retornar um erro quando nenhum usuário for encontrado.", async () => {
        const res = await request(app)
            .get('/usuario/89898981') // 
            .set("Authorization", `Bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.body.error).toEqual(true);
        expect(res.status).toBe(404);
        expect(res.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.");
    });


    it("3-Deve retornar um erro quando o ID passado não estiver no formato correto.", async () => {
        const res = await request(app)
            .get('/usuario/a') // ID inválido
            .set("Authorization", `Bearer ${token}`)
            .set("Accept", "application/json");
    
        expect(res.body.error).toEqual(true);
        expect(res.status).toBe(400); // Agora deve retornar 400
        expect(res.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.");
    });
});


it("1-deve retornar um usuario.", async () => {
    const req = await request(app)
      .post('/usuario')
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send({
        nome: "professor",
        matricula: Date.now().toString(),  // Gera uma matrícula única
        active: true,
        grupo_id: 2,
        senha: "senhaHash"  // Esta senha será processada antes de ser armazenada
      });
  
    console.log(req.body);
  
    expect(req.body.error).toEqual(false);
    expect(req.status).toBe(201);
    expect(req.body.message).toEqual("Requisição bem sucedida");
    expect(req.body.data).toBeInstanceOf(Object);
    expect(req.body.data.id).toBeDefined();
    expect(req.body.data.nome).toBeDefined();
    expect(req.body.data.matricula).toBeDefined();
    expect(req.body.data.grupo_id).toBeDefined();
    expect(req.body.data.senha).toBeDefined();

});

        it("2-Deve retornar um erro quando os dados não forem válidos.", async () => {
            const res = await request(app)
                .post('/usuario')
                .set("Authorization", `Bearer ${token}`)
                .set("Accept", "application/json")
                .send({
                    nome: true, 
                    grupo_id: 1,
                    senha: "testesenha",
                    matricula: "matriculaValida",
                    active: "true"
                });
        
            expect(res.body.error).toEqual(true);
            expect(res.status).toBe(400);
            expect(res.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.");
        });
    


//nao funciona
describe('PATCH /usuario - Atualizar usuário', () => {
    it("1-deve atualizar os dados de um usuário.", async () => {
      const req = await request(app)
        .patch(`/usuario/10`) // Corrigindo a URL para não usar `:`
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({
          nome: "professor",           // `nome` deve ser uma string
          matricula: "1731351564085",  // `matricula` deve ser uma string
          active: false,               // `active` deve ser um boolean
          grupo_id: 2                  // `grupo_id` deve ser um número
        });
      
      console.log(req.body);
  
      // Corrigindo as expectativas de status e mensagens
      expect(req.body.error).toEqual(false);
      expect(req.status).toBe(200); // Atualizando o status esperado para 200 (OK) ao invés de 201 (Created)
      expect(req.body.message).toEqual("Requisição bem sucedida, recurso foi atualizado");
      expect(req.body.data).toBeInstanceOf(Object);
      expect(req.body.data.id).toBeDefined();
      expect(req.body.data.nome).toBeDefined();
      expect(req.body.data.active).toBeDefined(); // Corrigindo `status` para `active`
      expect(req.body.data.grupo_id).toBeDefined(); // Corrigindo `funcao` para `grupo_id`
    });  
  
    it("deve retornar um erro caso o usuário não exista", async () => {
        const req = await request(app)
          .patch('/usuario/20909090')
          .set("Authorization", `Bearer ${token}`)
          .set("Accept", "application/json")
          .send({
            nome: "Nome Inexistente",
            matricula: "1234567891012",
            active: true,
            grupo_id: 2,
          });
      
        console.log(req.body);
      
        expect(req.body.error).toEqual(true);
        expect(req.status).toBe(404);
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.");
      });
      

    //funciona
    it("3-Deve retornar um erro quando os dados não forem válidos.", async () => {
        const res = await request(app)
            .patch(`/usuario/${usuarioCriado}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Accept", "application/json")
            .send({
                nome: 123, 
                grupo_id: 1,
                active: "true" 
            });
    
        expect(res.body.error).toEqual(true);
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.");
    });
    });


describe('DELETE /usuario - Deletar usuário', () => {
    it("1-Deve deletar um usuário.", async () => {
        const res = await request(app)
            .delete(`/usuario/${usuarioCriado}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.body.error).toEqual(false);
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual("Requisição bem sucedida, recurso foi deletado.");
    });

    it("2-Deve retornar um erro quando o usuário não existe.", async () => {
        const res = await request(app)
            .delete('/usuario/20909090') 
            .set("Authorization", `Bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.body.error).toEqual(true);
        expect(res.status).toBe(404);
        expect(res.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.");
    });
});
