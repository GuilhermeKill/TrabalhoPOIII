import { Request, Response } from "express";
import AuthBaseService from "../service/AuthDataBaseService";

class AuthController {
  async email(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        status: 400,
        message: "Por favor, forneça email e senha. ",
      });
    }

    try {
      const emailResponse = await AuthBaseService.email(email, senha);

      if (!emailResponse.success) {
        return res.status(401).json({
          status: 401,
          message: emailResponse.message,
        });
      }

      res.status(200).json({
        auth: true,
        status: 200,
        ...emailResponse,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao realizar email.",
      });
    }
    /*
     #swagger.tags = ['Autenticação']
            #swagger.summary = 'Login do Profissional '
            #swagger.description = 'Profissional loga com (Login e senha ).'
             #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/AutenticacaoLogin"
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Profissional Logado com sucesso',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Autenticacao" }
        }
      }
    }
    */
  }

  async logout(req: Request, res: Response) {
    try {
      await AuthBaseService.logout();
      res
        .status(200)
        .json({ auth: false, token: null, message: "Logout bem sucedido." });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Erro ao realizar logout.",
      });
    }
    /*
     #swagger.tags = ['Autenticação']
            #swagger.summary = 'Logout do Sistema '
            #swagger.description = 'Profissional sai do Sistema ).'
    */
  }
}

export default new AuthController();
