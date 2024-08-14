import turmaRepository from "../repositores/turmaRepository.js";

class turmaService {
  async listar(filtro) {
    try {
      const response = await prisma.turma.findMany();
      res.status(200).json({ response: response });
    } catch (error) {
      res.status(400).json({
        error: true,
        code: 400,
        message: error.message,
      });
    }
    const turmas = await turmaRepository.findMany(filtro);
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
