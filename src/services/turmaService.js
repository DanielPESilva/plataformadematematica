import turmaRepository from "../repositores/turmaRepository.js";

class turmaService{
     async listar(filtro){

        //Regras de negócios
        return await turmaRepository.findMany(filtro);
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