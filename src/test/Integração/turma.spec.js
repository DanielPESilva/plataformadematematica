import request from "supertest";
import { describe, expect, it } from '@jest/globals';
import app from '../../app.js'; // Importa a instância do aplicativo Express
import faker from 'faker-br';

let token = 'seu_token_de_autenticacao'; 

describe('GET /turma', () => {
    
    it('Deve retornar uma lista com todas as turmas', async () => {
        const req = await request(app)
            .get('/turma') 
            .set("Authorization", `Bearer ${token}`)
            .set("Accept", "application/json");
        
        expect(req.status).toBe(200); 
        expect(req.body.error).toBe(false); 
        expect(req.body.message).toEqual("Requisição bem sucedida."); 
        expect(req.body.data).toBeInstanceOf(Array); 
        if (req.body.data.length > 0) {
            expect(req.body.data[0].titulo).toBeDefined(); 
        }
    });

    it('Deve retornar um erro quando nenhuma turma for encontrada', async () => {
        
        const req = await request(app)
            .get('/turma')
            .set("Authorization", `Bearer ${token}`)
            .set("Accept", "application/json")
            .query({ titulo: 'Título Não Existente' }); 
        
        expect(req.status).toBe(400);
        expect(req.body.error).toBe(true); 
        expect(req.body.message).toEqual("Turmas não encontradas."); 
    });

});

describe('get turma por id', () => {

    it("1 deve retornar uma turma", async () =>{
        const req = await request(app)
        .get('/turma/1')
         .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.titulo).toBeDefined();
        expect(req.body.data.usuario_has_turma).toBeDefined();
    })
})

it("2-deve retornar um erro quando nem uma turma for encontrada.",async() =>{
    const req = await request(app)
      .get('/turma/999')
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "aplication/json")
      expect(req.body.error).toEqual(true)
      expect(req.status).toBe(404)
      expect(req.body.message).toEqual(
        "O recurso solicitado não foi encontrado no servidor."
      );

})

  it("3-deve retornar um erro quando o id passado não estiver no formato correto.", async () => {
        const req = await request(app)
        .get('/turma/n21')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(400)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")

    })
    
    describe ('create turma',() =>{
        it("deve retonar uma turma", async () =>{
        const req = await request(app)
          .post("/turma")
          .set("Authorization", `Bearer ${token}`)
          .set("Accept", "aplication/json")
          .send({
            titulo:faker.name.findByTitulo(),
          });   
                  expect(req.body.error).toEqual(false);
                  expect(req.status).toBe(200);
                  expect(req.body.data).toBeInstanceOf(Object)
                  expect(req.body.id).toBeInstanceOf(Object)
                  expect(req.body.data.titulo).toBeDefined()
        })

    })
        it("2-deve retornar um erro quando o campus já estiver em uso.", async () => {
          const req = await request(app)
            .post("/turma")
            .set("Authorization", `Bearer ${token}`)
            .set("Accept", "aplication/json")
            .send({
              id:'1',
              titulo:'1ª série A',
            });
          expect(req.body.error).toEqual(true);
          expect(req.status).toBe(404);
          expect(req.body.message).toEqual(
            "O recurso solicitado não foi encontrado no servidor."
          );
        });
        
        describe('patch turma',() => {
          it("deve atualizar os dados de uma turma",async () =>{
             const req = await request(app)
               .patch(`/campus/3`)
               .set("Authorization", `Bearer ${token}`)
               .set("Accept", "aplication/json")
               .send({
                 titulo: faker.address.streetName(),
               })
                       expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.data.nome).toBeDefined()
        expect(req.body.data.cidade).toBeDefined()
        expect(req.body.data.numero_residencial).toBeDefined()
          })
        })

            it("2-Deve retornar um erro caso a turma não exista.", async () => {
              const req = await request(app)
                .patch("/turma/999")
                .set("Authorization", `Bearer ${token}`)
                .set("Accept", "aplication/json")
                .send({
                  titulo: faker.titulo.findName(),
                });
              expect(req.body.error).toEqual(true);
              expect(req.status).toBe(404);
              expect(req.body.message).toEqual(
                "O recurso solicitado não foi encontrado no servidor." 
              );
            })

    it("3-deve retornar um erro quando os tipos dos dados não forem os corretos.(nome)", async () => {
      const req = await request(app)
        .patch("/campus/20909090")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
          titulo: null,
        });
      expect(req.body.error).toEqual(true);
      expect(req.status).toBe(400);
      expect(req.body.message).toEqual(
        "Requisição com sintaxe incorreta ou outros problemas."
      );
    });
