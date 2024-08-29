import usersSchemas from "../schemas/usersSchema.js";
import authSchemas from "../schemas/authSchema.js";
import commonResponses from "../schemas/commonResponses.js";

const usersRoutes = {
    "/users": {
        get: {
            tags: ["Usuários"],
            summary: "Lista todos os usuários",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "nome",
                    in: "query",
                    required: false,
                    schema: {
                        $ref: "#/components/schemas/UsuarioFiltro/properties/name"
                    },
                    description: "Nome do usuário"
                },
                {
                    name: "email",
                    in: "query",
                    required: false,
                    schema: {
                        $ref: "#/components/schemas/UsuarioFiltro/properties/email"
                    },
                    description: "Email do usuário"
                },
                {
                    name: "grupo",
                    in: "query",
                    required: false,
                    schema: {
                        $ref: "#/components/schemas/UsuarioFiltro/properties/grupo"
                    },
                    description: "Nome completo de um grupo que o usuário faça parte"
                }
            ],
            responses: {
                200: commonResponses[200]("#/components/schemas/UsuarioListagem"),
                400: commonResponses[400](),
                401: commonResponses[401](),
                500: commonResponses[500]()
            }
        },
        post: {
            tags: ["Usuários"],
            summary: "Cria um novo usuário",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UsuarioPost"
                        }
                    }
                }
            },
            responses: {
                201: commonResponses[201]("#/components/schemas/UsuarioDetalhes"),
                400: commonResponses[400](),
                401: commonResponses[401](),
                500: commonResponses[500]()
            }
        }
    },
};

export default usersRoutes;