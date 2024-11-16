import turmaSchema from "../schemas/turmaSchema.js";
import authSchemas from "../schemas/authSchema.js";
import commonResponses from "../schemas/commonResponses.js";

const turmasRoutes = {
    "/turma": {
        get: {
            tags: ["Turmas"],
            summary: "Lista todas as turmas",
            security: [{ bearerAuth: [] }],
            parameters:[
                {
                    name:"nome",
                    in:"query",
                    description:"Nome da turma.",
                    schema:{
                        type:"string"
                    }
                }
                
            ],
            responses: {
                200: commonResponses[200]("#/components/schemas/TurmaListagem"),
                400: commonResponses[400](),
                401: commonResponses[401](),
                500: commonResponses[500]()
            }
        }
    },


    "/turma/{id}": {
        get: {
            tags: ["Turmas"],
            summary: "Obtém detalhes de uma turma",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                200: commonResponses[200]("#/components/schemas/TurmaDetalhes"),
                400: commonResponses[400](),
                401: commonResponses[401](),
                404: commonResponses[404](),
                500: commonResponses[500]()
            }
        },
        patch: {
            tags: ["Turmas"],
            summary: "Atualiza uma turma",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/TurmaDetalhes"
                        }
                    }
                }
            },
            responses: {
                200: commonResponses[200]("#/components/schemas/TurmaDetalhes"),
                400: commonResponses[400](),
                401: commonResponses[401](),
                404: commonResponses[404](),
                500: commonResponses[500]()
            }
        },
        
        
    },
};

export default turmasRoutes;
