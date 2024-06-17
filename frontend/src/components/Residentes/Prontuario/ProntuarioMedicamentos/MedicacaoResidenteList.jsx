import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Box,
  CircularProgress,
} from '@mui/material';
import { Add, Close } from '@mui/icons-material';
// import { Delete, Search, Info } from '@mui/icons-material';
import MedicacaoResidenteCard from './MedicacaoResidenteCard.jsx';
import MedicamentoResidenteForm from '../../../Medicamento/MedicamentoResidenteForm/index.jsx';
import {
  listarMedicacoesResidenteApi,
  deletarMedicacaoResidente,
} from '../../../../services/medicacaoResidenteApi';

export default function MedicacaoResidenteList({ residenteId }) {
  // const [mostrarTomados, setMostrarTomados] = useState(false);
  const [medicacoes, setMedicacoes] = useState([]);
  const [showCadastro, setShowCadastro] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showErroListagem, setShowErroListagem] = useState(false);

  const fetchListagem = async () => {
    setShowErroListagem(false);
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 2000);
    listarMedicacoesResidenteApi(
      residenteId,
      // successCallback
      (data) => {
        setShowLoading(false);
        setMedicacoes(
          data.sort(
            (a, b) => a.dataMedicamentoInicio - b.dataMedicamentoInicio,
          ),
        );
        console.log(
          `Medicações do residente [${residenteId}] carregadas: ${data[0]}`,
        );
      },
      // errorCallback
      () => {
        setShowErroListagem(true);
        setShowLoading(false);
        console.error(
          `Erro ao buscar medicações do residente [${residenteId}]`,
        );
      },
    );
  };

  useEffect(() => {
    fetchListagem();
  }, [residenteId]);

  const handleDelete = (idMedicacaoPaciente) => {
    deletarMedicacaoResidente(
      idMedicacaoPaciente,
      // successCallback
      () => {
        console.log('Medicação deletada com sucesso');
        fetchListagem();
      },
      // errorCallback
      () => {
        console.error(`Erro ao deletar medicações id [${idMedicacaoPaciente}]`);
        fetchListagem();
      },
    );
  };

  const cadastroMedicacaoCompleto = () => {
    setShowCadastro(false);
    fetchListagem();
  };

  const handleToggleTomado = (id) => {
    setMedicacoes(
      medicacoes.map((agendamento) =>
        agendamento.id === id
          ? { ...agendamento, tomado: !agendamento.tomado }
          : agendamento,
      ),
    );
  };

  return (
    <>
      {/* Modal para cadastrar */}
      <Dialog open={showCadastro} fullWidth={true} maxWidth={'md'}>
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '0',
          }}
        >
          <IconButton
            sx={{ ml: 'auto' }}
            onClick={() => setShowCadastro(false)}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <MedicamentoResidenteForm
            residenteId={residenteId}
            onCadastroCompleted={cadastroMedicacaoCompleto}
          />
        </DialogContent>
      </Dialog>

      <br />
      <Grid item xs={12} style={{ textAlign: 'right' }}>
        <Button
          style={{
            padding: '10px 20px',
            marginBottom: 20,
          }}
          variant="contained"
          color="primary"
          onClick={() => setShowCadastro(true)}
        >
          <Add fontWeight={800} />
          &nbsp;
          <Typography variant="h6">Inserir Medicação</Typography>
        </Button>
      </Grid>

      <Grid container px={'2%'}>
        {/* <Grid container margin={2}>
          <FormControlLabel
            control={
              <Switch
                checked={mostrarTomados}
                onChange={() => setMostrarTomados(!mostrarTomados)}
              />
            }
            label="Mostrar medicamentos já tomados"
          />
        </Grid> */}
        {showLoading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="30vh"
          >
            <CircularProgress />
          </Box>
        )}
        {showErroListagem && (
          <Container display="flex">
            <Typography variant="h5" textAlign={'center'} margin={5}>
              Erro ao carregar os dados.
              <br />
              Volte à página anterior e tente novamente.
            </Typography>
          </Container>
        )}
        {!showLoading && !showErroListagem && (
          <Grid container spacing={2}>
            {medicacoes
              // .filter((agendamento) => mostrarTomados || !agendamento.tomado)
              .map((medicacao) => (
                <Grid item xs={12} key={medicacao.idMedicacaoPaciente}>
                  <MedicacaoResidenteCard
                    medicacao={medicacao}
                    onDelete={handleDelete}
                    onToggleTomado={handleToggleTomado}
                  />
                </Grid>
              ))}
          </Grid>
        )}
      </Grid>
    </>
  );
}
