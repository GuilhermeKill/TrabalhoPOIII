import { useState, useEffect } from 'react';
import {
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
  Chip,
} from '@mui/material';

export default function MedicamentoMultiSelector() {
  const todosModicamentos = [
    { id: 1, nome: 'Paracetamol' },
    { id: 2, nome: 'Ibuprofeno' },
    { id: 3, nome: 'Aspirina' },
    { id: 4, nome: 'Dipirona' },
    { id: 5, nome: 'Omeprazol' },
    { id: 6, nome: 'Amoxicilina' },
    { id: 7, nome: 'Dorflex' },
    { id: 8, nome: 'Rivotril' },
    { id: 9, nome: 'Fluoxetina' },
    { id: 10, nome: 'Losartana' },
    { id: 11, nome: 'Sinvastatina' },
    { id: 12, nome: 'Metformina' },
    { id: 13, nome: 'Clonazepam' },
    { id: 14, nome: 'Paroxetina' },
    { id: 15, nome: 'Citalopram' },
    { id: 16, nome: 'Sertralina' },
    { id: 17, nome: 'Escitalopram' },
    { id: 18, nome: 'Loratadina' },
    { id: 19, nome: 'Dexametasona' },
    { id: 20, nome: 'Prednisona' },
    { id: 21, nome: 'Ranitidina' },
    { id: 22, nome: 'Pantoprazol' },
    { id: 23, nome: 'Ciprofloxacino' },
    { id: 24, nome: 'Azitromicina' },
    { id: 25, nome: 'Amoxicilina + Clavulanato' },
    { id: 26, nome: 'Doxiciclina' },
    { id: 27, nome: 'Metronidazol' },
    { id: 28, nome: 'Nimesulida' },
    { id: 29, nome: 'Diclofenaco' },
    { id: 30, nome: 'Tramadol' },
  ];

  // Medicamentos
  const [selectedMedicamentosIds, setSelectedMedicamentosIds] = useState([]);

  const residenteMock = {
    medicamentos: todosModicamentos.slice(0, 5),
  };

  // Preenche os medicamentos com os ids recebidos do backend
  useEffect(() => {
    if (residenteMock && residenteMock.medicamentos) {
      setSelectedMedicamentosIds(residenteMock.medicamentos.map((i) => i.id));
    }
  }, []);

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

  const handleMedicamentosChange = (event) => {
    const { value } = event.target;
    console.log(`value: ${value}`);
    setSelectedMedicamentosIds(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const sortMedicamentos = (a, b) => {
    const isSelectedA = selectedMedicamentosIds.includes(a.id);
    const isSelectedB = selectedMedicamentosIds.includes(b.id);

    // Se ambos são selecionados ou ambos não são selecionados, ordena pela ordem alfabética
    if (isSelectedA && isSelectedB) return a.nome.localeCompare(b.nome);
    if (!isSelectedA && !isSelectedB) return a.nome.localeCompare(b.nome);

    // Se um é selecionado e o outro não, o selecionado vem primeiro
    return isSelectedA ? -1 : 1;
  };

  return (
    <>
      <InputLabel id="medicamentosSelection">Medicamentos:</InputLabel>
      <Select
        fullWidth
        labelId="medicamentosSelection"
        multiple
        value={selectedMedicamentosIds}
        onChange={handleMedicamentosChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selectedIds) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedIds
              .map((mapId) => ({
                id: mapId,
                nome: todosModicamentos?.find((x) => x.id === mapId)?.nome,
              })) // cria um array de objetos com id e nome
              .sort((a, b) => a.nome.localeCompare(b.nome)) // ordena por nome
              .map(
                (
                  object, // mapeia usando o object criado
                ) => (
                  <Chip
                    key={object.id}
                    label={
                      todosModicamentos?.find((x) => x.id === object.id)?.nome
                    }
                  />
                ),
              )}
          </Box>
        )}
        // MenuProps={MenuProps}
      >
        {todosModicamentos.sort(sortMedicamentos).map((med) => (
          <MenuItem key={med.id} value={med.id}>
            <Checkbox checked={selectedMedicamentosIds.includes(med.id)} />
            <ListItemText primary={med.nome} />
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
