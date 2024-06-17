import { Router } from "express";

import Alerta from "../controller/AlertaMedicamentoController";

const alerta = Router();
 alerta.get("/alertas", Alerta.getAlertas);
 alerta.get("/visualizarAlertas", Alerta.getVisualizarAlertas);
 alerta.put("/tomarmedicamento/:id", Alerta.updateMedicacaoPacienteTime);
 
 
 
 
    export default alerta;



