import { Router } from "express";

import { PrismaClient } from "@prisma/client";
import ResidenteController from "../controller/ResidenteController";
import authori from "../middlewares/autorizacao";

const prisma = new PrismaClient();

const ResidenteRouter = Router();

ResidenteRouter.get("/residentes", authori, ResidenteController.getResidentes);

ResidenteRouter.get("/residente/:id", authori, ResidenteController.getResidenteById);

ResidenteRouter.get("/residentenome/nome", authori, ResidenteController.getResidenteByNome);

ResidenteRouter.post("/residente", authori, ResidenteController.postResidente);

ResidenteRouter.put("/residente/:id", authori, ResidenteController.putResidente);

ResidenteRouter.delete("/residente/:id", authori, ResidenteController.deleteResidente);

export default ResidenteRouter;
