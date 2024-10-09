import express from "express"
import AulaController from "../controllers/AulaController.js"
const router = express.Router();

/**
 * post, patch e delete é padrão, normal igual já fizeram.
 * 
 * O get normal ele tem que receber na requisição o id do usuario
 * para que? junto com os dados da sala, vc tem que buscar na tabela feito
 * se o usuario já marcou aquela aula com assistida ou para revisar, isso você faz
 * utilizando o id do usuario e da sala.
 * 
 * também deve ser possivel filtrar as aulas pelo titulo
 * 
 * e a rota /aula/status é insersão nessa tabela feito, ela vai receber o id do usuario e da sala 
 * e o boolean do atributo feito ou revisar. vc pega isso e insere na tabela feito.
 * 
 * Isso serve para marcar que uma aula já foi assistida pelo usuario.
*/

router
    router.get("/aula", AulaController.listar)
    router.get("/aula/:id",AulaController.listarPorID)
    router.post('/aula', AulaController.inserir);
    router.post('/aula/status', AulaController.aula_status)
    router.patch('/aula/:id',AulaController.atualizar);
    router.delete('/aula', AulaController.deletar)

    export default router;