import api from './api';

class Residente {
  // constructor(
  //   nome,
  //   sobrenome,
  //   dataNascimento,
  //   documento,
  //   historicoMedico,
  //   alergias,
  // ) {
  //   this.nome = nome;
  //   this.sobrenome = sobrenome;
  //   this.dataNascimento = dataNascimento;
  //   this.documento = documento;
  //   this.historicoMedico = historicoMedico;
  //   this.alergias = alergias;
  // }

  constructor(data) {
    const date = new Date(data.dataNascimento);
    const day = date.getUTCDate().toString().padStart(2, 0);
    const month = (date.getUTCMonth() + 1).toString().padStart(2, 0);
    const year = date.getUTCFullYear();

    this.id = data.idResidente;
    this.nome = data.nomeCompleto;
    // this.dataNascimento = `${day}/${month}/${year}`;
    this.dataNascimento = `${year}-${month}-${day}`;
    this.documento = data.documentoIdentificacao;
    this.historicoMedico = data.historicoMedico;
    this.alergias = data.alergias;
  }
}

export async function cadastrarResidenteApi(
  residenteData,
  successCallback,
  errorCallback,
) {
  const response = await api({
    uri: '/residente',
    method: 'POST',
    body: {
      nomeCompleto: residenteData.nome,
      dataNascimento: residenteData.dataNascimento,
      documentoIdentificacao: residenteData.documento,
      historicoMedico: residenteData.historicoMedico,
      alergias: residenteData.alergias,
    },
  });
  const data = await response.json();

  if (response.status !== 200) {
    if (errorCallback) errorCallback();
    throw new Error(`Erro ao executar cadastrarResidente. ${response}`);
  }

  if (successCallback) successCallback(data);
}

export async function atualizarResidenteApi(
  residenteData,
  successCallback,
  errorCallback,
) {
  const response = await api({
    uri: `/residente/${residenteData.id}`,
    method: 'PUT',
    body: {
      nomeCompleto: residenteData.nome,
      dataNascimento: residenteData.dataNascimento,
      documentoIdentificacao: residenteData.documento,
      historicoMedico: residenteData.historicoMedico,
      alergias: residenteData.alergias,
    },
  });
  const data = await response.json();

  if (response.status !== 200) {
    if (errorCallback) errorCallback();
    throw new Error(`Erro ao executar atualizarResidenteApi. ${response}`);
  }

  if (successCallback) successCallback(data);
}

export async function listarResidentesApi(successCallback, errorCallback) {
  const response = await api({
    uri: '/residentes',
    method: 'GET',
  });
  const data = await response.json();

  if (response.status !== 200) {
    if (errorCallback) errorCallback();
    throw new Error(`Erro ao executar listarResidentes. ${response}`);
  }

  if (successCallback)
    successCallback(
      data.residentes.map((residente) => new Residente(residente)),
    );
}

export async function getResidenteApi(id, successCallback, errorCallback) {
  const response = await api({
    uri: `/residente/${id}`,
    method: 'GET',
  });
  const data = await response.json();

  if (response.status !== 200) {
    if (errorCallback) errorCallback();
    throw new Error(`Erro ao executar getResidenteApi(${id}). ${response}`);
  }

  if (successCallback) successCallback(new Residente(data.residente));
}

export async function deletarResidente(id, successCallback, errorCallback) {
  const response = await api({
    uri: `/residente/${id}`,
    method: 'DELETE',
  });
  await response.json();

  if (response.status !== 200) {
    if (errorCallback) errorCallback();
    throw new Error(`Erro ao executar deletarResidente. ${response}`);
  }

  if (successCallback) successCallback();
}
