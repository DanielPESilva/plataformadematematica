import turmaRepository from "../repositories/turmaRepository.js";
import TurmaRepository from "../repositories/turmaRepository.js";
import TurmaSchema from "../schemas/turmaSchemas.js";

class turmaService {
  async listar(titulo) {
    try {
      const filtros = TurmaRepository.constructFilters(titulo);
      const { turmas, total } = await TurmaRepository.findAll( filtros );

      // Regra de negócio: Filtrar turmas com pelo menos um aluno
      const turmasComAlunos = turmas.filter(
        (turma) => turma.usuario_has_turma.length > 1
      );

      // Retornando turmas filtradas e ajustando a paginação
      return ({ turmas: turmasComAlunos, total: total});

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
    console.log("após validações");

    let data ={data:{id:id,titulo:titulo,}}

    const turma = await TurmaRepository.create(data);
    if(!turma){
      throw{
        code: 404,
        message: `Não foi possivel criar turma com o nome: ${titulo}`
        
      }
    }
    console.log(turma)

    return turma;
  }

  static async atualizarUsuario(parametro){

    parametro = TurmaSchema.atualizarTurmaSchema.parse(parametro);


    //voltar aqui após passar pelo schema.
    const {id, titulo} = parametro;

    const usuarioExiste = await UsuarioRepository.usuarioCadastrado(id);

    if(usuarioExiste == null){
        throw new Error ("Usuário não existe.")
    }

    let update = {
        where:{ id: id },
        data:{ titulo:titulo },
        select:{
            id:true,
            titulo:true
        }
    }

    return await turmaRepository.atualizarTurma(update);
}

}
export default new turmaService();