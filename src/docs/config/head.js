import authPaths from "../routes/auth.js";
import usersPaths from "../routes/users.js";
import authSchemas from "../schemas/authSchema.js";
import usersSchemas from "../schemas/usersSchema.js";

// Função para definir as URLs do servidor dependendo do ambiente
const getServersInCorrectOrder = () => {
    const devUrl = { url: process.env.SWAGGER_DEV_URL || "http://localhost:3060" };
    const prodUrl = { url: process.env.SWAGGER_PROD_URL || "http://localhost:3060" };

    if (process.env.NODE_ENV === "production") return [prodUrl, devUrl];
    else return [devUrl, prodUrl];
};

// Função para obter as opções do Swagger
const getSwaggerOptions = () => {
    return {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "API AUTH SGBD",
                version: "1.0-alpha",
                description: "API AUTH SGBD\n\nÉ necessário autenticar com token JWT antes de utilizar a maioria das rotas, faça isso na rota /login com um email e senha válido.",
                contact: {
                    name: "Gilberto Silva",
                    email: "gilberto.silva@ifro.edu.br",
                },
            },
            servers: getServersInCorrectOrder(),
            tags: [
                {
                    name: "Auth",
                    description: "Rotas para autenticação"
                },
                {
                    name: "Usuários",
                    description: "Rotas para gestão de usuários"
                },
            ],
            paths: {
                ...authPaths,
                ...usersPaths,
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT"
                    }
                },
                schemas: {
                    ...authSchemas,
                    ...usersSchemas
                }
            },
            security: [{
                bearerAuth: []
            }]
        },
        apis: ["./src/routes/*.js"]
    };
};

export default getSwaggerOptions;