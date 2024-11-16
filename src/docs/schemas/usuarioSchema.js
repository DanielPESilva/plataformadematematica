
const usuarioSchema = {
    atualizarUsuarioRes:{
        
        type: "array",
        exemple:[

            {
                id:1,
                nome:"João",
                matricula:"123456",
                active:true,
                grupo_id:1
            }
        ] 
    },

    updateUsuarioBody:{
        type: "object",
        example:{
            id:1,
            nome:"João",
            matricula:"123456",
            active:true,
            grupo_id:1
        }
    },

    createUsuarioBody:{
        type: "object",
        example:{
            nome:"João",
            matricula:"123456",
            active:true,
            senha:"123456",
            grupo_id:1
        }
    },

    updateUsuarioRes:{
        type: "object",
        example:{
            error:false,
            code:200,
            message:"Requisição bem sucedida.",
            errors: [],
            data:{
                id:1,
                nome:"João",
                matricula:"123456",
                active:true,
                grupo_id:1
            }
        }
    },

    createUsuarioRes:{
        type: "object",
        example:{
            error:false,
            code:201,
            message:"Requisição bem sucedida.",
            errors: [],
            data:{
                id:1,
                nome:"João",
                matricula:"123456",
                active:true,
                grupo_id:1
            }
        }
    },

    get_usuario: {
        type: "object",
        example: {
            error: false,
            code: 200,
            message: "Requisição bem sucedida.",
            errors: [],
            data: [
                {
                    id:1,
                    nome:"João",
                    matricula:"123456",
                    active:true,
                    grupo_id:1
                },
                {
                    id:2,
                    nome:"Maria",
                    matricula:"123457",
                    active:true,
                    grupo_id:1
                }
            ]
        }
    },

    get_usuario_id: {
        type: "object",
        example: {
            error: false,
            code: 200,
            message: "Requisição bem sucedida.",
            errors: [],
            data: {
                id:1,
                nome:"João",
                matricula:"123456",
                active:true,
                grupo_id:1
            }
        }
    },

    erro400usuario: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 400,
                    message: "Requisição com sintaxe incorreta ou outros problemas.",
                    errors: ["O Zod encrontrou algum erro na requisição."],
                    data: []
                }
            }
        }
    },

    erro500: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 500,
                    message: "Servidor encontrou um erro interno.",
                    errors: ["OCORREU UM ERRO INTERNO"],
                    data: []
                }
            }
        }
    },
};

    
export default usuarioSchema;
