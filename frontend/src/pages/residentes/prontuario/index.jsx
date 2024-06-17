import { useParams } from 'react-router-dom';
import { IconButton, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from '../../../router.ts';
import Prontuario from '../../../components/Residentes/Prontuario/index.jsx';

export default function Page() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtém o parâmetro 'id' da URL
  console.log('useParams id: ', id);

  // substituir essa monstruosidade por useParams
  function pegarParametroPodre() {
    const params = new URLSearchParams(document.location.search);
    return params.get('id');
  }

  return (
    <>
      <Grid container alignItems="center" spacing={1} justifyContent={'start'}>
        <Grid item>
          <IconButton
            color="disabled"
            onClick={() => navigate('..', { relative: 'path' })}
            sx={{ marginLeft: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <div className="pageTitle">Prontuário</div>
        </Grid>
        <Grid item xs={12}>
          <Prontuario id={pegarParametroPodre()} />
        </Grid>
      </Grid>
    </>
  );
}
