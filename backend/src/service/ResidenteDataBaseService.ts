import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ResidenteDataBaseService {
  constructor() {}

  async listDBResidentes() {
    try {
      return await prisma.residente.findMany();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getResidenteById(id: number) {
    try {
      const residente = await prisma.residente.findUnique({
        where: {
          idResidente: id,
        },
        include: {
          consultas: {
            include: {
              profissional: {
                select: {
                  nome: true,
                },
              },
            },
          },
          medicacaoPaciente: {
            include: {
              profissional: {
                select: {
                  nome: true,
                },
              },
              medicamento: {
                select: {
                  nomeMedicamento: true,
                },
              },
            },
          },
        },
      });

      return residente;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getResidenteByNome(nome: string) {
    try {
      const residentes = await prisma.residente.findMany({
        where: {
          nomeCompleto: {
            contains: nome.toLowerCase(),
          },
        },
        include: {
          consultas: {
            include: {
              profissional: {
                select: {
                  nome: true,
                },
              },
            },
          },

          medicacaoPaciente: {
            include: {
              profissional: {
                select: {
                  nome: true,
                },
              },
              medicamento: {
                select: {
                  nomeMedicamento: true,
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

  async insertDBResidente(residente: Prisma.ResidenteCreateInput) {
    try {
      const newResidente = await prisma.residente.create({
        data: residente,
      });
      return newResidente;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateDBResidente(residente: Prisma.ResidenteUpdateInput, id: number) {
    try {
      const updatedResidente = await prisma.residente.update({
        data: residente,
        where: {
          idResidente: id,
        },
      });
      return updatedResidente;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteDBResidente(id: number) {
    try {
      await prisma.residente.delete({
        where: {
          idResidente: id,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new ResidenteDataBaseService();
