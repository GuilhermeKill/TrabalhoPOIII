import { useState, useEffect } from 'react';
import { InputLabel, TextField, Autocomplete, Typography } from '@mui/material';
import { listarMedicamentosApi } from '../../../services/medicamentoApi';

// considerar importar os objetos de medicamentos como propriedade
// ou fazer fetch no proprio component (pode ser muito custoso)
export default function MedicamentoSelector({ onMedSelected, medicamentoId }) {
  const [medicamentos, setMedicamentos] = useState(null);
  const [selectedMed, setSelectedMed] = useState(null);

  // const todosModicamentos = [{ id: 1, nome: 'Erro!' }];

  // const [selectedMedicamento, setSelectedMedicamento] = useState();

  // const ITEM_HEIGHT = 48;
  // const ITEM_PADDING_TOP = 8;
  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //       width: 250,
  //     },
  //   },
  // };

  function fetchData() {
    listarMedicamentosApi(
      // Success Callback
      (data) => {
        console.log(`listar Medicamentos sucesso.`);
        setMedicamentos(data);

        if (!medicamentoId) setSelectedMed(null);
        else
          setSelectedMed(
            medicamentos?.find((med) => med.idMedicamento === medicamentoId),
          );
      },
      // Failed Callback
      () => {
        console.error('listar Medicamentos erro');
        setMedicamentos(null);
      },
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleMedicamentoChange = (value) => {
    console.log(`value: ${value?.idMedicamento} - ${value?.nomeMedicamento}`);
    setSelectedMed(
      medicamentos?.find((med) => med.idMedicamento === value?.idMedicamento),
    );
    if (onMedSelected) onMedSelected(value?.idMedicamento);
  };

  const sortMedicamentos = (a, b) => {
    return a.nomeMedicamento.localeCompare(b.nomeMedicamento);
  };

  return (
    <>
      <InputLabel
        sx={{ marginBottom: 0.5, marginLeft: 1 }}
        id="medicamentosSelection"
      >
        Medicamento:{' '}
        {medicamentos == null && (
          <Typography display={'inline'} variant="body2">
            Carregando...
          </Typography>
        )}
      </InputLabel>
      <Autocomplete
        disabled={medicamentos == null}
        sx={{ marginBottom: 2 }}
        disablePortal
        labelid="medicamentosSelection"
        id="medicamentosSelection"
        onChange={(event, newValue) => {
          handleMedicamentoChange(newValue);
        }}
        options={medicamentos?.sort(sortMedicamentos) || []}
        getOptionKey={(option) => option.idMedicamento}
        getOptionLabel={(option) => option.nomeMedicamento}
        isOptionEqualToValue={(option, value) =>
          option?.idMedicamento === value?.idMedicamento
        }
        value={selectedMed || null}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} placeholder="Selecione um medicamento" />
        )}
      />
    </>
  );
}
