const moduloRoutes = {
    "/modulo": {
        get: {
            tags: ["Modulo"],
            summary: "listar os modulos da api",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "turma_id",
                    in: "query",
                    description: "ID da turma.",
                    schema: {
                        type: "integer"
                    }
                },
                {
                    name: "titulo",
                    in: "query",
                    description: "titulo do modulo.",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "descricao",
                    in: "query",
                    description: "descricao do modulo.",
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Requisição bem sucedida, recurso foi criado",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/createcsvRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400csv"
                    }                
                },
                "404": {
                    description: "nem um modulo foi encontrado.",
                    content: {
                        $ref: "#/components/schemas/erro404csv"
                    }                
                },
                "500": {
                    description: "Ocorreu um erro interno no servidor!",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }                
                },
            }
        },
    
        post: {
            tags: ["Modulo"],
            summary: "Criar um modulo e salva sua imagem na api",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                imagem: {
                                    type: "string",
                                    format: "binary",
                                    description: "Banner do modulo."
                                },
                                turma_id: {
                                    type: "integer",
                                    description: "ID da turma associado ao modulo."
                                },
                                titulo: {
                                    type: "string",
                                    description: "titulo do modulo a ser criado."
                                },
                                descricao: {
                                    type: "string",
                                    description: "descrição do modulo a ser criado."
                                }
                            },
                            required: ["imagem", "turma_id", "titulo", "descricao"]
                        }
                    }
                },
                required: true
            },
            responses: {
                "201": {
                    description: "Modulo criado com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/createcsvRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400csv"
                    }                
                },
                "404": {
                    description: "turma não existe.",
                    content: {
                        $ref: "#/components/schemas/erro404csv"
                    }                
                },
                "500": {
                    description: "Servidor encontrou um erro interno.",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }                
                },
            }
        },
    },


        "/modulo/{id}": {
                get: {
                    tags: ["Modulo"],
                    summary: "Obter módulo por ID",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer"
                            },
                            description: "ID do módulo a ser buscado."
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Módulo encontrado.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/moduloRes"
                                    }
                                }
                            }
                        },
                        "404": {
                            description: "Módulo não encontrado.",
                            content: {
                                $ref: "#/components/schemas/erro404csv"
                            }
                        },
                        "500": {
                            description: "Erro interno do servidor.",
                            content: {
                                $ref: "#/components/schemas/erro500"
                            }
                        }
                    }
                },
            
        
                patch: {
                    tags: ["Modulo"],
                    summary: "Atualizar informações do módulo por ID",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer"
                            },
                            description: "ID do módulo a ser atualizado."
                        }
                    ],
                    requestBody: {
                        content: {
                            "multipart/form-data": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        imagem: {
                                            type: "string",
                                            format: "binary",
                                            description: "Banner atualizado do módulo."
                                        },
                                        turma_id: {
                                            type: "integer",
                                            description: "ID da turma associado ao módulo."
                                        },
                                        titulo: {
                                            type: "string",
                                            description: "Título atualizado do módulo."
                                        },
                                        descricao: {
                                            type: "string",
                                            description: "Descrição atualizada do módulo."
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Módulo atualizado com sucesso.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/moduloRes"
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Erro em algum parâmetro do corpo da requisição.",
                            content: {
                                $ref: "#/components/schemas/erro400csv"
                            }
                        },
                        "404": {
                            description: "Módulo não encontrado.",
                            content: {
                                $ref: "#/components/schemas/erro404csv"
                            }
                        },
                        "500": {
                            description: "Erro interno no servidor.",
                            content: {
                                $ref: "#/components/schemas/erro500"
                            }
                        }
                    }
                },
        
                delete: {
                    tags: ["Modulo"],
                    summary: "Excluir módulo por ID",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer"
                            },
                            description: "ID do módulo a ser excluído."
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Módulo excluído com sucesso.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/deleteRes"
                                    }
                                }
                            }
                        },
                        "404": {
                            description: "Módulo não encontrado.",
                            content: {
                                $ref: "#/components/schemas/erro404csv"
                            }
                        },
                        "500": {
                            description: "Erro interno no servidor.",
                            content: {
                                $ref: "#/components/schemas/erro500"
                            }
                        }
                    }
                }
            }
        }
        
        
        
export default moduloRoutes