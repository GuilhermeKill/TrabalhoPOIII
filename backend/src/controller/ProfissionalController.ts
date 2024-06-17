import { Request, Response } from "express";
import ProfissionalDataBaseService from "../service/ProfissionalDataBaseService";

class ProfissionalController {
  constructor() {}

  async getProfissional(req: Request, res: Response) {
    try {
      const profissionais =
        await ProfissionalDataBaseService.listDBProfissionais();
      res.json({
        status: 200,
        profissionais: profissionais,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Não foi possível listar os profissionais",
      });
    }
    /*
    #swagger.security = [{
            "bearerAuth": []
    }]
     #swagger.tags = ['Profissional']
            #swagger.summary = 'Obter todos os profissionais'
            #swagger.description = 'Recupera uma lista de todos os profissionais'

             #swagger.responses[200] = {
      description: 'Uma lista de residentes',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Profissional" }
          }
        }
      }
    }}
    */
  }

  async getProfissionalById(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      res.status(500).json({
        status: 500,
        message: "Id do profissional não encontrado",
      });
      return;
    }

    try {
      const profissional =
        await ProfissionalDataBaseService.getProfissionalById(parseInt(id));

      if (!profissional) {
        res.status(404).json({
          status: 404,
          message: "Profissional não encontrado",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        profissional: profissional,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao buscar o profissional",
      });
    }

    /*
    #swagger.security = [{
            "bearerAuth": []
    }]
     #swagger.tags = ['Profissional']
            #swagger.summary = 'Obter  profissional por ID'
            #swagger.description = 'Recupera um  profissional por ID '
             #swagger.responses[200] = {
      description: 'Retorna Um Proffisional',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Profissional" }
          }
        }
      }
    }}
    */
  }

  async getProfissionalByNome(req: Request, res: Response) {
    const { nome } = req.query;

    if (!nome) {
      res.status(400).json({
        status: 400,
        message: "Nome do residente não fornecido",
      });
      return;
    }

    try {
      const residentes =
        await ProfissionalDataBaseService.getProfissionalByNome(nome as string);

      if (!residentes || residentes.length === 0) {
        res.status(404).json({
          status: 404,
          message: "Profissional não encontrado",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        residentes: residentes,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao buscar o Profissional",
      });
    }

    /*
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.tags = ['Profissional']
    #swagger.summary = 'Obter Profissional por nome'
    #swagger.description = 'Recupera residentes cujo nome contém os caracteres fornecidos'
     #swagger.responses[200] = {
      description: 'Retorna Um Proffisional',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Profissional" }
          }
        }
      }
    }}
   */
  }

  async postProfissional(req: Request, res: Response) {
    const profissionalData = req.body;

    if (
      !profissionalData.nome ||
      !profissionalData.cpf ||
      !profissionalData.funcao ||
      !profissionalData.email ||
      !profissionalData.senha ||
      !profissionalData.nivelAcesso
    ) {
      res.status(400).json({
        status: 400,
        message: "Preencha todos os campos obrigatórios",
      });
      return;
    }

    try {
      const newProfissional =
        await ProfissionalDataBaseService.insertDBProfissional(
          profissionalData,
        );
      res.status(201).json({
        status: 201,
        profissional: newProfissional,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao criar o profissional",
      });
    }
    /*
    
     #swagger.tags = ['Profissional']
            #swagger.summary = ' Criar um novo profissional'
            #swagger.description = 'Cria um novo profissional com os dados fornecidos'

            #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ProfissionalCreate"
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Profissional criado com sucesso',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Profissional" }
        }
      }
    }
     */
  }

  async putProfissional(req: Request, res: Response) {
    const id = req.params.id;
    const profissionalData = req.body;

    if (!id) {
      res.status(400).json({
        status: 400,
        message: "Id do profissional não encontrado",
      });
      return;
    }

    if (
      !profissionalData.nome ||
      !profissionalData.cpf ||
      !profissionalData.funcao ||
      !profissionalData.email ||
      !profissionalData.senha ||
      !profissionalData.nivelAcesso
    ) {
      res.status(400).json({
        status: 400,
        message: "Preencha todos os campos obrigatórios",
      });
      return;
    }

    try {
      const updatedProfissional =
        await ProfissionalDataBaseService.updateDBProfissional(
          profissionalData,
          parseInt(id),
        );
      res.status(200).json({
        status: 200,
        updatedProfissional: updatedProfissional,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao atualizar o profissional",
      });
    }

    /*
     #swagger.tags = ['Profissional']
            #swagger.summary = 'Atualizar profissional por ID'
            #swagger.description = 'Atualiza um profissional com o ID fornecido'

              #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ProfissionalCreate"
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Profissional criado com sucesso',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Profissional" }
        }
      }
    }
    #swagger.security = [{
            "bearerAuth": []
    }] */
  }

  async deleteProfissional(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({
        status: 400,
        message: "Id do profissional não encontrado",
      });
      return;
    }

    try {
      await ProfissionalDataBaseService.deleteDBProfissional(parseInt(id));
      res.status(200).json({
        status: 200,
        message: "Profissional deletado com sucesso",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao excluir o profissional",
      });
    }

    /*
     #swagger.tags = ['Profissional']
            #swagger.summary = 'Excluir profissional por ID'
            #swagger.description = 'Exclui um profissional com o ID fornecido.'
    #swagger.security = [{
            "bearerAuth": []
    }] */
  }
}

export default new ProfissionalController();
