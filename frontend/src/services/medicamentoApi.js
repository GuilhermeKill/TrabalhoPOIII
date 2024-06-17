import api from './api';

class Medicamento {
  constructor(data) {
    this.idMedicamento = data.idMedicamento;
    this.nomeMedicamento = data.nomeMedicamento;
    this.dosagem = data.dosagem;
    this.preco = data.preco;
  }
}

export async function cadastrarMedicamentoApi(
  medicamentoData,
  successCallback,
  errorCallback,
) {
  const response = await api({
    uri: '/medicamento',
    method: 'POST',
    body: {
      nomeMedicamento: medicamentoData.nomeMedicamento,
      dosagem: medicamentoData.dosagem,
      preco: parseFloat(medicamentoData.preco),
    },
  });
  const data = await response.json();

  if (response.status !== 200) {
    if (errorCallback) errorCallback();
    throw new Error(`Erro ao executar cadastrarMedicamentoApi. ${response}`);
  }

  if (successCallback) successCallback(data);
}

export async function atualizarMedicamentoApi(
  medicamentoData,
  successCallback,
  errorCallback,
) {
  const response = await api({
    uri: `/medicamento/${medicamentoData.idMedicamento}`,
    method: 'PUT',
    body: {
      nomeMedicamento: medicamentoData.nomeMedicamento,
      dosagem: medicamentoData.dosagem,
      preco: parseFloat(medicamentoData.preco),
    },
  });
  const data = await response.json();

  if (response.status !== 200) {
    if (errorCallback) errorCallback();
    throw new Error(`Erro ao executar atualizarMedicamentoApi. ${response}`);
  }

  if (successCallback) successCallback(data);
}

export async function listarMedicamentosApi(successCallback, errorCallback) {
  const response = await api({
    uri: '/medicamentos',
    method: 'GET',
  });
  const data = await response.json();

  if (response.status !== 200) {
    if (errorCallback) errorCallback();
    throw new Error(`Erro ao executar listarMedicamentosApi. ${response}`);
  }

  if (successCallback)
    successCallback(data.medicamentos.map((med) => new Medicamento(med)));
}

export async function getMedicamentoApi(id, successCallback, errorCallback) {
  const response = await api({
    uri: `/medicamento/${id}`,
    method: 'GET',
  });
  const data = await response.json();

  if (response.status !== 200) {
    if (errorCallback) errorCallback();
    throw new Error(`Erro ao executar getMedicamentoApi(${id}). ${response}`);
  }

  if (successCallback) successCallback(new Medicamento(data.medicamento));
}

export async function deletarMedicamento(id, successCallback, errorCallback) {
  const response = await api({
    uri: `/medicamento/${id}`,
    method: 'DELETE',
  });
  await response.json();

  if (response.status !== 200) {
    if (errorCallback) errorCallback();
    throw new Error(`Erro ao executar deletarMedicamento. ${response}`);
  }

  if (successCallback) successCallback();
}
