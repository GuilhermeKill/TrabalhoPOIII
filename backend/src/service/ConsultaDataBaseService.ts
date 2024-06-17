
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ConsultaDataBaseService {
  constructor() {}

  async listDBConsultas() {
    try {
      return await prisma.consulta.findMany({
        include: {
          residente: {
            select: {
              nomeCompleto: true,
              idResidente: true,
            },
          },
          profissional: {
            select: {
              nome: true,
              idProfissional: true,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getConsultaById(id: number) {
    try {
      return await prisma.consulta.findUnique({
        where: {
          idConsulta: id,
        },
        include: {
          residente: true,
          profissional: true,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async insertDBConsulta(consulta: Prisma.ConsultaCreateInput) {
    try {
      return await prisma.consulta.create({
        data: consulta,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateDBConsulta(consulta: Prisma.ConsultaUpdateInput, id: number) {
    try {
      const updatedIdoso = await prisma.consulta.update({
        data: consulta,
        where: {
          idConsulta: id,
        },
      });
      return updatedIdoso;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteDBConsulta(id: number) {
    try {
      await prisma.consulta.delete({
        where: {
          idConsulta: id,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new ConsultaDataBaseService();
