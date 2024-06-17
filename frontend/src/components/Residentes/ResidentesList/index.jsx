import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Pagination,
  InputAdornment,
  Box,
  CircularProgress,
} from '@mui/material';
import { Add, Delete, Search, Close, Info } from '@mui/icons-material';
import styles from './residentes.module.css';
import CadastroResidente from '../../CadastroResidente/index.jsx';
import { useNavigate } from '../../../router.ts';
import {
  listarResidentesApi,
  deletarResidente,
} from '../../../services/residentesApi';

// usar este para simular varios registros e testar a paginação
const simularVariosRegistros = () => {
  const mockData = [];
  for (let i = 0; i < 190; i += 1) {
    const newPaciente = {
      id: i,
      nome: `Nome Completo ${i}`,
      dataNascimento: `01/01/1990`,
      documento: `123456789${i}`,
    };
    mockData.push(newPaciente);
  }
  return mockData;
};

export default function ResidentesList() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  // Armazena em cache os pacientes
  const [pacientes, setPacientes] = useState([]);

  // state usado para controlar a abertura e fechamento do modal de cadastro e para passar o id do paciente em caso de atualização
  // caso o id seja null, o modal será aberto para cadastro
  // exibir: booleano para exibir ou não o modal
  // pacienteId: id do paciente a ser atualizado
  const [showCadastro, setShowCadastro] = useState({
    exibir: false,
    pacienteId: '',
  });

  // mesma aplicação para o modal de exclusão
  const [showExcluir, setShowExcluir] = useState({
    exibir: false,
    paciente: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  // const [filterDate, setFilterDate] = useState('');

  // Simulate data fetching (replace with your actual data fetching logic)
  function fetchData() {
    setLoading(true);
    listarResidentesApi(
      // Success Callback
      (data) => {
        console.log(`listar residentes sucesso.`);
        const newData = data.map((item) => {
          const [year, month, day] = item.dataNascimento.split('-');
          return {
            id: item.id,
            nome: item.nome,
            dataNascimento: `${day}/${month}/${year}`,
            documento: item.documento,
          };
        });
        setPacientes(newData);
        setLoading(false);
      },
      // Failed Callback
      () => {
        console.error('listar residentes erro');
        setPacientes(simularVariosRegistros);
        setLoading(false);
      },
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Filtragem e paginação

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // const handleFilterDateChange = (event) => {
  //   setFilterDate(event.target.value);
  // };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const filteredPacientes =
    pacientes == null
      ? []
      : pacientes.filter((paciente) => {
          const searchMatch = Object.values(paciente).some(
            (val) =>
              val != null &&
              val.toString().toLowerCase().includes(searchTerm.toLowerCase()),
          );
          // const dateMatch = !filterDate || paciente.dataNascimento === filterDate;
          return searchMatch /* && dateMatch */;
        });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageItems =
    filteredPacientes == null
      ? 0
      : filteredPacientes.slice(indexOfFirstItem, indexOfLastItem);

  // Exibição tela de cadastro

  const openTelaCadastro = (atualizarPacienteId) => {
    console.log(`currentPacienteId: ${atualizarPacienteId}`);
    setShowCadastro({ exibir: true, pacienteId: atualizarPacienteId });
  };

  const closeNovoPaciente = () => {
    setShowCadastro({ exibir: false, pacienteId: null });
  };

  const novoPacienteButtonCallback = () => {
    openTelaCadastro(null);
  };

  // const handleEditPaciente = (pacienteId) => {
  //   openTelaCadastro(pacienteId);
  // };

  const handleOpenPacienteInfo = (pacienteId) => {
    navigate(`/residentes/prontuario?id=${pacienteId}`);
  };

  // Deletar Paciente

  const handleOpenDeleteModal = (pacienteObject) => {
    setShowExcluir({ exibir: true, paciente: pacienteObject });
  };

  const handleCloseDeleteModal = () => {
    setShowExcluir({ exibir: false, paciente: null });
  };

  const handleDeletePaciente = (pacienteId) => {
    deletarResidente(pacienteId, fetchData, () => {
      console.error('Erro ao deletar residente');
    });
    handleCloseDeleteModal();
  };

  // Cadastro/Atualização completos callback

  const onCadastroCompleted = () => {
    setShowCadastro({ exibir: false, pacienteId: null });
    fetchData();
  };

  const onAtualizacaoCompleted = () => {
    setShowCadastro({ exibir: false, pacienteId: null });
    fetchData();
  };

  return (
    <>
      <Grid container padding={4} paddingBottom={0}>
        <Grid item xs={12} md={3} marginBottom={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={novoPacienteButtonCallback}
          >
            <Add fontWeight={800} />
            <Typography fontSize={18} fontWeight={500} padding={0.2}>
              Cadastrar Residente
            </Typography>
          </Button>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={9}
          gap={2}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Grid item xs={12} md={5.5}>
            <TextField
              label="Pesquisar"
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {/* <Grid item xs={12} md={3.5}>
            <TextField
              label="Filtrar por Data"
              type="date"
              fullWidth
              value={filterDate}
              onChange={handleFilterDateChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid> */}
        </Grid>
      </Grid>
      <br />
      <Table
        sx={{
          tableLayout: 'fixed',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell width={'40%'}>
              <Typography variant="body2" textAlign={'center'} fontSize={15}>
                Nome do Paciente
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" textAlign={'center'} fontSize={15}>
                Data de Nascimento
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" textAlign={'center'} fontSize={15}>
                Documento
              </Typography>
            </TableCell>
            <TableCell width={'15%'} size="small">
              <Typography variant="body2" textAlign={'center'} fontSize={15}>
                Ações
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading &&
            currentPageItems.map((paciente) => (
              <TableRow hover key={paciente.id}>
                <TableCell>
                  <Typography noWrap paddingLeft={2}>
                    {paciente.nome}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography textAlign={'center'}>
                    {paciente.dataNascimento}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography textAlign={'center'}>
                    {paciente.documento}
                  </Typography>
                </TableCell>
                <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                  <IconButton
                    onClick={() => handleOpenPacienteInfo(paciente.id)}
                  >
                    <Info color="info" />
                  </IconButton>
                  {/* <IconButton onClick={() => handleEditPaciente(paciente.id)}>
                  <Edit color="primary" />
                </IconButton> */}
                  <IconButton onClick={() => handleOpenDeleteModal(paciente)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="30vh"
        >
          <CircularProgress />
        </Box>
      )}
      <Grid
        item
        xs={10}
        padding={3}
        display={'flex'}
        justifyContent={'end'}
        alignSelf={'end'}
      >
        <Pagination
          shape="rounded"
          count={Math.ceil(filteredPacientes.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
        />
      </Grid>
      {/* Modal para cadastrar idoso */}
      <Dialog open={showCadastro.exibir} fullWidth={true} maxWidth={'md'}>
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '0',
          }}
        >
          <IconButton sx={{ ml: 'auto' }} onClick={closeNovoPaciente}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <CadastroResidente
            atualizarCadastroId={showCadastro.pacienteId}
            onCadastroCompleted={
              showCadastro.pacienteId != null
                ? onCadastroCompleted
                : onAtualizacaoCompleted
            }
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={showExcluir.exibir}
        onClose={handleCloseDeleteModal}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <Container
          className={styles.container}
          sx={{
            padding: '30px',
          }}
        >
          <Typography align="center" variant="h5">
            Você tem certeza que deseja excluir este paciente?
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              textAlign="center"
              display="inline-block"
              borderRadius={2}
              bgcolor="#242424ff"
              color="#fff"
              p={'10px 50px'}
              mt={2}
              mx="auto"
            >
              <Typography align="center" variant="h5">
                {showExcluir.paciente && showExcluir.paciente.nome}
              </Typography>
            </Box>
          </div>
          <br />
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeletePaciente(showExcluir.paciente.id)}
            >
              <Typography align="center" variant="h5" padding={'4px 16px'}>
                Sim
              </Typography>
            </Button>
            <Button variant="contained" onClick={handleCloseDeleteModal}>
              <Typography align="center" variant="h5" padding={'4px 16px'}>
                Não
              </Typography>
            </Button>
          </Grid>
        </Container>
      </Dialog>
    </>
  );
}
