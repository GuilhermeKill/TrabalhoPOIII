import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Divider,
  Typography,
  Box,
  CircularProgress,
  Container,
} from '@mui/material';
import {
  getResidenteApi,
  atualizarResidenteApi,
} from '../../../../services/residentesApi';
import FailedModal from '../../../Modal/FailedModal.jsx';
import SuccessModal from '../../../Modal/SuccessModal.jsx';

export default function ProntuarioDados({ id }) {
  const [loading, setLoading] = useState(true);
  const [residente, setResidente] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Estados dos campos
  const [nome, setNome] = useState('');
  const [nomeError, setNomeError] = useState(false);

  // const [sobrenome, setSobrenome] = useState('');
  // const [sobrenomeError, setSobrenomeError] = useState(false);

  const [dataNascimento, setDataNascimento] = useState('');
  const [dataNascimentoError, setDataNascimentoError] = useState(false);

  const [documento, setDocumento] = useState('');
  const [documentoError, setDocumentoError] = useState(false);

  const [historicoMedico, setHistoricoMedico] = useState('');
  const [alergias, setAlergias] = useState('');

  // Modal concluido
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const handleCloseCompletedModal = () => {
    setShowCompletedModal(false);
  };

  const handleCloseFailedModal = () => {
    setShowFailedModal(false);
  };

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

  const loadResidenteData = (data) => {
    setNome(data.nome);
    // setSobrenome(data.sobrenome);
    setDataNascimento(data.dataNascimento);
    setDocumento(data.documento);
    setHistoricoMedico(data.historicoMedico);
    setAlergias(data.alergias);
  };

  // const setResidenteMock = () => {
  //   const data = {
  //     nome: 'Teste',
  //     // sobrenome: 'Testando',
  //     dataNascimento: '1950-01-01',
  //     documento: '12345678900',
  //     historicoMedico:
  //       'Ocorreu um erro no carregamento dos dados, por isto estamos utilizando dados fictícios para preencher o campo.',
  //     alergias:
  //       'Ocorreu um erro no carregamento dos dados, por isto estamos utilizando dados fictícios para preencher o campo.',
  //   };
  //   setResidente(data);
  //   loadResidenteData(data);
  // };

  const setInfoFromData = (data) => {
    setResidente(data);
    setNome(data.nome);
    // setSobrenome(data.sobrenome);
    setDataNascimento(data.dataNascimento);
    setDocumento(data.documento);
    setHistoricoMedico(data.historicoMedico);
    setAlergias(data.alergias);
  };

  // Simulate data fetching (replace with your actual data fetching logic)
  function fetchData(fetchId) {
    setLoading(true);
    getResidenteApi(
      fetchId,
      // Success Callback
      (data) => {
        console.log('getResidenteApi completed', data);

        setInfoFromData(data);
        setLoading(false);
      },
      // Failed Callback
      () => {
        console.error('getResidenteApi erro');
        setResidente(null);
        setLoading(false);
        // setResidenteMock();
        // setTimeout(() => {
        //   setLoading(false);
        // }, 1000);
      },
    );
  }

  useEffect(() => {
    console.log(`ProntuarioDados: useEffect(id: ${id})`);
    fetchData(id);
  }, [id]);

  const handleCancelEdit = () => {
    setEditMode(false);
    loadResidenteData(residente);
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

  const atualizacaoSucesso = (data) => {
    console.log('Dados atualizados com sucesso:', data);

    setShowCompletedModal(true); // Popup cadastro completo
    setEditMode(false); // Voltar para o modo de exibição após salvar
    fetchData(id); // Recarregar os dados do residente após a atualização
  };

  const atualizacaoErro = () => {
    console.error('Erro ao atualizar dados.');
    setShowFailedModal(true);
  };

  const handleSave = () => {
    if (!validaTodosCampos()) return;

    handleCancelEdit();

    // Simulação de envio dos dados atualizados para o backend
    const updatedResidente = {
      id,
      nome,
      // sobrenome,
      dataNascimento: new Date(dataNascimento).toISOString(),
      documento,
      historicoMedico,
      alergias,
    };

    atualizarResidenteApi(
      updatedResidente,
      atualizacaoSucesso,
      atualizacaoErro,
    );
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="30vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!residente) {
    return (
      <Container>
        <Typography variant="h5" textAlign={'center'} margin={8}>
          Erro ao carregar os dados do residente.
          <br />
          Volte à página anterior e tente novamente.
        </Typography>
      </Container>
    );
  }

  const fontColor = {
    '& .MuiInputBase-input.Mui-disabled': {
      WebkitTextFillColor: '#000000',
    },
  };

  return (
    <div>
      {/* Modal cadastro falhou */}
      <FailedModal
        open={showFailedModal}
        title="Falha na atualização"
        message="A atualização dos dados falhou, tente novamente."
        onModalClosedCallback={handleCloseFailedModal}
      />

      {/* Modal cadastro efetuado */}
      <SuccessModal
        open={showCompletedModal}
        title="Atualização completa"
        message="O cadastro foi atualizado com sucesso."
        onModalClosedCallback={handleCloseCompletedModal}
      />

      <br />
      <Grid item xs={12} style={{ textAlign: 'right' }}>
        {editMode ? (
          ''
        ) : (
          <Button
            style={{
              padding: '10px 20px',
            }}
            variant="contained"
            color="primary"
            onClick={() => setEditMode(true)}
          >
            <Typography variant="h6">Editar Cadastro</Typography>
          </Button>
        )}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Divider>
            <Typography variant="h6">Informações do Residente</Typography>
          </Divider>
        </Grid>

        <Grid item xs={12}>
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
            disabled={!editMode}
            InputProps={{
              readOnly: !editMode,
            }}
            InputLabelProps={{ shrink: true }}
            sx={!editMode ? fontColor : null}
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
            disabled={!editMode}
            InputProps={{
              readOnly: !editMode,
            }}
            InputLabelProps={{ shrink: true }}
            sx={!editMode ? fontColor : null}
          />
        </Grid> */}

        <Grid item xs={12} md={5}>
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
            helperText={dataNascimentoError ? 'Data inválida' : ''}
            error={dataNascimentoError}
            disabled={!editMode}
            InputLabelProps={{ shrink: true }}
            sx={!editMode ? fontColor : null}
          />
        </Grid>

        <Grid item xs={12} md={7}>
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
            disabled={!editMode}
            InputProps={{
              readOnly: !editMode,
            }}
            InputLabelProps={{ shrink: true }}
            sx={!editMode ? fontColor : null}
          />
        </Grid>

        <Grid item xs={12}>
          <br />
          <Divider>
            <Typography variant="h6">Informações Médicas</Typography>
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
            disabled={!editMode}
            InputProps={{
              readOnly: !editMode,
            }}
            InputLabelProps={{ shrink: true }}
            sx={!editMode ? fontColor : null}
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
            disabled={!editMode}
            InputProps={{
              readOnly: !editMode,
            }}
            InputLabelProps={{ shrink: true }}
            sx={!editMode ? fontColor : null}
          />
        </Grid>

        {/* Botões */}
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          {editMode ? (
            <Grid container justifyContent={'center'} gap={2}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                <Typography variant="h5">Salvar alterações</Typography>
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleCancelEdit}
              >
                <Typography variant="h5">Cancelar edição</Typography>
              </Button>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </div>
  );
}
