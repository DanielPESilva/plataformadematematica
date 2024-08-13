import turmaRepository from "../repositores/turmaRepository.js";

class turmaService{
    async listar(filtro){
        // Busca as turmas com base no filtro
        const turmas = await turmaRepository.findMany(filtro);

        // Filtra as turmas que possuem pelo menos um aluno associado
        const turmasComAlunos = turmas.filter(turma => turma.aluno_id && turma.aluno_id.length > 0);

        // Verifica se há turmas com alunos
        if (turmasComAlunos.length === 0) {
            throw new Error("Nenhuma turma com pelo menos um aluno foi encontrada.");
        }else{
          // Retorna as turmas que possuem pelo menos um aluno
          return turmasComAlunos;
        }

    }
    
  async listarPorID(id) {
    // teste se o id é um número
    if (isNaN(id)) {
        console.log(id)
      throw new Error('ID deve ser um número inteiro)');
    }
    return turmaRepository.findById(id);
  }

    
}
export default new turmaService();