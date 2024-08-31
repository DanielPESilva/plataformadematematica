import TurmaRepository from "../repositories/turmaRepository.js";
import TurmaSchema from "../schemas/turmaSchemas.js";

class turmaService {
  async listar(titulo, usuario_id, page = 1, perPage = 10) {
    try {
      const filtros = TurmaRepository.constructFilters(usuario_id, titulo);
      const { turmas, total } = await TurmaRepository.findAll(
        filtros,
        page,
        perPage
      );

      // Regra de negócio: Filtrar turmas com pelo menos um aluno
      const turmasComAlunos = turmas.filter(
        (turma) => turma.usuario_has_turma.length > 1
      );
      const totalFiltrado = turmasComAlunos.length;

      if (totalFiltrado === 0) {
        throw new Error("Nenhuma turma com alunos encontrada");
      }

      // Retornando turmas filtradas e ajustando a paginação
      return {
        turmas: turmasComAlunos,
        total: totalFiltrado,
        page,
        perPage,
      };
    } catch (error) {
      console.error("Erro ao listar turmas:", error.message);
      throw new Error("Erro ao listar turmas com alunos");
    }
  }

  async listarPorID(id) {
    if (isNaN(id)) {
      throw new Error("ID deve ser um número inteiro");
    }
    return TurmaRepository.findById(id);
  }

  async create(dados) {
    const {id,titulo} = TurmaSchema.createTurmasSchema.parse(dados);

    console.log(titulo + "pós validação");

    // const turmaExists = await TurmaRepository.turmaExist(parametros.titulo)
    // console.log(turmaExists + "Turma")

    // const usuarioExists = await TurmaRepository.userExist(parametros.usuario_id)
    // console.log(usuarioExists + "usuario")

    // if(turmaExists && usuarioExists){
    //     throw new Error("A turma já existe.");
    // }

    // const { titulo, usuario_id, ...camposInsert } = parametros;
    // const insertTurma = {
    //     turma: { connect: { titulo: titulo } },
    //     usuario_has_turma: { connect: { usuario_id: usuario_id } },
    //     ...camposInsert
    // };
    console.log("após validações");

    let data ={data:{id:id,titulo:titulo,}}

  // Pass 'user' object into query


    const turma = await TurmaRepository.create(data);
    if(!turma){
      throw{
        code: 404,
        mensage: `Não foi possivel criar turma com o nome: ${titulo}`
        
      }
    }
    console.log(turma)

    return turma;
  }
}
export default new turmaService();
