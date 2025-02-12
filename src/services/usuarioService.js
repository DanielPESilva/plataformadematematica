import 'dotenv/config'
import usuarioRepository from "../repositories/usuarioRepository.js";
import UsuarioSchema from "../schemas/usuarioSchema.js";
import Stream from "stream";
import csvParser from "csv-parser";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import CSVFileValidator from 'csv-file-validator'

dotenv.config();


class UsuarioService {

  static async listarUsuarios(filtros) {
    const validFiltros = UsuarioSchema.listarUsuarios.parse(filtros);
    return await usuarioRepository.listarUsuarios(validFiltros);
}

static async buscarUsuarioPorId(filtro) {
  const {id} = UsuarioSchema.buscarUsuarioPorId.parse(filtro)
    const usuario = await usuarioRepository.buscarUsuarioPorId(id);
    
    if (!usuario) {
        throw new Error("Usuário não encontrado.");
    }
    if (!usuario.id) {
      throw new Error("Houve um problema ao buscar o usuário. Verifique a sintaxe ou outros problemas.");
  }
    
    return usuario;
}

static async criarUsuario(data) {

  const { nome,matricula, active,senha,grupo_id} = UsuarioSchema.criarUsuario.parse(data);


  const grupoExiste = await usuarioRepository.buscarGrupoPorId(grupo_id);
  if (!grupoExiste) {
    throw new Error("grupo não encontrado.");
  }

  const matriculaExist = await usuarioRepository.buscarUsuarioPorMatricula(matricula);

  if (matriculaExist) {
    throw new Error("A matrícula já está em uso");
  }
  const filtroRepository = await usuarioRepository.criarUsuario({
    nome:nome,
    matricula:matricula,
    active: active,
    senha: senha,
    grupo_id: grupo_id
  })
  return filtroRepository;
};




static async atualizar (parametros){
  const parametrosValidos = UsuarioSchema.atualizarUsuario.parse(parametros);
  const { id, nome, matricula, active, senha, grupo_id } = parametrosValidos;


  const usuarioExist = await usuarioRepository.buscarId(id);


  if (!usuarioExist) {
    throw new Error("O recurso solicitado não foi encontrado no servidor.");
  }

  const usuarioComMesmaMatricula = await usuarioRepository.buscarUsuarioPorMatricula(matricula);


  if (usuarioComMesmaMatricula && usuarioComMesmaMatricula.id !== id) {
    throw new Error("já existe um usuário com essa matrícula");
  }

  const filtro = {
    where: { id: id },
    data: {
      nome: nome,
      matricula: matricula,
      active: active,
      senha: senha,
      grupo_id: grupo_id,
    },
    select: {
      id: true,
      nome: true,
      matricula: true,
      active: true,
      grupo_id: true,
    },
  };

  const usuarioAtualizado = await usuarioRepository.atualizarUsuario(filtro);
 
  return usuarioAtualizado;
}

  static async atualizarSenha (parametros){
    const parametrosValidos = UsuarioSchema.atualizarSenha.parse(parametros);

    const { id, senhaAntiga, senhaNova } = parametrosValidos;

    const usuarioExist = await usuarioRepository.buscarId(id);

    if (!usuarioExist){
      throw new Error("Usuário não existe.")
    }

    const usuario = await usuarioRepository.buscarSenha(id);
    
    const senhaValida = await bcrypt.compare(senhaAntiga, usuario.senha);

    if(!senhaValida){
      throw new Error("Senha Antiga informada está incorreta.")
    }

    const senhaHashed = await bcrypt.hash(senhaNova, parseInt(process.env.SALT));

    const filtro ={
      where:{ id:id},
      data:{  
        senha:senhaHashed,
      }
    };
  
    return await usuarioRepository.atualizarUsuario(filtro);
  }


  static async inserir_csv(arquivo) {
    if (arquivo.mimetype != "text/csv") {
      throw new Error("Arquivo do tipo errado.");
    }

    const csvStreamUsuarios = new Stream.PassThrough();
    csvStreamUsuarios.end(arquivo.buffer);

    const config = {
      headers: [
        { name: "nome", inputName: "nome", required: true },
        { name: "matricula", inputName: "matricula", required: true },
        { name: "senha", inputName: "senha", required: true },
      ],
    };

    const csvData = await CSVFileValidator(csvStreamUsuarios, config);
    if (csvData.inValidData.length > 0) {
      throw new Error("Estrutura do CSV está incorreta.");
    }

    const csvStream = new Stream.PassThrough();
    csvStream.end(arquivo.buffer);

    let usuario_existentes = await usuarioRepository.listar_csv();
    const grupo = await usuarioRepository.grupo_alunos();
    const turmas_ids = await usuarioRepository.buscar_turmas();
    let usuario_csv = [];
    const header = ["nome", "matricula", "senha"];

    await new Promise((resolve, reject) => {
      csvStream
        .pipe(csvParser({ headers: header, separator: ";", skipLines: 1 }))
        .on("data", (row) => {
          const tupula = {
            nome: row["nome"],
            matricula: row["matricula"],
            senha: row["senha"],
          };
          usuario_csv.push(tupula);
        })
        .on("end", () => {
          resolve();
        });
    });

    const novosUsuarios = usuario_csv.filter((usuario) => {
      return !usuario_existentes.some(
        (existente) => existente.matricula === usuario.matricula
      );
    });

    const usuariosParaInserir = await Promise.all(
      novosUsuarios.map(async (usuario) => {
        return {
          nome: usuario.nome,
          matricula: usuario.matricula,
          senha: await bcrypt.hash(usuario.senha, parseInt(process.env.SALT)),
          active: true,
          grupo_id: grupo.id,
        };
      })
    );
    let ids = [];
    let usuario_criados = [];
    await Promise.all(
      usuariosParaInserir.map(async (usuario) => {
        const usuario_criado = await usuarioRepository.inserir_usuarios(
          usuario
        );
        ids.push(usuario_criado.id);
        usuario_criados.push(usuario_criado);
      })
    );

    await Promise.all(
      ids.map(async (usuario) => {
        let insert = [];
        for (const turma of turmas_ids) {
          insert.push({ usuario_id: usuario, turma_id: turma.id });
        }
        await usuarioRepository.inserir_alunos(insert);
      })
    );

    return usuario_criados;
  }
}

export default UsuarioService;