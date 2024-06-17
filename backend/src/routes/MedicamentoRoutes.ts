import { Router } from "express";

import { PrismaClient } from "@prisma/client";
import MedicamentoController from "../controller/MedicamentoController";
import authori from "../middlewares/autorizacao";

const prisma = new PrismaClient();

const MedicamentoRouter = Router();

MedicamentoRouter.get("/medicamentos", authori, MedicamentoController.getMedicamentos);

MedicamentoRouter.get("/medicamento/:id", authori, MedicamentoController.getMedicamentoById);

MedicamentoRouter.get("/medicamneto/nome", authori, MedicamentoController.getResidenteByNome,
);

MedicamentoRouter.post("/medicamento", authori, MedicamentoController.postMedicamento);

MedicamentoRouter.put("/medicamento/:id", authori, MedicamentoController.putMedicamento);

MedicamentoRouter.delete("/medicamento/:id", authori, MedicamentoController.deleteMedicamento);

export default MedicamentoRouter;
