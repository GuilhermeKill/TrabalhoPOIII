import { Request, Response } from "express";
import AlertaMedicamentoBaseService from "../service/AlertaMedicamentoDataBaseService";

class AlertaMedicamentoController {
  async getAlertas(req: Request, res: Response) {
    try {
      const alertaResponse =
        await AlertaMedicamentoBaseService.listDBAlertaMedicacoesPaciente();

      if (alertaResponse === null) {
        return res.status(500).json({
          status: 500,
          message: "Erro ao Buscar de alertas. Resposta nula do serviço.",
        });
      }

      res.status(200).json({
        auth: true,
        status: 200,
        alertaResponse: alertaResponse,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao realizar Buscar de Alertas",
      });
    }
    /*
     #swagger.tags = ['AlertasMedicamentos']
            #swagger.summary = 'Alertas para hora de tomar medicamento'
            #swagger.description = 'Dispara um alerta avisando quando um residete não toma remedio.'
             #swagger.responses[200] = {
      description: 'Visualizar  alerta',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/AlertaMedicamento" }
          }
        }
      }
    }}
    */
  }
  
  async getVisualizarAlertas(req: Request, res: Response) {
    try {
      const alertas =
        await AlertaMedicamentoBaseService.listDBVisualizarAlertaMedicacoesPaciente();

      if (alertas === null) {
        return res.status(500).json({
          status: 500,
          message: "Erro ao Buscar de alertas. Resposta nula do serviço.",
        });
      }

      res.status(200).json({
        auth: true,
        status: 200,
        alertas: alertas,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao realizar Buscar de Alertas.",
      });
    }
    /*
     #swagger.tags = ['AlertasMedicamentos']
            #swagger.summary = 'Visualizar Alertas para hora de tomar medicamento'
            #swagger.description = 'Visualizar  alerta avisando quando um residete não toma remedio.'
             #swagger.responses[200] = {
      description: 'Visualizar  alerta',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/AlertaMedicamento" }
          }
        }
      }
    }}
    */
  }

  async updateMedicacaoPacienteTime(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({
        status: 400,
        message: "Id da medicação do paciente não fornecido",
      });
      return;
    }

    try {
      const updatedMedicacaoPaciente =
        await AlertaMedicamentoBaseService.updateDBTomarMedicamentoTime(
          parseInt(id),
        );

      if (!updatedMedicacaoPaciente) {
        res.status(404).json({
          status: 404,
          message: "Medicação Ministra não encontrada",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        message: "Medicamentro misnistrado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao atualizar a medicação do paciente",
      });
    }

    /*
     #swagger.tags = ['AlertasMedicamentos']
            #swagger.summary = 'Atualizar hora da medicação de paciente por ID'
            #swagger.description = 'Atualiza a hora da medicação de paciente com o ID fornecido para a hora atual do sistema'
           
   
    }] */
  }
}

export default new AlertaMedicamentoController();
