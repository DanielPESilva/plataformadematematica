import { prisma } from "../configs/prismaClient.js"

class TurmaRepository{

    async findAll(filtro){
        return await prisma.turma.findMany(filtro);
    }

    /**
     * 
     
    async findById(filtro){
        return await prisma.turma.findUnique(filtro);
    }

    async createBem(data){
        return await prisma.turma.create(data);
    }

    async createLevantamento(data){
        return await prisma.levantamento.create(data)
    }
    */
    createFilter(parametros){
        let filtro = {
            where: {
                ...(parametros.id && { id: parametros.id }),
                ...(parametros.titulo && { titulo: parametros.titulo }),
                ...(parametros.bem_id && { id: parametros.bem_id }),
                ...(parametros.nome && { nome: {contains: parametros.nome }}),
            },
            select: {
                id:true,
                titulo: true,
                usuario_has_turma: {
                    select: {
                      system_group: {
                        select: {    
                        nome:true,
                        }
                      }
                    }
                  },
            }
        }
        return filtro;
    }
}



export default new TurmaRepository();
