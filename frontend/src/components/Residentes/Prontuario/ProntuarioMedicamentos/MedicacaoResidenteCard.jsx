import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Grid,
  Paper,
  Dialog,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
import TodayIcon from '@mui/icons-material/Today';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MedicationIcon from '@mui/icons-material/Medication';
import NotesIcon from '@mui/icons-material/Notes';
import StartIcon from '@mui/icons-material/Start';
import { grey, primary } from '../../../../theme/palette';

export default function MedicacaoResidenteCard({
  medicacao,
  onDelete,
  onToggleTomado,
}) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openToggleModal, setOpenToggleModal] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(medicacao.idMedicacaoPaciente);
    setOpenDeleteModal(false);
  };

  const handleToggleConfirm = () => {
    onToggleTomado(medicacao.idMedicacaoPaciente);
    setOpenToggleModal(false);
  };

  const textBox1 = {
    backgroundColor: grey[800],
    borderRadius: '8px',
    padding: 1.2,
    boxSizing: 'border-box',
    fontWeight: '500',
    color: primary.contrastText,
  };

  const iconMargin1 = {
    marginRight: '0.35rem',
  };

  return (
    <Card
      sx={{
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        // backgroundColor: primary.lighter,
        border: 2,
        borderColor: grey[400],
        height: 'auto',
        boxShadow: '1px 1px 4px #00000030',
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Grid container>
          <Grid
            item
            container
            spacing={3}
            xs={12}
            md={10}
            lg={11}
            display={'flex'}
            alignItems={'center'}
            // justifyContent={'space-between'}
          >
            {/* Data hora */}
            <Grid
              item
              container
              xs={'auto'}
              sm={'auto'}
              md={'auto'}
              lg={'auto'}
              display={'flex'}
              spacing={1}
              direction={'column'}
              alignItems={'center'}
            >
              <Grid item display={'flex'}>
                <Typography display={'inline-flex'} alignItems={'center'}>
                  <StartIcon sx={iconMargin1} />
                  Início
                </Typography>
              </Grid>
              <Grid item display={'flex'}>
                <Typography sx={textBox1} variant="body">
                  {medicacao.dataMedicamentoInicio.toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                  })}
                  {'  '}
                  {medicacao.dataMedicamentoInicio.toLocaleString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
              </Grid>
            </Grid>

            {/* Informações */}
            <Grid item container xs={12} sm={12} md={8} lg={9} spacing={1.5}>
              <Grid item xs={12} display={'flex'} alignItems={'center'}>
                <Typography
                  variant="h5"
                  display={'inline-flex'}
                  alignItems={'center'}
                >
                  <MedicationIcon sx={iconMargin1} />
                  {medicacao.nomeMedicamento}
                </Typography>
                <Typography variant="body1" display={'inline'} sx={{ ml: 3 }}>
                  Via: {medicacao.viaAdministracao}
                </Typography>
              </Grid>
              {/* Dias / Intervalo */}
              <Grid item xs={12} display={'flex'}>
                <Typography
                  variant="body"
                  display={'inline-flex'}
                  alignItems={'center'}
                  sx={{ mr: 3 }}
                >
                  <TodayIcon sx={iconMargin1} />
                  Dias: {medicacao.quantidadeTempoDias}
                </Typography>
                <Typography
                  variant="body"
                  display={'inline-flex'}
                  alignItems={'center'}
                >
                  <WatchLaterIcon sx={iconMargin1} />
                  Intervalo: {medicacao.quantidadeTempoHoras}h
                </Typography>
              </Grid>
              {/* Observação */}
              <Grid item xs={12} display={'flex'}>
                {medicacao.observacao && (
                  <Typography
                    variant="body2"
                    display={'inline-flex'}
                    alignItems={'center'}
                    sx={{ mt: 0 }}
                  >
                    <NotesIcon sx={iconMargin1} />
                    Observação: {medicacao.observacao}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={3}
            md={2}
            lg={1}
            sx={{
              textAlign: 'center',
              alignContent: 'center',
            }}
          >
            {/* Toggle Tomado */}
            {/* <Grid item xs={12}>
              <Button
                variant="contained"
                color={tomado ? 'success' : 'error'}
                startIcon={tomado ? <CheckCircleIcon /> : <CancelIcon />}
                onClick={() => setOpenToggleModal(true)}
              >
                {tomado ? 'Tomado' : 'Não Tomado'}
              </Button>
            </Grid> */}
            <Grid item xs={12}>
              <IconButton
                color="error"
                onClick={() => setOpenDeleteModal(true)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      {/* Modal para confirmar exclusão */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Paper
          sx={{
            px: 8,
            py: 5,
            boxSizing: 'content-box',
            margin: 'auto',
            width: '300px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4">Confirmar Exclusão</Typography>
          <Typography fontSize={18} sx={{ my: 2 }}>
            Você tem certeza que deseja excluir este agendamento?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteConfirm}
            sx={{ mr: 2 }}
          >
            <Typography variant="button" fontSize={18}>
              Confirmar
            </Typography>
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenDeleteModal(false)}
          >
            <Typography variant="button" fontSize={18}>
              Cancelar
            </Typography>
          </Button>
        </Paper>
      </Dialog>

      {/* Modal para confirmar mudança de status */}
      <Dialog open={openToggleModal} onClose={() => setOpenToggleModal(false)}>
        <Paper
          sx={{
            px: 8,
            py: 5,
            boxSizing: 'content-box',
            margin: 'auto',
            width: '300px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6">Confirmar Alteração</Typography>
          <Typography variant="body2" sx={{ my: 2 }}>
            Você tem certeza que deseja alterar o estado deste agendamento?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleToggleConfirm}
            sx={{ mr: 2 }}
          >
            Confirmar
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenToggleModal(false)}
          >
            Cancelar
          </Button>
        </Paper>
      </Dialog>
    </Card>
  );
}
