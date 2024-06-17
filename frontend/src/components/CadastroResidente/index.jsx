import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import styles from './CadastroResidente.module.css';
import { cadastrarResidenteApi } from '../../services/residentesApi';
import SuccessModal from '../Modal/SuccessModal.jsx';
import FailedModal from '../Modal/FailedModal.jsx';
import DividerBold from '../Misc/DividerBold.jsx';

export default function CadastroResidente({
  atualizarCadastroId,
  onCadastroCompleted,
}) {
  // Nome
  const [nome, setNome] = useState('');
  const [nomeError, setNomeError] = useState(false);

  // Sobrenome
  // const [sobrenome, setSobrenome] = useState('');
  // const [sobrenomeError, setSobrenomeError] = useState(false);

  // Data de Nascimento
  const [dataNascimento, setDataNascimento] = useState('');
  const [dataNascimentoError, setDataNascimentoError] = useState(false);

  // Documento
  const [documento, setDocumento] = useState('');
  const [documentoError, setDocumentoError] = useState(false);

  // Observacoes
  const [historicoMedico, setHistoricoMedico] = useState('');
  const [alergias, setAlergias] = useState('');

  // Modal concluido
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // Verifica se o componente está em modo de atualização
  const modoAtualizacao = atualizarCadastroId != null;

  // Efeito para preencher os campos quando em modo de atualização
  useEffect(() => {
    console.log(
      `atualizarCadastroId: ${atualizarCadastroId} | modoAtualizacao: ${modoAtualizacao}`,
    );
    if (modoAtualizacao) {
      setNome(atualizarCadastroId.toString());
    }
  }, [atualizarCadastroId, modoAtualizacao]);

  // Validações
  const setDocumentoValido = (value) => {
    setDocumento(value.replace(/\D/g, '').slice(0, 11));
  };

  const getNomeValidado = (value) => {
    return value.replace(/[0-9]/g, '');
  };

  const isDocumentoValido = (value) => {
    return value.length === 11;
  };

  const isDataNascimentoValido = (value) => {
    const currentDate = new Date();
    const selectedDate = new Date(value);
    const anoNaoFuturo = selectedDate <= currentDate;
    const anoNaoPassado = selectedDate.getFullYear() > 1850;
    return anoNaoFuturo && anoNaoPassado;
  };

  function validaTodosCampos() {
    const nomeValido = nome && nome.trim();
    // const sobrenomeValido = sobrenome && sobrenome.trim();
    const dataNascimentoValida =
      dataNascimento &&
      dataNascimento.trim() &&
      isDataNascimentoValido(dataNascimento);
    const documentoValido =
      documento && documento.trim() && isDocumentoValido(documento);
    setNomeError(!nomeValido);
    // setSobrenomeError(!sobrenomeValido);
    setDataNascimentoError(!dataNascimentoValida);
    setDocumentoError(!documentoValido);
    return nomeValido && dataNascimentoValida && documentoValido;
  }

  const onCadastroSuccess = (data) => {
    console.log('Cadastro efetuado com sucesso:', data);

    // Limpar os campos após o envio
    setNome('');
    // setSobrenome('');
    setDataNascimento('');
    setDocumento('');
    setHistoricoMedico('');
    setAlergias('');

    // Popup cadastro completo
    setShowCompletedModal(true);
  };

  const onCadastroFailed = () => {
    console.log('Cadastro falhou:');
    setShowFailedModal(true);
  };

  const handleCadastro = () => {
    if (!validaTodosCampos()) return;

    const novoResidente = {
      nome,
      dataNascimento: new Date(dataNascimento).toISOString(),
      documento,
      historicoMedico,
      alergias,
      medicamentos: null,
    };
    // console.log('novoResidente:', novoResidente);
    cadastrarResidenteApi(novoResidente, onCadastroSuccess, onCadastroFailed);
  };

  const handleCloseCompletedModal = () => {
    setShowCompletedModal(false);
    if (onCadastroCompleted) onCadastroCompleted();
  };

  const handleCloseFailedModal = () => {
    setShowFailedModal(false);
  };

  return (
    <>
      {/* Modal cadastro falhou */}
      <FailedModal
        open={showFailedModal}
        title="Falha no cadastro"
        message="O cadastro falhou, tente novamente."
        onModalClosedCallback={handleCloseFailedModal}
      />

      {/* Modal cadastro efetuado */}
      <SuccessModal
        open={showCompletedModal}
        title={modoAtualizacao ? 'Cadastro atualizado' : 'Cadastro efetuado'}
        message={
          modoAtualizacao
            ? 'O cadastro foi atualizado com sucesso.'
            : 'O cadastro foi efetuado com sucesso.'
        }
        onModalClosedCallback={handleCloseCompletedModal}
      />

      <Container>
        <div className={`${styles.cadastroContent} roundBorders`}>
          <Typography variant="h4">
            {modoAtualizacao ? 'Atualizar Cadastro' : 'Cadastrar Residente'}
          </Typography>
          <DividerBold />
          <br />

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Divider>
                <Typography variant="h6">Informações do residente</Typography>
              </Divider>
            </Grid>

            <Grid item xs={12}>
              {/* <Typography>Nome:</Typography> */}
              <TextField
                required
                label="Nome Completo"
                variant="outlined"
                fullWidth
                value={nome}
                onChange={(e) => {
                  setNome(getNomeValidado(e.target.value));
                  setNomeError(false);
                }}
                error={nomeError}
                helperText={nomeError ? 'Campo obrigatório' : ''}
              />
            </Grid>

            {/* <Grid item xs={12} md={7}>
              <TextField
                required
                label="Sobrenome"
                variant="outlined"
                fullWidth
                value={sobrenome}
                onChange={(e) => {
                  setSobrenome(getNomeValidado(e.target.value));
                  setSobrenomeError(false);
                }}
                error={sobrenomeError}
                helperText={sobrenomeError ? 'Campo obrigatório' : ''}
              />
            </Grid> */}

            <Grid item xs={12} md={6}>
              {/* <Typography>Data de Nascimento:</Typography> */}
              <TextField
                required
                label="Data de Nascimento"
                variant="outlined"
                type="date"
                fullWidth
                value={dataNascimento}
                onChange={(e) => {
                  setDataNascimento(e.target.value);
                  setDataNascimentoError(false);
                }}
                InputLabelProps={{ shrink: true }}
                helperText={dataNascimentoError ? 'Data inválida' : ''}
                error={dataNascimentoError}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* <Typography>CPF (apenas números):</Typography> */}
              <TextField
                required
                label="CPF (apenas números)"
                variant="outlined"
                fullWidth
                value={documento}
                onChange={(e) => {
                  setDocumentoValido(e.target.value);
                  setDocumentoError(false);
                }}
                error={documentoError}
                helperText={documentoError ? 'Número inválido' : ''}
              />
            </Grid>

            <Grid item xs={12}>
              <br />
              <Divider>
                <Typography variant="h6">Informações médicas</Typography>
              </Divider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Histórico Médico"
                variant="outlined"
                multiline
                fullWidth
                minRows={3}
                maxRows={8}
                value={historicoMedico}
                onChange={(e) => setHistoricoMedico(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Alergias"
                variant="outlined"
                multiline
                fullWidth
                minRows={3}
                maxRows={8}
                value={alergias}
                onChange={(e) => setAlergias(e.target.value)}
              />
            </Grid>

            {/* Botão Cadastrar */}
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  padding: '8px 18px',
                }}
                variant="contained"
                color="primary"
                onClick={handleCadastro}
              >
                <Typography variant="h5">
                  {modoAtualizacao
                    ? 'Atualizar Residente'
                    : 'Cadastrar Residente'}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
}
