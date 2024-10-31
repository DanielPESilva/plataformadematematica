const aulaRoutes = {
    "/aula": {
        post: {
            tags: ["Aula"],
            summary: "Cria uma aula e salva seus arquivos pdf na api.",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                pdf_questoes: {
                                    type: "string",
                                    format: "binary",
                                    description: "Arquivo pdf com as questoes."
                                },
                                pdf_resolucao: {
                                    type: "string",
                                    format: "binary",
                                    description: "Arquivo pdf com as respostas."
                                },
                                modulo_id: {
                                    type: "integer",
                                    description: "ID do modulo associado a aula."
                                },
                                titulo: {
                                    type: "string",
                                    description: "titulo do aula a ser criado."
                                },
                                video: {
                                    type: "string",
                                    description: "link do video da aula."
                                },
                                descricao: {
                                    type: "string",
                                    description: "descrição do aula a ser criado."
                                }
                            },
                            required: ["modulo_id", "titulo", "video", "descricao"]
                        }
                    }
                },
                required: true
            },
            responses: {
                "201": {
                    description: "Aula criada com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/createAulaRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400aula"
                    }                
                },
                "404": {
                    description: "modulo não existe.",
                    content: {
                        $ref: "#/components/schemas/erro404aula"
                    }                
                },
                "500": {
                    description: "Servidor encontrou um erro interno.",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }                
                },
            }
        }
    },"/aula/arquivo/{fileName}": {
        get: {
            tags: ["Aula"],
            summary: "busca arquivos pdf na api.",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    required: true,
                    name: "fileName",
                    in: "path",
                    description: "Nome do arquivo que deseja baixar.",
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Arquivo enviado com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/getPDF"
                            }
                        }
                    }
                },
                "404": {
                    description: "Arquivo não foi encontrado.",
                    content: {
                        $ref: "#/components/schemas/erro404aula"
                    }                
                },
                "500": {
                    description: "Servidor encontrou um erro interno.",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }                
                },
            }
        }
    }
};

export default aulaRoutes