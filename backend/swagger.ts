const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0",
    title: "Cuidado ao Residente  API",
    description:
      "Cuidado ao Residente é uma API para cadastro e gerenciamento de dados dos residentes e suas consultas médicas. <br> Ela permite registrar informações detalhadas, como histórico médico, alergias e medicamentos, oferecendo um acompanhamento personalizado e eficaz.<br>A API também possibilita o cadastro de consultas, registrando data, horário, tipo e observações, garantindo um histórico completo de atendimento.<br> Além disso, inclui alertas de horário de medicação e dia de consulta, ajudando a manter a adesão ao tratamento e a pontualidade nas consultas. ",

    contact: {
      name: "API Support",
      url: "https://github.com/howardroatti",
      email: "https://github.com/howardroatti",
    },
  },
  servers: [
    {
      url: "http://localhost:3005",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },

    schemas: {
      Residente: {
        type: "object",
        properties: {
          idResidente: { type: "integer", example: 1 },
          nomeCompleto: { type: "string", example: "João da Silva" },
          dataNascimento: { type: "string", example: "1980-01-01" },
          documentoIdentificacao: { type: "string", example: "123456789" },
          medicacaoPaciente: { type: "array", items: {} },
          consultas: { type: "array", items: {} },
        },
      },
      ResidenteCreate: {
        nomeCompleto: "João da Silva",
        dataNascimento: "1980-01-01",
        documentoIdentificacao: "123456789",
      },
      MedicacaoPaciente: {
        type: "object",
        properties: {
          idMedicacaoPaciente: { type: "integer", example: 1 },
          idResidente: { type: "integer", example: 1 },
          idMedicamento: { type: "integer", example: 1 },
          idProfissional: { type: "integer", example: 1 },
          quantidadeTempoHoras: { type: "integer", example: 8 },
          quantidadeTempoDias: { type: "integer", example: 30 },
          viaAdministracao: { type: "string", example: "oral" },
          dataHoraInicioMedicamento: {
            type: "string",
            format: "date-time",
            example: "2024-05-18T12:34:56Z",
          },
          dataMedicamentoInicio: {
            type: "string",
            format: "date-time",
            example: "2024-05-18T12:34:56Z",
          },
          observacao: { type: "string", example: "Tomar após as refeições" },
        },
      },
      MedicacaoPacienteCreate: {
        idMedicamento: 1,
        idProfissional: 1,
        idResidente: 1,
        quantidadeTempoHoras: 8,
        quantidadeTempoDias: 30,
        viaAdministracao: "oral",
        dataHoraInicioMedicamento: "2024-05-18T12:34:56Z",
        observacao: "Tomar após as refeições",
      },
      Consulta: {
        type: "object",
        properties: {
          idConsulta: { type: "integer", example: 1 },
          dataConsulta: {
            type: "string",
            format: "date-time",
            example: "2024-05-18T12:34:56Z",
          },
          tipoConsulta: { type: "string", example: "Rotina" },
          nomeMedico: { type: "string", example: "Dr. José" },
          compareceu: { type: "string", example: "Sim" },
          observacao: { type: "string", example: "Paciente em boa condição" },
          residenteId: { type: "integer", example: 1 },
          profissionalId: { type: "integer", example: 1 },
        },
      },
      ConsultaCreate: {
        dataConsulta: "2024-05-18T12:34:56Z",
        tipoConsulta: "Rotina",
        nomeMedico: "Dr. José",
        compareceu: "Sim",
        observacao: "Paciente em boa condição",
        residenteId: 1,
        profissionalId: 1,
      },
      Profissional: {
        type: "object",
        properties: {
          idProfissional: { type: "integer", example: 1 },
          nome: { type: "string", example: "Dr. Ana" },
          cpf: { type: "string", example: "123.456.789-00" },
          funcao: { type: "string", example: "Médico" },
          email: { type: "string", example: "ana@example.com" },
          senha: { type: "string", example: "senha123" },
          nivelAcesso: { type: "string", example: "admin" },
        },
      },
      ProfissionalCreate: {
        nome: "Dr. Ana",
        cpf: "123.456.789-00",
        funcao: "Médico",
        email: "ana@example.com",
        senha: "senha123",
        nivelAcesso: "admin",
      },

      Medicamento: {
        type: "object",
        properties: {
          idMedicamento: { type: "integer", example: 1 },
          nomeMedicamento: { type: "string", example: "Paracetamol" },
          dosagem: { type: "string", example: "500mg" },
          preco: { type: "number", format: "float", example: 19.99 },
        },
      },
      MedicamentoCreate: {
        nomeMedicamento: "Paracetamol",
        dosagem: "500mg",
        preco: 19.99,
      },
      AlertaMedicamento: {
        type: "object",
        properties: {
          idMedicacaoResidente: { type: "integer", example: 1 },
          residenteNome: { type: "string", example: "Lucas Carlos" },
          medicamentoNome: { type: "string", example: "DorFLex" },
          viaAdministracao: { type: "string", example: "Oral" },
          dosagem: { type: "string", example: "500mg" },
          TempoDecorrido: {
            type: "array",
            items: { dias: 10, horas: 22, minutos: 58, segundos: 9 },
          },
        },
      },
      AlertasConsultas: {
        type: "object",
        properties: {
          idConsulta: { type: "integer", example: 1 },
          residenteNome: { type: "string", example: "Lucas Carlos" },
          nomeMedico: { type: "string", example: "DR. José" },
          tipoConsulta: { type: "string", example: "Padrão" },
          cobservacao: { type: "string", example: "Nada a declarar" },
          compareceu: { type: "string", example: "não" },
          tempoProxiConsulta: {
            type: "array",
            items: { dias: 6, horas: 22, minutos: 58, segundos: 9 },
          },
        },
      },

      Autenticacao: {
        type: "object",
        properties: {
          auth: { type: "boolean", example: true },
          status: { type: "integer", example: 200 },
          profissional: {
            type: "object",
            properties: {
              idProfissional: { type: "integer", example: 1 },
              nome: { type: "string", example: "1" },
              cpf: { type: "string", example: "2" },
              funcao: { type: "string", example: "3" },
              email: { type: "string", example: "novo" },
              senha: {
                type: "string",
                example:
                  "$2b$10$PrdniTrjj3cRGgyfjHlKIez1VrqDIYPhnkXNNJFIIaSzWjIPzUfYS",
              },
              nivelAcesso: { type: "string", example: "1" },
            },
          },
          success: { type: "boolean", example: true },
          token: {
            type: "string",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6IjEiLCJuaXZlbEFjZXNzbyI6IjEiLCJpYXQiOjE3MTcwOTA1ODksImV4cCI6MTcxNzA5MjM4OX0.OhP7hJhmJwXR8rzzBuVAnl6gxF44AkQGRVNF7vA4wls",
          },
          message: { type: "string", example: "Login bem sucedido." },
        },
      },

      AutenticacaoLogin: {
        email: "profissional@gmail.com",
        senha: "senha123",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./src/routes/ResidenteRoutes.ts",
  "./src/routes/AuthRoutes.ts",
  "./src/routes/ConsultaRoutes.ts",
  "./src/routes/ProfissionalRoutes.ts",
  "./src/routes/MedicamentoRoutes.ts",
  "./src/routes/MedicacaoPacienteRoutes.ts",
  "./src/routes/AlertaConsultaRoutes.ts",
  "./src/routes/AlertaMedicamentoRoutes.ts",
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./index.ts"); // Your project's root file
});
