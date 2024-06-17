import { useState } from 'react';
import { Grid, Tabs, Tab } from '@mui/material';
import styles from './Prontuario.module.css';
import ProntuarioDados from './ProntuarioDados/index.jsx';
import MedicacaoResidenteList from './ProntuarioMedicamentos/MedicacaoResidenteList.jsx';

export default function Prontuario({ id }) {
  const [tabValue, setTabValue] = useState('1');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={styles.prontuarioContent}>
      <Grid container>
        <Grid item xs={12} sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Dados do Residente" value="1" />
            <Tab label="Medicações" value="2" />
          </Tabs>
        </Grid>
      </Grid>

      {/* Mostrar o conteúdo com base na aba selecionada */}
      {tabValue === '1' && <ProntuarioDados id={parseInt(id, 10)} />}
      {tabValue === '2' && (
        <MedicacaoResidenteList residenteId={parseInt(id, 10)} />
      )}
    </div>
  );
}
