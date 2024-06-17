import { useEffect, useState } from 'react';
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
} from '@mui/material';
import { Add, Edit, Delete, Search, Close } from '@mui/icons-material';
import styles from './medicamentos.module.css';
import CadastroMedicamento from '../CadastroMedicamento/index.jsx';
import {
  listarMedicamentosApi,
  deletarMedicamento,
} from '../../services/medicamentoApi';

function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [showCadastro, setShowCadastro] = useState({
    exibir: false,
    medicamentoId: '',
  });

  // mesma aplicação para o modal de exclusão
  const [showExcluir, setShowExcluir] = useState({
    exibir: false,
    medicamento: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      await listarMedicamentosApi((medicamentos) => {
        setMedicamentos(medicamentos);
      });
    }

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleChangePage = (_, newPage) => {
    setCurrentPage(newPage);
  };

  let filteredMedicamentos = medicamentos.filter((medicamento) => {
    const searchMatch = Object.values(medicamento).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    );
    return searchMatch;
  });

  if (filteredMedicamentos.length === 0) {
    filteredMedicamentos = medicamentos;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageItems = filteredMedicamentos.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const openTelaCadastro = (atualizarMedicamentoId) => {
    console.log(`currentMedicamentoId: ${atualizarMedicamentoId}`);
    setShowCadastro({ exibir: true, medicamentoId: atualizarMedicamentoId });
  };

  const closeNovoMedicamento = () => {
    setShowCadastro({ exibir: false, medicamentoId: null });
  };

  const novoMedicamentoButtonCallback = () => {
    openTelaCadastro(null);
  };

  const handleEditMedicamento = (medicamentoId) => {
    openTelaCadastro(medicamentoId);
  };

  // Deletar Medicamento

  const handleOpenDeleteModal = (medicamentoObject) => {
    setShowExcluir({ exibir: true, medicamento: medicamentoObject });
  };

  const handleCloseDeleteModal = () => {
    setShowExcluir({ exibir: false, medicamento: null });
  };

  const handleDeleteMedicamento = async (medicamentoId) => {
    await deletarMedicamento(medicamentoId, () => {
      window.location.reload();
      handleCloseDeleteModal();
    });
  };

  // Cadastro/Atualização completos callback

  const onCadastroCompleted = () => {
    setShowCadastro({ exibir: false, medicamentoId: null });
  };

  const onAtualizacaoCompleted = () => {
    setShowCadastro({ exibir: false, medicamentoId: null });
  };

  return (
    <>
      <Grid container padding={4} paddingBottom={0}>
        <Grid item xs={12} md={3} marginBottom={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={novoMedicamentoButtonCallback}
          >
            <Add fontWeight={800} />
            <Typography fontSize={18} fontWeight={500} padding={0.2}>
              Novo Medicamento
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
              variant="outlined"
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
        </Grid>
      </Grid>
      <br />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={'40%'}>
              <Typography variant="body2" textAlign={'center'} fontSize={15}>
                Nome do Medicamento
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" textAlign={'center'} fontSize={15}>
                Quantidade
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" textAlign={'center'} fontSize={15}>
                Preço
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
          {currentPageItems.map((medicamento) => (
            <TableRow hover key={medicamento.idMedicamento}>
              <TableCell>
                <Typography noWrap paddingLeft={2}>
                  {medicamento.nomeMedicamento}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography textAlign={'center'}>
                  {medicamento.dosagem}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography textAlign={'center'}>
                  {medicamento.preco}
                </Typography>
              </TableCell>
              <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton
                  onClick={() =>
                    handleEditMedicamento(medicamento.idMedicamento)
                  }
                >
                  <Edit color="primary" />
                </IconButton>
                <IconButton onClick={() => handleOpenDeleteModal(medicamento)}>
                  <Delete color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
          count={Math.ceil(filteredMedicamentos.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
        />
      </Grid>
      {/* Modal para cadastrar medicamento */}
      <Dialog open={showCadastro.exibir} fullWidth={true} maxWidth={'md'}>
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '0',
          }}
        >
          <IconButton sx={{ ml: 'auto' }} onClick={closeNovoMedicamento}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <CadastroMedicamento
            atualizarCadastroId={showCadastro.medicamentoId}
            onCadastroCompleted={
              showCadastro.medicamentoId != null
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
            Você tem certeza que deseja excluir o medicamento?
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
                {showExcluir.medicamento &&
                  showExcluir.medicamento.nomeMedicamento}
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
              onClick={() =>
                handleDeleteMedicamento(showExcluir.medicamento.idMedicamento)
              }
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

export default Medicamentos;
