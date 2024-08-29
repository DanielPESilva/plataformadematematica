import turmaSchema from "../schemas/turmaSchema.js";
import authSchemas from "../schemas/authSchema.js";
import commonResponses from "../schemas/commonResponses.js";

const turmaRoutes = {
    "/turma": {
        get: {
            tags: ["Turmas"],
            summary: "Lista todas as turmas",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "Titulo",
                    in: "query",
                    required: false,
                    schema: {
                        $ref: "#/components/schemas/TurmaFiltro/properties/titulo"
                    },
                    description: "Nome da turma"
                },

                {
                    name: "Turma_id",
                    in: "query",
                    required: false,
                    schema: {
                        $ref: "#/components/schemas/TurmaFiltro/properties/Turma_id"
                    },
                    description: "ID o qual irá chamar o usuário pertencente a ele"
                }
            ],
            responses: {
                200: commonResponses[200]("#/components/schemas/TurmaListagem"),
                400: commonResponses[400](),
                401: commonResponses[401](),
                500: commonResponses[500]()
            }
        },
        post: {
            tags: ["Usuários"],
            summary: "Cria uma nova turma",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/TurmaPost"
                        }
                    }
                }
            },
            responses: {
                201: commonResponses[201]("#/components/schemas/TurmaDetalhes"),
                400: commonResponses[400](),
                401: commonResponses[401](),
                500: commonResponses[500]()
            }
        }
    },
    
};

export default usersRoutes;