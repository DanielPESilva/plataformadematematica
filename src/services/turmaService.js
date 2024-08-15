import turmaRepository from "../repositores/turmaRepository.js";

class turmaService {
  async listar( titulo, usuario_id, page = 1, perPage = 10) {
    
    const filtros = turmaRepository.constructFilters(usuario_id, titulo);
    const turmas = await turmaRepository.findAll(filtros, page, perPage);
    const invalidTitulo =  turmaRepository.constructFilters(usuario_id);

    
    // Se encontrar registros inválidos, lance um erro
    if (invalidTitulo.length > 0) {
      throw new Error('Não há nenhum aluno em nenhuma turma.');

    } else {
      console.log('Há pelo menos 1 turma com pelo menos 1 aluno');
    }

    // retornar o que vier do repository
    return turmas;

  }

  async listarPorID(id) {
    // teste se o id é um número
    if (isNaN(id)) {
      console.log(id);
      throw new Error("ID deve ser um número inteiro)");
    }
    return turmaRepository.findById(id);
  }
}
export default new turmaService();
