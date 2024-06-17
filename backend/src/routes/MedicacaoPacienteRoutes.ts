import { Router } from "express";

import MedicacaoPacienteController from "../controller/MedicacaoPacienteController";
import authori from "../middlewares/autorizacao";

const MedicacaoPacienteRouter = Router();

MedicacaoPacienteRouter.get(
  "/medicacaoPacientes",
  authori,
  MedicacaoPacienteController.getMedicacoesPaciente,
);

MedicacaoPacienteRouter.get(
  "/medicacaoPaciente/:id",
  authori,
  MedicacaoPacienteController.getMedicacaoPacienteById,
);

MedicacaoPacienteRouter.post(
  "/medicacaoPaciente",
  authori,
  MedicacaoPacienteController.postMedicacaoPaciente,
);

MedicacaoPacienteRouter.put(
  "/medicacaoPaciente/:id",
  authori,
  MedicacaoPacienteController.putMedicacaoPaciente,
);

MedicacaoPacienteRouter.delete(
  "/medicacaoPaciente/:id",
  authori,
  MedicacaoPacienteController.deleteMedicacaoPaciente,
);

export default MedicacaoPacienteRouter;
