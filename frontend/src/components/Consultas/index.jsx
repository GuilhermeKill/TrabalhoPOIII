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
  TextField,
  IconButton,
  Pagination,
  InputAdornment,
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import styles from './consulta.module.css';

// Simulate data fetching (replace with your actual data fetching logic)
const fetchData = () => {
  return [
    {
      paciente: 'Gustavo',
      hora: '20:00',
      data: '2024-01-01',
      tipoDaConsulta: '...',
      medico: 'Kevin',
    },
    // ... more mock data
  ];
};

function Consultas() {
  const [consultas, setConsultas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paciente, setPaciente] = useState('');
  const [hora, setHora] = useState('');
  const [data, setData] = useState('');
  const [tipoDaConsulta, setTipoDaConsulta] = useState('');
  const [medico, setMedico] = useState('');
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedConsultaToDelete, setSelectedConsultaToDelete] =
    useState(null);

  useEffect(() => {
    const data = fetchData();
    setConsultas(data);
  }, []);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  const filteredConsultas = consultas.filter((consulta) => {
    const searchMatch = Object.values(consulta).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const dateMatch = !filterDate || consulta.data === filterDate;
    return searchMatch && dateMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredConsultas.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const clearEditForm = () => {
    setPaciente('');
    setHora('');
    setData('');
    setTipoDaConsulta('');
    setMedico('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    clearEditForm();
  };

  const handleAddConsultaFromForm = () => {
    const newConsulta = {
      paciente,
      hora,
      data,
      tipoDaConsulta,
      medico,
    };
    setConsultas([...consultas, newConsulta]);
    setShowModal(false);
    clearEditForm();
  };

  const handleEditConsulta = () => {
    const updatedConsultas = consultas.map((consulta) =>
      consulta.id === selectedConsulta.id
        ? {
            ...consulta,
            paciente,
            hora,
            data,
            tipoDaConsulta,
            medico,
          }
        : consulta,
    );
    setConsultas(updatedConsultas);
    handleCloseModal();
    clearEditForm();
  };

  const handleDeleteConsulta = (consultaId) => {
    const updatedConsultas = consultas.filter(
      (consulta) => consulta.id !== consultaId,
    );
    setConsultas(updatedConsultas);
    setShowDeleteModal(false);
  };

  const handleOpenModal = () => {
    setSelectedConsulta(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (consulta) => {
    setSelectedConsulta(consulta);
    setPaciente(consulta.paciente);
    setHora(consulta.hora);
    setData(consulta.data);
    setTipoDaConsulta(consulta.tipoDaConsulta);
    setMedico(consulta.medico);
    setShowModal(true);
  };

  const handleOpenDeleteModal = (consulta) => {
    setSelectedConsultaToDelete(consulta);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedConsultaToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <Container>
      <Typography variant="h4">Consultas</Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenModal}
          >
            Nova Consulta
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          alignItems="center"
          justifyContent="flex-end"
        >
          <Grid item>
            <TextField
              label="Pesquisar"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Filtrar por Data"
              type="date"
              value={filterDate}
              onChange={handleFilterDateChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Tipo de Consulta</TableCell>
            <TableCell>Médico</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems.map((consulta) => (
            <TableRow key={consulta.id}>
              <TableCell>{consulta.paciente}</TableCell>
              <TableCell>{consulta.hora}</TableCell>
              <TableCell>{consulta.data}</TableCell>
              <TableCell>{consulta.tipoDaConsulta}</TableCell>
              <TableCell>{consulta.medico}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenEditModal(consulta)}>
                  <Edit color="primary" />
                </IconButton>
                <IconButton onClick={() => handleOpenDeleteModal(consulta)}>
                  <Delete color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(filteredConsultas.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
      />

      {/* Modal for Editing Consulta */}
      <Dialog open={showModal} onClose={handleCloseModal}>
        <Container className={styles.container}>
          <Typography variant="h5">Editar Consulta</Typography>
          <br />
          <TextField
            label="Paciente"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Data"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Tipo de Consulta"
            value={tipoDaConsulta}
            onChange={(e) => setTipoDaConsulta(e.target.value)}
            fullWidth
          />
          <TextField
            label="Médico"
            value={medico}
            onChange={(e) => setMedico(e.target.value)}
            fullWidth
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={
              selectedConsulta ? handleEditConsulta : handleAddConsultaFromForm
            }
          >
            {selectedConsulta ? 'Salvar' : 'Adicionar'}
          </Button>{' '}
          <Button variant="contained" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Container>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onClose={handleCloseDeleteModal}>
        <Container className={styles.container}>
          <Typography variant="h6">
            Você tem certeza que deseja excluir esta consulta?
          </Typography>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDeleteConsulta(selectedConsultaToDelete.id)}
          >
            Sim
          </Button>{' '}
          <Button variant="contained" onClick={handleCloseDeleteModal}>
            Não
          </Button>
        </Container>
      </Dialog>
    </Container>
  );
}

export default Consultas;
