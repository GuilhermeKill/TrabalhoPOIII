/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
import api from './api';

class MedicacaoPaciente {
  constructor(data) {
    this.idMedicacaoPaciente = data.idMedicacaoPaciente;
    this.idResidente = data.idResidente;
    this.idProfissional = data.idProfissional;
    this.idMedicamento = data.idMedicamento;
    this.quantidadeTempoHoras = data.quantidadeTempoHoras;
    this.quantidadeTempoDias = data.quantidadeTempoDias;
    this.viaAdministracao = data.viaAdministracao;
    this.dataMedicamentoInicio = new Date(data.dataMedicamentoInicio);
    this.observacao = data.observacao;
    this.nomeMedicamento = data.medicamento.nomeMedicamento;
  }
}

// eslint-disable-next-line import/prefer-default-export
export async function cadastrarMedicacaoPacienteApi(
  medicacaoPacienteData,
  successCallback,
  errorCallback,
) {
  const response = await api({
    uri: '/medicacaoPaciente',
    method: 'POST',
    body: {
      idMedicamento: parseInt(medicacaoPacienteData.idMedicamento, 10),
      idProfissional: 5,
      idResidente: parseInt(medicacaoPacienteData.idResidente, 10),
      quantidadeTempoHoras: parseInt(
        medicacaoPacienteData.quantidadeTempoHoras,
        10,
      ),
      quantidadeTempoDias: parseInt(
        medicacaoPacienteData.quantidadeTempoDias,
        10,
      ),
      viaAdministracao: medicacaoPacienteData.viaAdministracao,
      dataHoraInicioMedicamento:
        medicacaoPacienteData.dataHoraInicioMedicamento,
      observacao: medicacaoPacienteData.observacao,
    },
  });
  const data = await response.json();

  if (response.status !== 200 && response.status !== 201) {
    if (errorCallback) errorCallback();
    throw new Error(
      `Erro ao executar cadastrarMedicamentoApi. ${data.message}`,
    );
  }

  if (successCallback) successCallback(data.medicacaoPaciente);
}

export async function listarMedicacoesResidenteApi(
  idResidente,
  successCallback,
  errorCallback,
) {
  idResidente = parseInt(idResidente, 10);
  const response = await api({
    // uri: `/medicacaoPaciente/${idResidente}`,
    // uri: `/medicacaoPacientes`,
    uri: `/residente/${idResidente}`,
    method: 'GET',
  });
  const data = await response.json();

  if (response.status !== 200) {
    if (errorCallback) errorCallback();
    throw new Error(
      `Erro ao executar listarMedicacoesResidenteApi. ${data.message}`,
    );
  }

  if (successCallback)
    successCallback(
      data.residente.medicacaoPaciente.map(
        (data) => new MedicacaoPaciente(data),
      ),
      // data.medicacoesPaciente
      //   .filter((data) => data.idResidente == idResidente)
      //   .map((data) => new MedicacaoPaciente(data)),
    );
}

export async function deletarMedicacaoResidente(
  id,
  successCallback,
  errorCallback,
) {
  const response = await api({
    uri: `/medicacaoPaciente/${id}`,
    method: 'DELETE',
  });
  await response.json();

  if (response.status !== 200) {
    if (errorCallback) errorCallback();
    throw new Error(`Erro ao executar deletarMedicacaoResidente. ${response}`);
  }

  if (successCallback) successCallback();
}

// export async function atualizarMedicamentoApi(
//   medicamentoData,
//   successCallback,
//   errorCallback,
// ) {
//   const response = await api({
//     uri: `/medicamento/${medicamentoData.idMedicamento}`,
//     method: 'PUT',
//     body: {
//       nomeMedicamento: medicamentoData.nomeMedicamento,
//       dosagem: medicamentoData.dosagem,
//       preco: medicamentoData.preco,
//     },
//   });
//   const data = await response.json();

//   if (response.status !== 200) {
//     if (errorCallback) errorCallback();
//     throw new Error(`Erro ao executar atualizarMedicamentoApi. ${response}`);
//   }

//   if (successCallback) successCallback(data);
// }

// export async function getMedicamentoApi(id, successCallback, errorCallback) {
//   const response = await api({
//     uri: `/medicamento/${id}`,
//     method: 'GET',
//   });
//   const data = await response.json();

//   if (response.status !== 200) {
//     if (errorCallback) errorCallback();
//     throw new Error(`Erro ao executar getMedicamentoApi(${id}). ${response}`);
//   }

//   if (successCallback) successCallback(new Medicamento(data.medicamento));
// }
