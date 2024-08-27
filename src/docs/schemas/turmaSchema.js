const usersSchemas = {
    TurmaFiltro: {
        type: "object",
        properties: {
            titulo: {
                type: "string",
                description: "Titulo da Turma"
            },
            usuario_id: {
                type: "string",
                description: "Id do usuário para que possa aparecer o nome do mesmo"
            },
        }
    },
    UsuarioListagem: {
        type: "object",
        properties: {
            id: { type: "integer", description: "ID do usuário" },
            name: { type: "string", description: "Nome do usuário" },
            email: { type: "string", description: "Email do usuário" },
            site: { type: "string", description: "Site do usuário" },
            login: { type: "string", description: "Login do usuário" },
            password: { type: "string", description: "Senha do usuário" },
            system_unit_id: { type: "integer", description: "ID da unidade do usuário" },
            frontpage_id: { type: "integer", description: "ID da página inicial do usuário" },
            photo_path: { type: "string", description: "Caminho da foto do usuário" },
            active: { type: "string", description: "Status de atividade do usuário" },
            accepted_term_policy: { type: "string", description: "Aceitação dos termos de política" },
            accepted_term_policy_at: { type: "string", description: "Data de aceitação dos termos de política" },
            accepted_term_policy_data: { type: "string", description: "Dados de aceitação dos termos de política" },
            phone: { type: "string", description: "Telefone do usuário" },
            address: { type: "string", description: "Endereço do usuário" },
            about: { type: "string", description: "Sobre o usuário" },
            function_name: { type: "string", description: "Nome da função do usuário" },
            custom_code: { type: "string", description: "Código customizado do usuário" },
            otp_secret: { type: "string", description: "Segredo OTP do usuário" }
        },
        example: {
            id: 1,
            name: "João da Silva",
            email: "joao.silva@example.com",
            site: "http://exemplo.com",
            login: "joaosilva",
            password: "123456",
            system_unit_id: 1,
            frontpage_id: 10,
            photo_path: "/fotos/joaosilva.jpg",
            active: "Y",
            accepted_term_policy: "Y",
            accepted_term_policy_at: "2023-01-01",
            accepted_term_policy_data: "Termos aceitos em 2023-01-01",
            phone: "123456789",
            address: "Rua Exemplo, 123",
            about: "Usuário exemplo",
            function_name: "Administrador",
            custom_code: "12345",
            otp_secret: "abcdef123456"
        }
    },
    UsuarioDetalhes: {
        type: "object",
        properties: {
            id: { type: "integer", description: "ID do usuário" },
            name: { type: "string", description: "Nome do usuário" },
            email: { type: "string", description: "Email do usuário" },
            site: { type: "string", description: "Site do usuário" },
            login: { type: "string", description: "Login do usuário" },
            password: { type: "string", description: "Senha do usuário" },
            system_unit_id: { type: "integer", description: "ID da unidade do usuário" },
            frontpage_id: { type: "integer", description: "ID da página inicial do usuário" },
            photo_path: { type: "string", description: "Caminho da foto do usuário" },
            active: { type: "string", description: "Status de atividade do usuário" },
            accepted_term_policy: { type: "string", description: "Aceitação dos termos de política" },
            accepted_term_policy_at: { type: "string", description: "Data de aceitação dos termos de política" },
            accepted_term_policy_data: { type: "string", description: "Dados de aceitação dos termos de política" },
            phone: { type: "string", description: "Telefone do usuário" },
            address: { type: "string", description: "Endereço do usuário" },
            about: { type: "string", description: "Sobre o usuário" },
            function_name: { type: "string", description: "Nome da função do usuário" },
            custom_code: { type: "string", description: "Código customizado do usuário" },
            otp_secret: { type: "string", description: "Segredo OTP do usuário" }
        },
        example: {
            id: 1,
            name: "João da Silva",
            email: "joao.silva@example.com",
            site: "http://exemplo.com",
            login: "joaosilva",
            password: "123456",
            system_unit_id: 1,
            frontpage_id: 10,
            photo_path: "/fotos/joaosilva.jpg",
            active: "Y",
            accepted_term_policy: "Y",
            accepted_term_policy_at: "2023-01-01",
            accepted_term_policy_data: "Termos aceitos em 2023-01-01",
            phone: "123456789",
            address: "Rua Exemplo, 123",
            about: "Usuário exemplo",
            function_name: "Administrador",
            custom_code: "12345",
            otp_secret: "abcdef123456"
        }
    }
};

export default usersSchemas;
