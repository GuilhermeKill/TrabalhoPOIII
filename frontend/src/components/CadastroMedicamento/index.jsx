import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import styles from './CadastroMedicamento.module.css';
import {
  getMedicamentoApi,
  cadastrarMedicamentoApi,
  atualizarMedicamentoApi,
} from '../../services/medicamentoApi';

export default function CadastroIdoso({
  atualizarCadastroId,
  onCadastroCompleted,
}) {
  // Nome
  const [nome, setNome] = useState('');
  const [nomeError, setNomeError] = useState(false);

  // Dosagem
  const [quantidade, setQuantidade] = useState('');
  const [quantidadeError, setQuantidadeError] = useState(false);

  // Preço
  const [preco, setPreco] = useState('');
  const [precoError, setPrecoError] = useState(false);

  // Modal concluido
  const [showCompletedModal, setShowCompletedModal] = useState(false);

  // Verifica se o componente está em modo de atualização
  const modoAtualizacao = atualizarCadastroId != null;

  useEffect(() => {
    async function fetchMedicine() {
      if (!modoAtualizacao) return;

      await getMedicamentoApi(atualizarCadastroId, (medicamento) => {
        setNome(medicamento.nomeMedicamento);
        setQuantidade(medicamento.dosagem);
        setPreco(medicamento.preco);
      });
    }

    fetchMedicine();
  }, [atualizarCadastroId, modoAtualizacao]);

  const handleCadastro = async () => {
    if (!nome.trim() || !quantidade.trim()) {
      setNomeError(!nome.trim());
      setQuantidadeError(!quantidade.trim());
      return;
    }

    await cadastrarMedicamentoApi(
      {
        nomeMedicamento: nome,
        dosagem: quantidade,
        preco,
      },
      () => {
        setNome('');
        setQuantidade('');
        setPreco('');

        setShowCompletedModal(true);
      },
      () => {
        console.error('Erro ao cadastrar medicamento');
      },
    );
  };

  async function handleUpdate() {
    await atualizarMedicamentoApi(
      {
        idMedicamento: atualizarCadastroId,
        nomeMedicamento: nome,
        dosagem: quantidade,
        preco,
      },
      () => {
        setShowCompletedModal(true);
      },
      () => {
        console.error('Erro ao atualizar medicamento');
      },
    );
  }

  const handleCloseCompletedModal = () => {
    setShowCompletedModal(false);
    if (onCadastroCompleted) onCadastroCompleted();
    window.location.reload();
  };

  return (
    <>
      <Dialog open={showCompletedModal} onClose={handleCloseCompletedModal}>
        <DialogTitle>
          {modoAtualizacao
            ? 'Cadastro do medicamento atualizado'
            : 'Cadastro do medicamento efetuado'}
        </DialogTitle>
        <DialogContent>
          {modoAtualizacao
            ? 'O medicamento foi atualizado com sucesso.'
            : 'O medicamento foi efetuado com sucesso.'}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCompletedModal} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Container>
        <div className={`${styles.cadastroContent} roundBorders`}>
          <h3>
            {modoAtualizacao
              ? 'Atualizar cadastro do medicamento'
              : 'Cadastrar Medicamento'}
          </h3>
          <Divider />
          <br />
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <TextField
                required
                label="Nome do Medicamento"
                variant="outlined"
                fullWidth
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  setNomeError(false);
                }}
                error={nomeError}
                helperText={nomeError ? 'Campo obrigatório' : ''}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                required
                label="Quantidade"
                variant="outlined"
                fullWidth
                value={quantidade}
                onChange={(e) => {
                  setQuantidade(e.target.value);
                  setQuantidadeError(false);
                }}
                helperText={quantidadeError ? 'Campo obrigatório' : ''}
                error={quantidadeError}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                required
                label="Preço"
                variant="outlined"
                fullWidth
                value={preco}
                onChange={(e) => {
                  setPreco(e.target.value);
                  setPrecoError(false);
                }}
                helperText={precoError ? 'Campo obrigatório' : ''}
                error={precoError}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  padding: '8px 18px',
                }}
                variant="contained"
                color="primary"
                onClick={modoAtualizacao ? handleUpdate : handleCadastro}
              >
                {modoAtualizacao ? 'Atualizar' : 'Cadastrar'}
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
}
