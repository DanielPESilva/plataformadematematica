const turmaSchema = {
    TurmaFiltro: {
        type: "object",
        properties: {
            titulo: {
                type: "string",
                description: "Titulo da Turma"
            },
            usuario_id: {
                type: "string",
                description: "Id do usuário para que, quando solicitado, possa aparecer o nome do mesmo"
            },
        }
    },
    TurmaListagem: {
        type: "object",
        properties: {
            id: { type: "integer", description: "ID da turma" },
            titulo: { type: "string", description: "Titulo da turma" },
        },
        example: {
            id: 1,
            titulo: "1º série C",
        }
    },
    TurmaDetalhes: {
        type: "object",
        properties: {
            id: { type: "integer", description: "ID da turma" },
            name: { type: "string", description: "Titulo da Turma" },
        },
        example: {
            id: 1,
            name: "1º série C",
        }
    },
    TurmaPost: {
        type: "object",
        required: ["titulo", "usuario_id"],  // Lista dos campos obrigatórios
        properties: {
            titulo: { type: "string", description: "Titulo de turma"},
            usuario_id: { type: "int", description: "ID do usuário" },
        },
        example: {
            titulo: "Turma_Teste",
            usuario_id: 1,
        }
    },
    TurmaPostResposta: {
        type: "object",
        properties: {
            titulo: { type: "string", description: "Titulo de turma"},
            usuario_id: { type: "string", description: "Endereço do usuário" },
        },
        example: {
            titulo: { type: "string", description: "Titulo de turma"},
            usuario_id: 2,
        }
    }
};

export default turmaSchema;
