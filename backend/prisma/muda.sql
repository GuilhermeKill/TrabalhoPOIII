 CREATE TABLE [dbo].[Residente](
	[IdResidente] [bigint] IDENTITY(1,1) NOT NULL,
	[NomeResidente] [nvarchar](250) NOT NULL,
	[SobrenomeResidente] [nvarchar](250) NOT NULL,
	[DataNascimento] [datetime] NOT NULL,
	[DocumentoIdentificacao] [nchar](11) NOT NULL,
 CONSTRAINT [PK_Residente] PRIMARY KEY CLUSTERED 
(


CREATE TABLE [dbo].[Profissional](
	[IdProfissional] [bigint] IDENTITY(1,1) NOT NULL,
	[NomeProfissional] [nvarchar](max) NOT NULL,
	[CPF] [nvarchar](11) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[senha] [nvarchar](max) NOT NULL,
	[IdFuncao] [bigint] NOT NULL,
	[IdNivelAcesso] [bigint] NOT NULL,
 CONSTRAINT [PK_Profissional
 
CREATE TABLE [dbo].[MedicacaoPaciente](
	[IdMedicacaoPaciente] [bigint] IDENTITY(1,1) NOT NULL,
	[IdResidente] [bigint] NOT NULL,
	[IdMedicamento] [bigint] NOT NULL,
	[IdViaAdministracao] [bigint] NOT NULL,
	[DataMedicamento] [datetime] NOT NULL,
	[Observacao] [nvarchar](max) NULL,
 CONSTRAINT [PK_MedicacaoPaciente] PRIMARY KEY CLUSTERED 

 CREATE TABLE [dbo].[Medicamento](
	[IdMedicamento] [bigint] IDENTITY(1,1) NOT NULL,
	[NomeMedicamento] [nvarchar](500) NOT NULL,
	[Dosagem] [nvarchar](100) NOT NULL,
	[Preco] [decimal](18, 2) NULL,
 CONSTRAINT [PK_Medicamento] PRIMARY KEY CLUSTERED 


    CREATE TABLE [dbo].[Consulta](
	[IdConsulta] [bigint] IDENTITY(1,1) NOT NULL,
	[IdMedico] [bigint] NOT NULL,
	[IdResidente] [bigint] NOT NULL,
	[DataConsulta] [datetime] NOT NULL,
	[TipoConsulta] [nvarchar](max) NOT NULL,
	[Observacao] [nvarchar](max) NOT NULL,
	[Compareceu] [bit] NOT NULL,
 CONSTRAINT [PK_Consulta] PRIMARY KEY CLUSTERED 
(