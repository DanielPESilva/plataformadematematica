import request from "supertest";
import {describe, expect, it, test} from '@jest/globals';
import app from '../../app.js'
import faker from 'faker';


let token;
let turma_criada = null

describe('get turma', () => {
    it("1-Deve retornar uma lista com todas as turmas", async () =>{
        const req = await request(app)
        .get('/turma')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .query({
            titulo:'1ª série A',
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.");
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data[0].titulo).toBeDefined()
    })

    it("2-deve retornar um erro quando nenhuma turma for encontrada", async () => {
        const req = await request(app)
        .get('/turma')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .query({
            titulo:'1ª série A',
            usuario_has_turma:'1' 
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(404)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

  expect(req.status).toBe(400);

  expect(req.body.error).toEqual(true);
  expect(req.body.message).toEqual(
    "Requisição com sintaxe incorreta ou outros problemas."
  );
});

describe('get turma por id', () => {

    it("1 deve retornar uma turma", async () =>{
        const req = await request(app)
        .get('/turmas/1')
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
      .get('/campus/82893742397432')
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
        .get('/campus/n21')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(400)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")

    })
    
    describe ('create campus',() =>{
        it("deve retonar um campus", async () =>{
        const req = await request(app)
          .post("/campus")
          .set("Authorization", `Bearer ${token}`)
          .set("Accept", "aplication/json")
          .send({
            nome:faker.name.findName(),
            telefone: faker.phone.phoneNumber(),
            cidade:faker.address.city(), 
            bairro: faker.address.streetAddress(),
            rua: faker.address.streetName(),
            numero_residencial:234124
            
          });   
                  expect(req.body.error).toEqual(false);
                  expect(req.status).toBe(200);
                  expect(req.body.data).toBeInstanceOf(Object)
                  expect(req.body.data.nome).toBeDefined()
                  expect(req.body.data.telefone).toBeDefined()
                  expect(req.body.data.cidade).toBeDefined()
                  expect(req.body.data.bairro).toBeDefined()
                expect(req.body.data.rua).toBeDefined()
                expect(req.body.data.numero_residencial).toBeDefined()
        })

    })
        it("2-deve retornar um erro quando o campus já estiver em uso.", async () => {
          const req = await request(app)
            .post("/campus")
            .set("Authorization", `Bearer ${token}`)
            .set("Accept", "aplication/json")
            .send({
              nome:'campus vilhena',
              telefone:'98765-4321',
              cidade: "vilhena",
              bairro: "ifro",
              rua:'ifro',
              numero_residencial:7171,
            });
          expect(req.body.error).toEqual(true);
          expect(req.status).toBe(404);
          expect(req.body.message).toEqual(
            "O recurso solicitado não foi encontrado no servidor."
          );
        });

        it("2-deve retornar um erro quando o algum parametro tiver errado(numero_residencial)", async () => {
          const req = await request(app)
            .post("/campus")
            .set("Authorization", `Bearer ${token}`)
            .set("Accept", "aplication/json")
            .send({
              nome:'campus vilhena',
              telefone:'98765-4321',
              cidade: "vilhena",
              bairro: "ifro",
              rua:'ifro',
              numero_residencial:"n",
            });
          expect(req.body.error).toEqual(true);
          expect(req.status).toBe(400);
          expect(req.body.message).toEqual(
            "Requisição com sintaxe incorreta ou outros problemas."
          );
        });

        
        describe('patch campus',() => {
          it("deve atualizar os dados de um campus",async () =>{
             const req = await request(app)
               .patch(`/campus/3`)
               .set("Authorization", `Bearer ${token}`)
               .set("Accept", "aplication/json")
               .send({
                 nome: faker.address.streetName(),
                 telefone: faker.phone.phoneNumber(),
                 cidade: faker.address.city(),
                 rua: faker.address.streetName(),
                 bairro: faker.address.streetAddress(),
                 numero_residencial: 111
               })
                       expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.data.nome).toBeDefined()
        expect(req.body.data.cidade).toBeDefined()
        expect(req.body.data.numero_residencial).toBeDefined()
          })
        })

            it("2-deve retornar um erro caso o campus não exista.", async () => {
              const req = await request(app)
                .patch("/campus/209090900")
                .set("Authorization", `Bearer ${token}`)
                .set("Accept", "aplication/json")
                .send({
                  nome: faker.name.findName(),
                  telefone: faker.phone.phoneNumber(),
                  cidade: "vilhena",
                  numero_residencial: 1212,
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
          nome: null,
          cidade: "vilhena",
          numero_residencial: 1212,
        });
      expect(req.body.error).toEqual(true);
      expect(req.status).toBe(400);
      expect(req.body.message).toEqual(
        "Requisição com sintaxe incorreta ou outros problemas."
      );
    });
    
})
