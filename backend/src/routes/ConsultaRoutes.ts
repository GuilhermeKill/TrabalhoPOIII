import { Router } from "express";

import ConsultaController from "../controller/ConsultaController";
import authori from "../middlewares/autorizacao";


const  ConsultaRouter = Router();

 ConsultaRouter.get("/consultas",authori, ConsultaController.getConsultas);

 ConsultaRouter.get("/consulta/:id",authori, ConsultaController.getConsultaById);

 ConsultaRouter.post("/consulta", authori, ConsultaController.postConsulta);

 ConsultaRouter.put("/consulta/:id", authori, ConsultaController.putConsulta);

 ConsultaRouter.delete("/consulta/:id",authori, ConsultaController.deleteConsulta);

export default  ConsultaRouter;
