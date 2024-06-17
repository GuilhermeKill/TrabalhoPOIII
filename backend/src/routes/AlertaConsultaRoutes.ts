import { Router } from "express";

import Alerta from "../controller/AlertaConsultaController";

const alerta = Router();
alerta.get("/alertasconsultas", Alerta.getAlertas);
alerta.get("/visualizaralertasconsultas", Alerta.getVisualizarAlertasConsulta);
alerta.put("/compareceuconsulta/:id", Alerta.updateMedicacaoPacienteTime);

export default alerta;
