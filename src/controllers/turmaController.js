import turmaService from "../services/turmaService.js";
import {z} from 'zod';
import {sendResponse, sendError} from "../utils/messages.js";

class TurmaController {

    static listar = async (req, res) => {
        try {
            const {id,titulo,usu_id} = req.query;
            const parametros = {
                id: id,
                titulo:titulo,
                usu_id: usu_id
                }
            const turmaExists = await turmaService.listar(parametros)

            //Voltar aqui após o service
            return sendResponse(res,200,{data: turmaExists})

        } catch (err) {
            if(err.message === "Nem uma turma encontrada.") {
                return sendError(res, 404, ["Nem uma turma encontrada."])

            }else if (err instanceof z.ZodError) {
                const errorMessages = err.issues.map((issue) => issue.message);
                return sendError(res, 400, errorMessages)

            }else{
                return sendError(res, 500, ["OCORREU UM ERRO INTERNO"])
            }
        }
    }
}

export default TurmaController