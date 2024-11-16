
const usuarioRoutes = {
    "/usuario": {
        get:{
            tags:["Usuários"],
            summary:"Lista todos os usuarios",
            security: [{ bearerAuth: [] }],
            parameters:[
                {
                    name:"nome",
                    in:"query",
                    description:"Nome do usuário.",
                    schema:{
                        type:"string"
                    }
                },
                {
                    name:"matricula",
                    in:"query",
                    description:"Matrícula do usuário.",
                    schema:{
                        type:"string"
                    }
                },
                {
                    name:"active",
                    in:"query",
                    description:"Status do usuário.",
                    schema:{
                        type:"boolean"
                    }
                }
            ],
            responses:{
                "200": {
                    description:"Requisição bem-sucedida.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/get_usuario"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400usuario"
                    }                
                },
                "500": {
                    description: "Ocorreu um erro interno no servidor.",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }
                },
            }
        },
        post:{
           tags:["Usuários"],
           summary:"Cria um novo usuário",
           security:[{ bearerAuth: [] }],
           requestBody:{
            content:{
                "aplication/json":{
                    schema:{
                        $ref: "#/components/schemas/createUsuarioBody"
                    }
                }
            },
            required:true
           },
           responses:{
            "201":{
                description: "Requisição bem-sucedida.",
                content:{
                    "application/json":{
                        schema:{
                            $ref:"#/components/schemas/createUsuarioRes"
                        }
                    }
                }
            },
            "400":{
                description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400usuario"
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
    },
    "/usuario/{id}": {
        get: {
            tags: ["Usuários"],
            summary: "Lista todos os usuario",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "id do usuário",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Requisição bem-sucedida.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/get_usuario_id"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400usuario"
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
   patch:{
    tags:["Usuários"],
    summary:"Atualiza um usuário",
    security:[{ bearerAuth: [] }],
    parameters:[
        {
            name:"id",
            in:"path",
            description:"id do usuário",
            required:true,
            schema:{
                type:"integer"
            }
        }
    ],
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    $ref: "#/components/schemas/updateUsuarioBody"
                }
            }
        },
        required:true
    },
    responses:{
        "200":{
            description: "Requisição bem-sucedida.",
            content:{
                "application/json":{
                    schema:{
                        $ref:"#/components/schemas/updateUsuarioRes"
                    }
                }
            }
        },
        "400":{
            description: "Houve um erro em algum parâmetro do corpo da requisição.",
                content: {
                    $ref: "#/components/schemas/erro400usuario"
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
   }
}

export default usuarioRoutes;
