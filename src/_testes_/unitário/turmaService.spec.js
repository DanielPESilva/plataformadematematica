import { describe, expect, it, test } from "@jest/globals";
import request from "supertest";
import app from "../../app.js";
import faker from 'faker-br';

describe("Estações", () => {
    let token;
    let idTurma;
    it("Deve listar as estacoes", async () => {
        const req = await request(app)
        .get("/turma")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
        console.log(req.body);
        expect(req.status).toBe(200);
        expect(req.body).toBeInstanceOf(Array);
        
    });
});
