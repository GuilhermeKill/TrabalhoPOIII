/* eslint-disable radix */
import { useState } from 'react';
import {
  TextField,
  IconButton,
  Grid,
  InputAdornment,
  Typography,
  Button,
  Autocomplete,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import styles from './MedicamentoResidenteForm.module.css';
import MedicamentoSelector from '../MedicamentoSelector/index.jsx';
import { cadastrarMedicacaoPacienteApi } from '../../../services/medicacaoResidenteApi';

import DividerBold from '../../Misc/DividerBold.jsx';
import FailedModal from '../../Modal/FailedModal.jsx';
import SuccessModal from '../../Modal/SuccessModal.jsx';

export default function MedicamentoResidenteForm({
  residenteId,
  onCadastroCompleted,
}) {
  // Campos
  const [medicamentoId, setMedicamentoId] = useState(null);
  const [intervalo, setIntervalo] = useState(8); // 8h default
  const [quantidade, setQuantidade] = useState(1);
  const [viaAdministracao, setViaAdministracao] = useState('');
  const [observacao, setObservacao] = useState('');

  // Campos validação
  const [medicamentoError, setMedicamentoError] = useState(false);
  const [viaAdministracaoError, setViaAdministracaoError] = useState(false);
  const [observacaoError, setObservacaoError] = useState(false);

  // Modal concluido
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  function validaTodosCampos() {
    const medicamentoValido = medicamentoId != null;
    const intervaloValido = intervalo != null;
    const quantidadeValido = quantidade != null;
    const viaAdmValido = viaAdministracao && viaAdministracao.trim();
    const observacaoValido = observacao && observacao.trim();

    setMedicamentoError(!medicamentoValido);
    setViaAdministracaoError(!viaAdmValido);
    setObservacaoError(!observacaoValido);

    return (
      medicamentoValido &&
      intervaloValido &&
      quantidadeValido &&
      viaAdmValido &&
      observacaoValido
    );
  }

  const resetFields = () => {
    setMedicamentoId(null);
    setIntervalo(8);
    setQuantidade(1);
    setViaAdministracao('');
    setObservacao('');
  };

  const onCadastroSuccess = (data) => {
    console.log('Cadastro com sucesso ', data);
    resetFields();

    // Popup cadastro completo
    setShowCompletedModal(true);
  };

  const onCadastroFailed = () => {
    console.error('Cadastro failed ');

    setShowFailedModal(true);
  };

  const closeMedicamentoError = () => {
    setMedicamentoError(false);
  };

  const handleCloseCompletedModal = () => {
    setShowCompletedModal(false);
    if (onCadastroCompleted) onCadastroCompleted();
  };

  const handleCloseFailedModal = () => {
    setShowFailedModal(false);
  };

  const handleCadastro = () => {
    if (!validaTodosCampos()) return;

    const newData = {
      idMedicamento: medicamentoId,
      idResidente: residenteId,
      quantidadeTempoHoras: intervalo,
      quantidadeTempoDias: quantidade,
      dataHoraInicioMedicamento: new Date().toISOString(),
      viaAdministracao,
      observacao,
    };
    cadastrarMedicacaoPacienteApi(newData, onCadastroSuccess, onCadastroFailed);
    console.log(newData);
  };

  const handleIntervaloChange = (value) => {
    if (/^\d*$/.test(value) && value >= 1 && value <= 24) {
      setIntervalo(value);
    }
  };

  const handleQuantidadeChange = (value) => {
    if (value == null || value === '') {
      setQuantidade(1);
    }
    if (/^\d*$/.test(value) && value >= 1 && value <= 999) {
      setQuantidade(value);
    }
  };

  const incrementQuantidade = (offset) => {
    handleQuantidadeChange(parseInt(quantidade) + parseInt(offset));
  };

  const incrementIntervalo = (offset) => {
    handleIntervaloChange(parseInt(intervalo) + parseInt(offset));
  };

  const currentDate = new Date().toISOString().slice(0, 16);

  // idealmente seria puxado do backend, porém ainda não há um endpoint para isso
  const viaAdministracaoOpcoes = [
    { nome: 'Oral' },
    { nome: 'Sublingual' },
    { nome: 'Retal' },
    { nome: 'Intravenosa' },
    { nome: 'Intramuscular' },
    { nome: 'Subcutânea' },
    { nome: 'Intradérmica' },
    { nome: 'Intra-arterial' },
    { nome: 'Intracardíaca' },
    { nome: 'Cutânea' },
    { nome: 'Respiratória' },
    { nome: 'Conjuntival' },
  ];

  return (
    <>
      {/* Modal medicamento error */}
      <FailedModal
        open={medicamentoError}
        title="Nenhum medicamento selecionado"
        message="O medicamento precisa ser selecionado para continuar."
        onModalClosedCallback={closeMedicamentoError}
      />

      {/* Modal cadastro falhou */}
      <FailedModal
        open={showFailedModal}
        title="Falha no registro"
        message="O registro da medicação falhou. Por favor, tente novamente."
        onModalClosedCallback={handleCloseFailedModal}
      />

      {/* Modal cadastro efetuado */}
      <SuccessModal
        open={showCompletedModal}
        title="Registro efetuado"
        message="A medicação foi registrada com sucesso."
        onModalClosedCallback={handleCloseCompletedModal}
      />

      <div className={`${styles.cadastroContent} roundBorders`}>
        <Typography variant="h4">Inserir Medicação</Typography>
        <DividerBold />
        <br />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MedicamentoSelector
              onMedSelected={(id) => {
                setMedicamentoId(id);
              }}
              medicamentoId={medicamentoId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <TextField
              id="dataHora"
              label="Primeira dose"
              type="datetime-local"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={currentDate}
            />
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={12}
            md={7}
            spacing={2}
            justifyContent={'start'}
            alignItems={'center'}
          >
            {/* ------------------------ */}
            {/* ------ Quantidade ------ */}
            {/* ------------------------ */}

            <Grid item xs={12} sm={6}>
              <TextField
                id="quantidade"
                label="Quantidade Dias"
                fullWidth
                sx={{ input: { textAlign: 'center' }, alignSelf: 'end' }}
                value={quantidade}
                onChange={(e) => {
                  handleQuantidadeChange(e.target.value);
                }}
                onFocus={(event) => {
                  event.target.select();
                }}
                inputProps={{
                  min: 1,
                  max: 24,
                  type: 'number',
                  pattern: '[0-9]*',
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="decrease"
                        onClick={() => {
                          incrementQuantidade(-1);
                        }}
                      >
                        <Remove />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="increase"
                        onClick={() => {
                          incrementQuantidade(1);
                        }}
                      >
                        <Add />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* ------------------------ */}
            {/* ------ Intervalo ------ */}
            {/* ------------------------ */}
            <Grid item xs={12} sm={6}>
              {/* <Select
            labelId="intervalo-label"
            id="intervalo"
            value={intervalo}
            onChange={(e) => setIntervalo(e.target.value)}
          >
            {Array.from({ length: 24 }, (_, i) => i + 1).map((value) => (
              <MenuItem
                key={value}
                value={value}
              >{`${value} hora${value > 1 ? 's' : ''}`}</MenuItem>
            ))}
          </Select> */}

              {/* <Select
            labelId="intervalo-label"
            id="intervalo"
            fullWidth
            value={intervalo}
            onChange={(e) => setIntervalo(e.target.value)}
            inputProps={{
              min: 1,
              max: 24,
              type: 'number',
              IconComponent: () => null,
            }}
            input={<Input />}
            startAdornment={
              <IconButton
                aria-label="decrease"
                onClick={() => {
                  if (intervalo > 1) {
                    setIntervalo(intervalo - 1);
                  }
                }}
              >
                <RemoveIcon />
              </IconButton>
            }
            endAdornment={
              <IconButton
                aria-label="increase"
                onClick={() => {
                  if (intervalo < 24) {
                    setIntervalo(intervalo + 1);
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            }
          >
            {Array.from({ length: 24 }, (_, i) => i + 1).map((value) => (
              <MenuItem
                key={value}
                value={value}
              >{`${value} hora${value > 1 ? 's' : ''}`}</MenuItem>
            ))}
          </Select> */}

              <TextField
                disabled={quantidade < 1}
                id="intervalo"
                label="Intervalo (h)"
                fullWidth
                sx={{
                  input: { textAlign: 'center' },
                  alignSelf: 'end',
                  opacity: quantidade < 1 ? 0.25 : 1,
                }}
                value={intervalo}
                onChange={(e) => {
                  handleIntervaloChange(e.target.value);
                }}
                onFocus={(event) => {
                  event.target.select();
                }}
                inputProps={{
                  min: 1,
                  max: 24,
                  type: 'number',
                  pattern: '[0-9]*',
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        disabled={quantidade < 1}
                        aria-label="decrease"
                        onClick={() => {
                          incrementIntervalo(-1);
                        }}
                      >
                        <Remove />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        disabled={quantidade < 1}
                        aria-label="increase"
                        onClick={() => {
                          incrementIntervalo(1);
                        }}
                      >
                        <Add />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* Via Administração */}
          <Grid item xs={12} sm={12} md={5}>
            <Autocomplete
              freeSolo
              options={
                viaAdministracaoOpcoes
                  ? viaAdministracaoOpcoes.map((option) => option.nome).sort()
                  : []
              }
              value={viaAdministracao}
              onChange={(e, value) => {
                setViaAdministracao(value);
                setViaAdministracaoError(false);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  id="via"
                  label="Via de Administração"
                  type="text"
                  fullWidth
                  value={viaAdministracao}
                  onChange={(e) => {
                    setViaAdministracao(e.target.value);
                    setViaAdministracaoError(false);
                  }}
                  helperText={viaAdministracaoError ? 'Campo obrigatório' : ''}
                  error={viaAdministracaoError}
                />
              )}
            />
          </Grid>

          {/* Observação */}
          <Grid item xs={12} sm={12} md={7}>
            <TextField
              required
              multiline
              id="observacao"
              label="Observação"
              type="text"
              fullWidth
              value={observacao}
              onChange={(e) => {
                setObservacao(e.target.value);
                setObservacaoError(false);
              }}
              helperText={observacaoError ? 'Campo obrigatório' : ''}
              error={observacaoError}
            />
          </Grid>
          {/* Botão Cadastrar */}
          <Grid item xs={12} style={{ textAlign: 'center', marginTop: 8 }}>
            <Button
              style={{
                fontSize: '20px',
                padding: '8px 18px',
              }}
              variant="contained"
              color="primary"
              onClick={handleCadastro}
            >
              <Typography variant="h5">Inserir Medicação</Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
