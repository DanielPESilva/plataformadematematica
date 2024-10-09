import express from "express";
import users from "./UsuarioRoutes.js";
import login from "./loginRoute.js";
import turma from "./TurmaRoutes.js";
import aula from "./AulaRoute.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import getSwaggerOptions from "../docs/config/head.js";
import logRoutes from "../middlewares/LogRoutesMiddleware.js";


const routes = (app) => {

    if (process.env.DEBUGLOG === "true") {
        app.use(logRoutes);
    }

    // Configurando a documentação da Swagger UI para ser servida diretamente em '/'
    const swaggerDocs = swaggerJsDoc(getSwaggerOptions());
    app.use(swaggerUI.serve);
    app.get("/", (req, res, next) => {
        swaggerUI.setup(swaggerDocs)(req, res, next);
    });

    app.use(express.json(),
        // rotas para autentição e autorização (permissão)
        login,
        turma,
        aula,
        users

    );

    // Se não é nenhuma rota válida, produz 404
    app.use((req, res, next) => {
        res.status(404).json({ message: "Rota não encontrada" });
    });
};

export default routes;
