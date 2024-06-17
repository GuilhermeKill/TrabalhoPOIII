import { Request, Response } from "express";
import MedicacaoPacienteDataBaseService from "../service/MedicacaoPacienteDataBaseService";
import { Prisma } from "@prisma/client";

class MedicacaoController {
  constructor() {}

  async getMedicacoesPaciente(req: Request, res: Response) {
    try {
      const medicacoesPaciente =
        await MedicacaoPacienteDataBaseService.listDBMedicacoesPaciente();
      res.status(200).json({
        status: 200,
        medicacoesPaciente: medicacoesPaciente,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao listar as medicações do paciente",
      });
    }

    /*
    #swagger.security = [{
            "bearerAuth": []
    }]
     #swagger.tags = ['Medicacao  Paciente']
            #swagger.summary = 'Obter todas as medicações de pacientes'
            #swagger.description = 'Recupera uma lista de todas as medicações de pacientes'
             #swagger.responses[200] = {
      description: 'Um lista Medicação Paciente',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/MedicacaoPaciente" }
          }
        }
      }
    }}
    */
  }

  async getMedicacaoPacienteById(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({
        status: 400,
        message: "Id da medicação do paciente não fornecido",
      });
      return;
    }

    try {
      const medicacaoPaciente =
        await MedicacaoPacienteDataBaseService.getMedicacaoPacienteById(
          parseInt(id),
        );

      if (!medicacaoPaciente) {
        res.status(404).json({
          status: 404,
          message: "Medicação do paciente não encontrada",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        medicacaoPaciente: medicacaoPaciente,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao buscar a medicação do paciente",
      });
    }
    /*
    #swagger.security = [{
            "bearerAuth": []
    }]
     #swagger.tags = ['Medicacao  Paciente']
            #swagger.summary = 'Obter medicação de paciente por ID'
            #swagger.description = 'Recupera uma medicação de paciente por ID'
            #swagger.responses[200] = {
      description: 'Um Medicação Paciente',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/MedicacaoPaciente" }
          }
        }
      }
    }}
    */
  }

  async postMedicacaoPaciente(req: Request, res: Response) {
    const {
      idResidente,
      idMedicamento,
      idProfissional,
      viaAdministracao,
      quantidadeTempoHoras,
      quantidadeTempoDias,
      dataHoraInicioMedicamento,
      observacao,
    } = req.body;

    try {
      if (
        !idResidente ||
        !idMedicamento ||
        !idProfissional ||
        !viaAdministracao ||
        !quantidadeTempoHoras ||
        !quantidadeTempoDias||
        !dataHoraInicioMedicamento||
        !observacao
      ) {
        res.status(400).json({
          status: 400,
          message: "Campos obrigatórios não fornecidos",
        });
        return;
      }

      const newMedicacaoPaciente =
        await MedicacaoPacienteDataBaseService.insertDBMedicacaoPaciente({
          residente: { connect: { idResidente: idResidente } },
          medicamento: { connect: { idMedicamento: idMedicamento } },
          profissional: { connect: { idProfissional: idProfissional } },
          viaAdministracao: viaAdministracao,
          dataMedicamentoInicio: new Date(),
          observacao: observacao || null,
          quantidadeTempoHoras: quantidadeTempoHoras,
          quantidadeTempoDias: quantidadeTempoDias,
          dataHoraMinistrado: dataHoraInicioMedicamento
            ? new Date(dataHoraInicioMedicamento)
            : new Date(),
        });

      res.status(201).json({
        status: 201,
        medicacaoPaciente: newMedicacaoPaciente,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao criar a medicação do paciente",
      });
    }

    /*
     #swagger.tags = ['Medicacao  Paciente']
            #swagger.summary = 'Criar uma nova medicação de paciente'
            #swagger.description = 'Cria uma nova medicação de paciente com os dados fornecidos'
              #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/MedicacaoPacienteCreate"
            }
          }
        }
      }
      #swagger.responses[201] = {
        description: 'Medicacao Paciente criado com sucesso',
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/MedicacaoPaciente" }
          }
        }
      }
    #swagger.security = [{
            "bearerAuth": []
    }] */
  }

  async putMedicacaoPaciente(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({
        status: 400,
        message: "Id da medicação do paciente não fornecido",
      });
      return;
    }

    const {
      idResidente,
      idMedicamento,
      idProfissional,
      viaAdministracao,
      observacao,
      quantidadeTempoHoras,
      quantidadeTempoDias,
    } = req.body;

    const fieldsToUpdate: Partial<Prisma.MedicacaoPacienteUpdateInput> = {
      residente:
        idResidente !== undefined ? { connect: { idResidente } } : undefined,
      medicamento:
        idMedicamento !== undefined
          ? { connect: { idMedicamento } }
          : undefined,
      profissional:
        idProfissional !== undefined
          ? { connect: { idProfissional } }
          : undefined,
      viaAdministracao:
        viaAdministracao !== undefined ? viaAdministracao : undefined,
      observacao: observacao !== undefined ? observacao || null : undefined,
      quantidadeTempoHoras:
        quantidadeTempoHoras !== undefined ? quantidadeTempoHoras : undefined,
      quantidadeTempoDias:
        quantidadeTempoDias !== undefined ? quantidadeTempoDias : undefined,
      dataHoraMinistrado: new Date(),
    };

    // Remover campos não fornecidos (undefined) do objeto
    Object.keys(fieldsToUpdate).forEach(
      (key) =>
        fieldsToUpdate[key as keyof typeof fieldsToUpdate] === undefined &&
        delete fieldsToUpdate[key as keyof typeof fieldsToUpdate],
    );

    try {
      const updatedMedicacaoPaciente =
        await MedicacaoPacienteDataBaseService.updateDBMedicacaoPaciente(
          fieldsToUpdate,
          parseInt(id),
        );

      if (!updatedMedicacaoPaciente) {
        res.status(404).json({
          status: 404,
          message: "Medicação do paciente não encontrada",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        updatedMedicacaoPaciente,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao atualizar a medicação do paciente",
      });
    }

    /*
     #swagger.tags = ['Medicacao  Paciente']
            #swagger.summary = 'Atualizar medicação de paciente por ID'
            #swagger.description = 'Atualiza uma medicação de paciente com o ID fornecido'

              #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/MedicacaoPacienteCreate"
            }
          }
        }
      }
      #swagger.responses[201] = {
        description: 'Medicacao Paciente criado com sucesso',
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/MedicacaoPaciente" }
          }
        }
      }
    #swagger.security = [{
            "bearerAuth": []
    }] */
  }

  async deleteMedicacaoPaciente(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({
        status: 400,
        message: "Id da medicação do paciente não fornecido",
      });
      return;
    }

    try {
      const response =
        await MedicacaoPacienteDataBaseService.deleteDBMedicacaoPaciente(
          parseInt(id),
        );

      if (response) {
        res.status(200).json({
          status: 200,
          message: "Medicação do paciente deletada com sucesso",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao excluir a medicação do paciente",
      });
    }

    /*
     #swagger.tags = ['Medicacao  Paciente']
            #swagger.summary = 'Excluir medicação de paciente por ID'
            #swagger.description = 'Exclui uma medicação de paciente com o ID fornecido.'
    #swagger.security = [{
            "bearerAuth": []
    }] */
  }
}

export default new MedicacaoController();
