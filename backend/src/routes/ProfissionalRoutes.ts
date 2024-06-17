import { Router } from "express";

import { PrismaClient } from "@prisma/client";
import ProfissionalController from "../controller/ProfissionalController";
import authori from "../middlewares/autorizacao";

const prisma = new PrismaClient();

const ProfissionalRouter = Router();

ProfissionalRouter.get(
  "/profissionais",
  authori,
  ProfissionalController.getProfissional,
);

ProfissionalRouter.get(
  "/profissional/:id",
  authori,
  ProfissionalController.getProfissionalById,
);

ProfissionalRouter.post(
  "/profissional",
  ProfissionalController.postProfissional,
);

ProfissionalRouter.put(
  "/profissional/:id",
  authori,
  ProfissionalController.putProfissional,
);

ProfissionalRouter.delete(
  "/profissional/:id",
  authori,
  ProfissionalController.deleteProfissional,
);

ProfissionalRouter.get(
  "/profissionalnome/nome",
  authori,
  ProfissionalController.getProfissionalByNome,
);

export default ProfissionalRouter;
