import { Request, Response } from "express";
import ResidenteDataBaseService from "../service/ResidenteDataBaseService";

class ResidenteController {
  constructor() {}

  async getResidentes(req: Request, res: Response) {
    try {
      const residentes = await ResidenteDataBaseService.listDBResidentes();
      res.json({
        status: "ok",
        residentes: residentes,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }

    /*
       
  
  #swagger.tags = ['Residente']
   #swagger.security = [{
            "bearerAuth": []
    }]

    #swagger.summary = 'Obter lista de residentes'
    #swagger.description = 'Recupera uma lista de todos os residentes'
    #swagger.responses[200] = {
      description: 'Uma lista de residentes',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Residente" }
          }
        }
      }
    }}
    */
  }

  async getResidenteById(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      res.status(500).json({
        status: 500,
        message: "Id do usuário não encontrado",
      });
      return;
    }

    try {
      const residente = await ResidenteDataBaseService.getResidenteById(
        parseInt(id),
      );

      if (!residente) {
        res.status(404).json({
          status: 404,
          message: "Residente não encontrado",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        residente: residente,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao buscar o residente",
      });
    }
    /*
     #swagger.security = [{
            "bearerAuth": []
    }]
   #swagger.tags = ['Residente']
          #swagger.summary = 'Obter  residentes por ID'
          #swagger.description = 'Recupera um  residente por ID '
           #swagger.responses[200] = {
      description: 'Uma lista de residentes',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Residente" }
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
      const residentes = await ResidenteDataBaseService.getResidenteByNome(
        nome as string,
      );

      if (!residentes || residentes.length === 0) {
        res.status(404).json({
          status: 404,
          message: "Residente não encontrado",
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
        message: "Erro ao buscar o residente",
      });
    }

    /*
      #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.tags = ['Residente']
    #swagger.summary = 'Obter residentes por nome'
    #swagger.description = 'Recupera residentes cujo nome contém os caracteres fornecidos'
    #swagger.Request body[200] = {
      description: 'buscar Uma residentes',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Residente" }
          }
        }
      }
    }}
    
   */
  }



  async postResidente(req: Request, res: Response) {
    const body = req.body;

    if (!body.nomeCompleto || !body.dataNascimento) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
      return;
    }

    try {
      // Converter a data de nascimento para o formato ISO 8601
      const dataNascimento = new Date(body.dataNascimento);
      if (isNaN(dataNascimento.getTime())) {
        throw new Error("Data de nascimento inválida");
      }

      const newResidente = await ResidenteDataBaseService.insertDBResidente({
        nomeCompleto: body.nomeCompleto,
        dataNascimento: dataNascimento,
        documentoIdentificacao: body.documentoIdentificacao || null,
      });
      res.json({
        status: "ok",
        newResidente: newResidente,
      });
    } catch (error: unknown) {
      // Verificação de tipo para error
      if (error instanceof Error) {
        res.json({
          status: "error",
          message: error.message,
        });
      } else {
        res.json({
          status: "error",
          message: "Ocorreu um erro desconhecido",
        });
      }
    }

    /*
     #swagger.tags = ['Residente']
     #swagger.summary = 'Criar um novo residente'
     #swagger.description = 'Cria um novo residente com os dados fornecidos'
     #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResidenteCreate"
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Residente criado com sucesso',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Residente" }
        }
      }
    }

     #swagger.security = [{
       "bearerAuth": []
     }] 
    */
  }

  async putResidente(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID",
      });
      return;
    }

    const {
      nomeCompleto,
      dataNascimento,
      documentoIdentificacao,
      alergias,
      medicamentos,
    } = req.body;
    if (!nomeCompleto || !dataNascimento) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
      return;
    }

    try {
      const updatedResidente = await ResidenteDataBaseService.updateDBResidente(
        {
          nomeCompleto: nomeCompleto,
          dataNascimento: dataNascimento,
          documentoIdentificacao: documentoIdentificacao || null,
        },
        parseInt(id),
      );
      res.json({
        status: "ok",
        updatedResidente: updatedResidente,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }

    /*
     #swagger.tags = ['Residente']
            #swagger.summary = 'Atualizar residente por ID'
            #swagger.description = 'Atualiza um residente com o ID fornecido'
           #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResidenteCreate"
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Residente criado com sucesso',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Residente" }
        }
      }
    }
    #swagger.security = [{
            "bearerAuth": []
    }] */
  }

  async deleteResidente(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID",
      });
      return;
    }

    try {
      const response = await ResidenteDataBaseService.deleteDBResidente(
        parseInt(id),
      );
      if (response) {
        res.json({
          status: "ok",
          message: "Residente deletado com sucesso",
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
       #swagger.tags = ['Residente']
              #swagger.summary = 'Excluir residente por ID'
              #swagger.description = 'Exclui um residente com o ID fornecido.'
      #swagger.security = [{
              "bearerAuth": []
      }] */
  }
}

export default new ResidenteController();
