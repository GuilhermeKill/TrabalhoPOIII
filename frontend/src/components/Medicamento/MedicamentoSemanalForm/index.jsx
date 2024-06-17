import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
  Button,
  TextField,
  IconButton,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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

const daysOfWeek = [
  { id: 0, name: 'Domingo', letter: 'Dom' },
  { id: 1, name: 'Segunda-feira', letter: 'Seg' },
  { id: 2, name: 'Terça-feira', letter: 'Ter' },
  { id: 3, name: 'Quarta-feira', letter: 'Qua' },
  { id: 4, name: 'Quinta-feira', letter: 'Qui' },
  { id: 5, name: 'Sexta-feira', letter: 'Sex' },
  { id: 6, name: 'Sábado', letter: 'Sab' },
];

export default function MedicamentoSemanalForm() {
  const { control, handleSubmit /* , reset */ } = useForm({
    defaultValues: {
      medications: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'medications',
  });

  const sortMedicamentos = (a, b) => {
    return a.nome.localeCompare(b.nome);
  };

  // const apiEndpoint = 'https://api.example.com/medications';
  // useEffect(() => {
  //   // Fazer a requisição à API para obter os dados iniciais
  //   fetch(apiEndpoint)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Presume-se que a resposta da API contém um array de medicamentos
  //       reset({ medications: data });
  //     })
  //     .catch((error) => {
  //       console.error('Erro ao buscar os dados:', error);
  //     });
  // }, [apiEndpoint, reset]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {fields.map((item, index) => (
          <Grid item xs={12} key={item.id}>
            <Grid container spacing={2} display="flex" alignItems="center">
              <Grid item xs={11}>
                {/* ----------------------------------------------- */}
                {/* ------------ Dropdown Medicamentos ------------ */}
                {/* ----------------------------------------------- */}
                <FormControl fullWidth>
                  <InputLabel>Medicamento</InputLabel>
                  <Controller
                    name={`medications[${index}].nome`}
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="Medicamento">
                        {todosModicamentos.sort(sortMedicamentos).map((med) => (
                          <MenuItem key={med.id} value={med.nome}>
                            {med.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              {/* ------------------------------------------ */}
              {/* ------------ Remover Registro ------------ */}
              {/* ------------------------------------------ */}
              <Grid item textAlign="center" xs={1}>
                <IconButton onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems={'center'}>
              {/* ---------------------------------------- */}
              {/* ------------ Dias da Semana ------------ */}
              {/* ---------------------------------------- */}
              <Grid item xs={11} md={8}>
                <FormControl fullWidth margin="normal">
                  <Controller
                    name={`medications[${index}].days`}
                    control={control}
                    render={({ field }) => (
                      <ToggleButtonGroup
                        color="primary"
                        value={field.value}
                        onChange={(e, newValue) => field.onChange(newValue)}
                        aria-label="days of week"
                        size="medium"
                        fullWidth
                        orientation="horizontal"
                        exclusive={false}
                      >
                        {daysOfWeek.map((day) => (
                          <ToggleButton
                            key={day.id}
                            value={day.id}
                            aria-label={day.name}
                          >
                            {day.letter}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    )}
                  />
                </FormControl>
              </Grid>
              {/* --------------------------------- */}
              {/* ------------ Horário ------------ */}
              {/* --------------------------------- */}
              <Grid item xs={6} sm={4} md={3}>
                <FormControl fullWidth margin="normal">
                  <Controller
                    name={`medications[${index}].time`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="time"
                        label="Horário"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 600,
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() =>
              append({
                nome: '',
                days: [],
                time: '',
              })
            }
          >
            Adicionar Medicamento
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="info" type="submit">
            Salvar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
