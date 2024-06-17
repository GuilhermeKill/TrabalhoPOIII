import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv-safe";
dotenv.config();

const jwt = {
  secret: process.env.JWT_SECRET || "091",
};

const prisma = new PrismaClient();

class AuthBaseService {
  constructor() {}

  async email(email: string, senha: string) {
    try {
      const profissional = await prisma.profissional.findUnique({
        where: {
          email: email,
        },
      });

      if (!profissional) {
        return { success: false, message: "Profissional não encontrado." };
      }

      const senhaCorreta = await bcrypt.compare(senha, profissional.senha);

      if (!senhaCorreta) {
        return { success: false, message: "Senha incorreta." };
      }

      const usuario = {
        id: profissional.idProfissional,
        nome: profissional.nome,
        nivelAcesso: profissional.nivelAcesso,
      };

      const token = sign(usuario, jwt.secret, {
        expiresIn: "30m",
      });

      return {
        profissional: profissional,
        success: true,
        token: token,
        message: "Login bem sucedido.",
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Erro ao realizar email." };
    }
  }

  async logout() {
    // Lógica para logout, se necessário
  }
}

export default new AuthBaseService();
