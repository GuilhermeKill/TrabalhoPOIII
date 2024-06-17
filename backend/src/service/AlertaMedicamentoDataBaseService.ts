import { PrismaClient } from "@prisma/client";
import ComparadorDiaHoras from "../utils/ComparadorDiaHoras";
import MedicacaoPacienteDataBaseService from "./MedicacaoPacienteDataBaseService";

const prisma = new PrismaClient();

class AlertaMedicamentoDataBaseService {
  constructor() {}

  async listDBAlertaMedicacoesPaciente() {
    try {
      const medicacoes =
        await MedicacaoPacienteDataBaseService.listDBMedicacoesPaciente();

      return (medicacoes ?? [])
        .map((medicacao) => {
          if (!medicacao) return undefined;
          const diaHoraMinistrado = ComparadorDiaHoras.compare(
            medicacao.dataHoraMinistrado,
          );

          if (
            diaHoraMinistrado.segundos >= medicacao.quantidadeTempoHoras &&
            diaHoraMinistrado.dias < medicacao.quantidadeTempoDias
          ) {
           return this.dadosAlertaMedicacaoPaciente(medicacao);
           
          }
        })
        .filter(Boolean);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async listDBVisualizarAlertaMedicacoesPaciente() {
    try {
      const medicacoes =
        await MedicacaoPacienteDataBaseService.listDBMedicacoesPaciente();

      return (medicacoes ?? [])
        .map((medicacao) => {
          if (!medicacao) return undefined;
          const tempoDecorrido = ComparadorDiaHoras.compare(
            medicacao.dataHoraMinistrado,
          );
          

          if (tempoDecorrido.dias < medicacao.quantidadeTempoDias) {
            return this.dadosAlertaMedicacaoPaciente(medicacao)
          }
        })
        .filter(Boolean);
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  async updateDBTomarMedicamentoTime(id: number) {
    try {
      const currentMedicacao = await prisma.medicacaoPaciente.findUnique({
        where: {
          idMedicacaoPaciente: id,
        },
        select: {
          dataHoraMinistrado: true,
        },
      });

      if (!currentMedicacao) {
        throw new Error("Medicação não encontrada");
      }

      const currentDate = new Date(currentMedicacao.dataHoraMinistrado);
      const now = new Date();
      currentDate.setHours(now.getHours());
      currentDate.setMinutes(now.getMinutes());
      currentDate.setSeconds(now.getSeconds());

      return await prisma.medicacaoPaciente.update({
        data: {
          dataHoraMinistrado: currentDate,
        },
        where: {
          idMedicacaoPaciente: id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  private dadosAlertaMedicacaoPaciente(medicacao: any) {
    const tempoDecorrido = ComparadorDiaHoras.compare(
      medicacao.dataHoraMinistrado,
    );

      return {
        idMedicacaoResidente: medicacao.idMedicacaoPaciente,
        residenteNome: medicacao.residente.nomeCompleto,
        medicamentoNome: medicacao.medicamento.nomeMedicamento,
        viaAdministracao: medicacao.viaAdministracao,
        ministraEmHora: medicacao.quantidadeTempoHoras,
        durantQuantDia: medicacao.quantidadeTempoDias,
        datahoraInicioMedicamento: medicacao.dataHoraMinistrado,
        tempoDecorrido,
      };
    }

  
}




export default new AlertaMedicamentoDataBaseService();
