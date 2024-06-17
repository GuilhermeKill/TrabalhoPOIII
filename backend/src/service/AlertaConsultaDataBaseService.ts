import { PrismaClient } from "@prisma/client";
import ComparadorDiaHoras from "../utils/ComparadorDiaHoras";
import MedicacaoPacienteDataBaseService from "./ConsultaDataBaseService";

const prisma = new PrismaClient();

class AlertaMedicamentoDataBaseService {
  constructor() {}

  async listDBAlertaConsultaPaciente() {
    const DIA_CONSULTA = 25;
    const COMPARECEU_CONSULTA = "SIM";
    try {
      const consultas =
        await MedicacaoPacienteDataBaseService.listDBConsultas();

      return (consultas ?? [])
        .map((consulta) => {
          if (!consulta) return undefined;
          const tempoProxiConsulta = ComparadorDiaHoras.compare(
            consulta.dataHora,
          );


          if (
            tempoProxiConsulta.segundos <= DIA_CONSULTA &&
            consulta.compareceu.toUpperCase() !== COMPARECEU_CONSULTA
          ) {
            return this.dadosAlertaCosultaPaciente(consulta);
          }
        })
        .filter(Boolean);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async listDBVisualizarAlertaConsultaPaciente() {
    const COMPARECEU_CONSULTA = "SIM";
    try {
      const consultas =
        await MedicacaoPacienteDataBaseService.listDBConsultas();

      return (consultas ?? [])
        .map((consulta) => {
          if (!consulta) return undefined;
          const tempoProxiConsulta = ComparadorDiaHoras.compare(
            consulta.dataHora,
          );


          if (consulta.compareceu.toUpperCase() !== COMPARECEU_CONSULTA) {
            return this.dadosAlertaCosultaPaciente(consulta);
          }
        })
        .filter(Boolean);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateDBCompareceuconsulta(id: number) {
      const compareceu = "sim";
    try {
      const currentConsulta = await prisma.consulta.findUnique({
        where: {
          idConsulta: id,
        },
        select: {
          compareceu: true,
        },
      });

      if (!currentConsulta) {
        throw new Error("Consulta não encontrada");
      }


      return await prisma.consulta.update({
        data: {
          compareceu: compareceu,
        },
        where: {
          idConsulta: id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  private dadosAlertaCosultaPaciente(consulta: any) {
    const tempoProxiConsulta = ComparadorDiaHoras.compare(consulta.dataHora);

    return {
      idConsulta: consulta.idConsulta,
      residenteNome: consulta.residente.nomeCompleto,
      nomeMedico: consulta.nomeMedico,
      tipoConsulta: consulta.tipoConsulta,
      diaHoraConsulta: consulta.dataHora,
      observacao: consulta.observacao,
      compareceu: consulta.compareceu,
      tempoProxiConsulta,
    };
  }
}

export default new AlertaMedicamentoDataBaseService();
