import express from "express";
import ResidenteRouter from "./src/routes/ResidenteRoutes";
import ProfissionalRouter from "./src/routes/ProfissionalRoutes";
import MedicamentolRouter from "./src/routes/MedicamentoRoutes";
import MedicacaoPaciente from "./src/routes/MedicacaoPacienteRoutes";
import ConsultaRouter from "./src/routes/ConsultaRoutes";
import Login from "./src/routes/AuthRoutes";
import AlertaMedicamento from "./src/routes/AlertaMedicamentoRoutes";
import AlertaConsulta from "./src/routes/AlertaConsultaRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(cors());

app.use(ResidenteRouter);
app.use(ProfissionalRouter);
app.use(ConsultaRouter);
app.use(MedicamentolRouter);
app.use(MedicacaoPaciente);
app.use(Login);
app.use(AlertaMedicamento);
app.use(AlertaConsulta);
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const port = 3005;

app.get("/", function (req, res) {
  /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
  return res.json({
    status: "ok",
    messagem: "Requisição enviada com sucesso",
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log("Servidor rodando normalmente na porta " + port);
});
