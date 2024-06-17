import { Request, Response } from "express";
import MedicamentoDataBaseService from "../service/MedicamentoDataBaseService";

class MedicamentoController {
  constructor() {}

  async getMedicamentos(req: Request, res: Response) {
    try {
      const medicamentos =
        await MedicamentoDataBaseService.listDBMedicamentos();
      res.json({
        status: "ok",
        medicamentos: medicamentos,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }

    /*
     #swagger.security = [{
          "bearerAuth": []
  }]
     #swagger.tags = ['Medicamento']
            #swagger.summary = 'Obter todos os medicamentos'
            #swagger.description = 'Recupera uma lista de todos os medicamentos'
            #swagger.responses[200] = {
      description: 'Recupera Medicamento ',
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

  async getResidenteByNome(req: Request, res: Response) {
    const { nome } = req.query;

    if (!nome) {
      res.status(400).json({
        status: 400,
        message: "Nome do residente não fornecido",
      });
      return;
    }

    try {
      const residentes = await MedicamentoDataBaseService.getMedicamentoByNome(
        nome as string,
      );

      if (!residentes || residentes.length === 0) {
        res.status(404).json({
          status: 404,
          message: "Medicamento não encontrado",
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
        message: "Erro ao buscar o medicamento",
      });
    }

    /*
     #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.tags = ['Medicamento']
    #swagger.summary = 'Obter residentes por nome'
    #swagger.description = 'Recupera Medicamento cujo nome contém os caracteres fornecidos'

     #swagger.responses[200] = {
      description: 'Recupera Medicamento ',
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

  async getMedicamentoById(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      res.status(500).json({
        status: 500,
        message: "Id do medicamento não encontrado",
      });
      return;
    }

    try {
      const medicamento = await MedicamentoDataBaseService.getMedicamentoById(
        parseInt(id),
      );

      if (!medicamento) {
        res.status(404).json({
          status: 404,
          message: "Medicamento não encontrado",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        medicamento: medicamento,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao buscar o medicamento",
      });
    }
    /*
     
   #swagger.tags = ['Medicamento']
          #swagger.summary = 'Obter medicamento por ID'
          #swagger.description = 'Recupera um medicamento por ID'
          #swagger.responses[200] = {
      description: 'Recupera Medicamento ',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Profissional" }
          }
        }
      }
    }
  #swagger.security = [{
          "bearerAuth": []
  }] */
  }

  async postMedicamento(req: Request, res: Response) {
    const body = req.body;

    if (!body.nomeMedicamento || !body.dosagem) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
      return;
    }

    try {
      const newMedicamento =
        await MedicamentoDataBaseService.insertDBMedicamento({
          nomeMedicamento: body.nomeMedicamento,
          dosagem: body.dosagem,
          preco: parseFloat(body.preco) || null,
        });
      res.json({
        status: "ok",
        newMedicamento: newMedicamento,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }

    /*
     #swagger.tags = ['Medicamento']
            #swagger.summary = 'Criar um novo medicamento'
            #swagger.description = 'Cria um novo medicamento com os dados fornecidos'
            #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/MedicamentoCreate"
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Residente criado com sucesso',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Medicamento" }
        }
      }
    }

    #swagger.security = [{
            "bearerAuth": []
    }] */
  }

  async putMedicamento(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID",
      });
      return;
    }

    const { nomeMedicamento, dosagem, preco } = req.body;
    if (!nomeMedicamento || !dosagem) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
      return;
    }

    try {
      const updatedMedicamento =
        await MedicamentoDataBaseService.updateDBMedicamento(
          {
            nomeMedicamento: nomeMedicamento,
            dosagem: dosagem,
            preco: preco || null,
          },
          parseInt(id),
        );
      res.json({
        status: "ok",
        updatedMedicamento: updatedMedicamento,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }

    /*
     #swagger.tags = ['Medicamento']
            #swagger.summary = 'Atualizar medicamento por ID'
            #swagger.description = 'Atualiza um medicamento com o ID fornecido'
             #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/MedicamentoCreate"
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Residente criado com sucesso',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Medicamento" }
        }
      }
    }

    #swagger.security = [{
            "bearerAuth": []
    }] */
  }

  async deleteMedicamento(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID",
      });
      return;
    }

    try {
      const response = await MedicamentoDataBaseService.deleteDBMedicamento(
        parseInt(id),
      );
      if (response) {
        res.json({
          status: "ok",
          message: "Medicamento deletado com sucesso",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
    /*
       #swagger.tags = ['Medicamento']
              #swagger.summary = 'Excluir medicamento por ID'
              #swagger.description = 'Exclui um medicamento com o ID fornecido.'
      #swagger.security = [{
              "bearerAuth": []
      }] */
  }
}

export default new MedicamentoController();
