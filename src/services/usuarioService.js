import usuarioRepository from "../repositories/UsuarioRepository.js";

class UsuarioService {
    async listar(nome,matricula, page = 1, perPage = 10) {
        const filtros = usuarioRepository.constructFilters(nome, matricula);
        return await usuarioRepository.findAll(filtros, page, perPage);
    }

    async listarPorID(id) {
        return usuarioRepository.findById(id);  

    }

    async listarPorMatricula(matricula) {
        return usuarioRepository.findByMatricula(matricula);
    }

    async inserir(data) {
        return await usuarioRepository.create(data);
    }

    async atualizar(id, data) {
        const user = await usuarioRepository.findById(id);

        if (data.email && user.email !== data.email) {
            const emailExists = await usuarioRepository.findByEmail(data.email);
            if (emailExists) {
                throw new Error ('Email exists');
            }
        }
        return await usuarioRepository.update(id, data);
    }

    async excluir() {
        const user = await usuarioRepository.findById(id);
        if (!user) {
            throw new Error('User not found')
        }

        return await usuarioRepository.delete(id);
    }

}

export default new UsuarioService();