import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MedicamentoDataBaseService {
  constructor() {}

  async listDBMedicamentos() {
    try {
      return await prisma.medicamento.findMany();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getMedicamentoById(id: number) {
    try {
      const medicamento = await prisma.medicamento.findUnique({
        where: {
          idMedicamento: id,
        },
        include: {
          medicacaoPaciente: true,
        },
      });

      return medicamento;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getMedicamentoByNome(nome: string) {
    try {
      const residentes = await prisma.medicamento.findMany({
        where: {
          nomeMedicamento: {
            contains: nome.toLowerCase(),
          },
        },
        include: {
          
          medicacaoPaciente: {
            include: {
              profissional: {
                select: {
                  nome: true,
                },
              },
              residente: {
                select: {
                  nomeCompleto: true,
                },
              },
            },
          },
        },
      });

      return residentes;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async insertDBMedicamento(medicamento: Prisma.MedicamentoCreateInput) {
    try {
      const newMedicamento = await prisma.medicamento.create({
        data: medicamento,
      });
      return newMedicamento;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateDBMedicamento(
    medicamento: Prisma.MedicamentoUpdateInput,
    id: number,
  ) {
    try {
      const updatedMedicamento = await prisma.medicamento.update({
        data: medicamento,
        where: {
          idMedicamento: id,
        },
      });
      return updatedMedicamento;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteDBMedicamento(id: number) {
    try {
      await prisma.medicamento.delete({
        where: {
          idMedicamento: id,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new MedicamentoDataBaseService();
