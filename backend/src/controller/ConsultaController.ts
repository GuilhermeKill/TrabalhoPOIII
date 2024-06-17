// ConsultaController.js
import { Request, Response } from "express";
import ConsultaDataBaseService from "../service/ConsultaDataBaseService";

class ConsultaController {
  constructor() {}

  async getConsultas(req: Request, res: Response) {
    try {
      const consultas = await ConsultaDataBaseService.listDBConsultas();
      res.status(200).json({
        status: 200,
        consultas: consultas,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao listar as consultas",
      });
    }

    /*
    #swagger.security = [{
            "bearerAuth": []
    }]
     #swagger.tags = ['Consulta']
            #swagger.summary = 'Obter todas as consultas'
            #swagger.description = 'Recupera uma lista de todas as consultas'
            #swagger.responses[200] = {
      description: 'Uma lista de consultas',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Consulta" }
          }
        }
      }
    }}
     */
  }

  async getConsultaById(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({
        status: 400,
        message: "Id da consulta não fornecido",
      });
      return;
    }

    try {
      const consulta = await ConsultaDataBaseService.getConsultaById(
        parseInt(id),
      );

      if (!consulta) {
        res.status(404).json({
          status: 404,
          message: "Consulta não encontrada",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        consulta: consulta,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao buscar a consulta",
      });
    }
    /*
    #swagger.security = [{
            "bearerAuth": []
    }] 
     #swagger.tags = ['Consulta']
            #swagger.summary = 'Obter consulta por ID'
            #swagger.description = 'Recupera uma consulta por ID '
            #swagger.responses[200] = {
      description: 'Uma  consulta',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Consulta" }
          }
        }
      }
    }}
    
    
  #swagger.security = [{
            "bearerAuth": []
    }] */
  }

  async postConsulta(req: Request, res: Response) {
    const {
      tipoConsulta,
      residenteId,
      profissionalId,
      nomeMedico,
      observacao,
      compareceu,
      dataConsulta,
    } = req.body;

    try {
      if (
        !tipoConsulta ||
        !residenteId ||
        !profissionalId ||
        !nomeMedico ||
        !observacao ||
        !dataConsulta
      ) {
        res.status(400).json({
          status: 400,
          message: "Campos obrigatórios não fornecidos aquiiiiii",
        });
        return;
      }

      const newConsulta = await ConsultaDataBaseService.insertDBConsulta({
        dataHora: dataConsulta ? new Date(dataConsulta) : new Date(),
        tipoConsulta: tipoConsulta,
        residente: { connect: { idResidente: residenteId } },
        profissional: { connect: { idProfissional: profissionalId } },
        compareceu: compareceu,
        nomeMedico: nomeMedico,
        observacao: observacao,
      });

      res.status(201).json({
        status: 201,
        consulta: newConsulta,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao criar a consulta",
      });
    }

    /*
   #swagger.tags = ['Consulta']
          #swagger.summary = 'Criar uma nova consulta'
          #swagger.description = 'Cria uma nova consulta com os dados fornecidos'
     #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ConsultaCreate"
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Consulta criado com sucesso',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Consulta" }
        }
      }
    }
  #swagger.security = [{
          "bearerAuth": []
  }] */
  }

  async putConsulta(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({
        status: 400,
        message: "Id da consulta não fornecido",
      });
      return;
    }

    const {
      dataHora,
      tipoConsulta,
      residenteId,
      profissionalId,
      compareceu,
      nomeMedico,
      observacao,
    } = req.body;

    try {
      const updatedConsulta = await ConsultaDataBaseService.updateDBConsulta(
        {
          dataHora: dataHora ? new Date(dataHora) : undefined,
          tipoConsulta: tipoConsulta,
          residente: { connect: { idResidente: residenteId } },
          profissional: { connect: { idProfissional: profissionalId } },
          compareceu: compareceu,
          nomeMedico: nomeMedico,
          observacao: observacao,
        },
        parseInt(id),
      );

      res.status(200).json({
        status: 200,
        updatedConsulta: updatedConsulta,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao atualizar a consulta",
      });
    }
    /*
     #swagger.tags = ['Consulta']
            #swagger.summary = 'Atualizar consulta por ID'
            #swagger.description = 'Atualiza uma consulta com o ID fornecido'
              #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ConsultaCreate"
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'Consulta criado com sucesso',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Consulta" }
        }
      }
    }

    #swagger.security = [{
            "bearerAuth": []
    }] */
  }

  async deleteConsulta(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({
        status: 400,
        message: "Id da consulta não fornecido",
      });
      return;
    }

    try {
      const response = await ConsultaDataBaseService.deleteDBConsulta(
        parseInt(id),
      );

      if (response) {
        res.status(200).json({
          status: 200,
          message: "Consulta deletada com sucesso",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao excluir a consulta",
      });
    }
    /*
     #swagger.tags = ['Consulta']
            #swagger.summary = 'Excluir consulta por ID'
            #swagger.description = 'Exclui uma consulta com o ID fornecido.'
    #swagger.security = [{
            "bearerAuth": []
    }] */
  }
}

export default new ConsultaController();
