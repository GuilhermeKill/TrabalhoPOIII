-- CreateTable
CREATE TABLE "Residente" (
    "idResidente" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCompleto" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "documentoIdentificacao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Profissional" (
    "idProfissional" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nivelAcesso" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Consulta" (
    "idConsulta" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataHora" DATETIME NOT NULL,
    "tipoConsulta" TEXT NOT NULL,
    "nomeMedico" TEXT NOT NULL,
    "compareceu" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "residenteId" INTEGER NOT NULL,
    "profissionalId" INTEGER NOT NULL,
    CONSTRAINT "Consulta_residenteId_fkey" FOREIGN KEY ("residenteId") REFERENCES "Residente" ("idResidente") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Consulta_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("idProfissional") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Medicamento" (
    "idMedicamento" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeMedicamento" TEXT NOT NULL,
    "dosagem" TEXT NOT NULL,
    "preco" REAL
);

-- CreateTable
CREATE TABLE "MedicacaoPaciente" (
    "idMedicacaoPaciente" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idResidente" INTEGER NOT NULL,
    "idMedicamento" INTEGER NOT NULL,
    "idProfissional" INTEGER NOT NULL,
    "quantidadeTempoHoras" INTEGER NOT NULL,
    "quantidadeTempoDias" INTEGER NOT NULL,
    "viaAdministracao" TEXT NOT NULL,
    "dataHoraMinistrado" DATETIME NOT NULL,
    "dataMedicamentoInicio" DATETIME NOT NULL,
    "observacao" TEXT,
    CONSTRAINT "MedicacaoPaciente_idResidente_fkey" FOREIGN KEY ("idResidente") REFERENCES "Residente" ("idResidente") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MedicacaoPaciente_idMedicamento_fkey" FOREIGN KEY ("idMedicamento") REFERENCES "Medicamento" ("idMedicamento") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MedicacaoPaciente_idProfissional_fkey" FOREIGN KEY ("idProfissional") REFERENCES "Profissional" ("idProfissional") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Profissional_email_key" ON "Profissional"("email");
