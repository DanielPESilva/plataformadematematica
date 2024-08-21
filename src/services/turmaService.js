import turmaRepository from "../repositores/turmaRepository.js";

class turmaService {
  async listar(titulo, usuario_id, page = 1, perPage = 10) {
    try {
        const filtros = turmaRepository.constructFilters(usuario_id, titulo);
        const { turmas, total } = await turmaRepository.findAll(filtros, page, perPage);

        // Regra de negócio: Filtrar turmas com pelo menos um aluno
        const turmasComAlunos = turmas.filter(turma => turma.usuario_has_turma.length > 1);
        const totalFiltrado = turmasComAlunos.length;

        if (totalFiltrado === 0) {
            throw new Error('Nenhuma turma com alunos encontrada');
        }

        // Retornando turmas filtradas e ajustando a paginação
        return {
            turmas: turmasComAlunos,
            total: totalFiltrado,
            page,
            perPage
        };
    } catch (error) {
        console.error('Erro ao listar turmas:', error.message);
        throw new Error('Erro ao listar turmas com alunos');
    }
}

  async listarPorID(id) {
    if (isNaN(id)) {
      throw new Error('ID deve ser um número inteiro)');
    }
    return turmaRepository.findById(id);
  }

  async create(data) {
    return await prisma.system_users.create({ data });
  }
}
export default new turmaService();
