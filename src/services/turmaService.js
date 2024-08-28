import TurmaRepository from "../repositories/turmaRepository.js"
import turmaSchema from "../schemas/turmaSchema.js";

class TurmaService{

    async listar(parametros){

        const schema = new turmaSchema().listarSchema()
        parametros = schema.parse(parametros)

        const filtro = TurmaRepository.createFilter(parametros)
        const turmas =  await TurmaRepository.findAll(filtro)

        //Novo presente aqui: 
        const turmasComAlunos = turmas.filter(turma => turma.usuario_has_turma.length > 1);

        if (totalFiltrado.length !==0) {
            throw new Error('Nenhuma turma com alunos encontrada');
        }
        
        //executar o if após verificar o repositório
        if(turmas.length == 0){
            throw new Error("Nem uma turma encontrada.");
        }
        return turmas
    }
/**
async listarPorId(parametros){
    const schema = new turmaSchema().listarPorIdSchema()
    parametros = schema.parse(parametros)
    
    const filtro = TurmaRepository.createFilter(parametros)
    const turma = await TurmaRepository.findById(filtro)
    
    if(!turma){
        throw new Error("Nem um registro encontrado.");
    }
    return turma
}
}
*/


}
export default new TurmaService();