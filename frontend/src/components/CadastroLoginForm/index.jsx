import { useState, useEffect } from 'react';
import logoAsilo from '../../images/logoAsilo.svg';
import styles from '../LoginForm/Login.module.css';

function CadastroLoginForm() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nomeCompleto);
    console.log(email);
    console.log(senha);
  };

  // Função para adicionar classe ao body quando o componente for montado
  useEffect(() => {
    document.body.classList.add(styles.bodyLogin);
    // Retorna uma função para remover a classe quando o componente for desmontado
    return () => {
      document.body.classList.remove(styles.bodyLogin);
    };
  }, []); // [] indica que o efeito só deve ser executado uma vez, equivalente a componentDidMount

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className={styles.loginHeader}>
        <img className={styles.icone} src={logoAsilo} alt="Asilo Logo" />
        <h2 className={styles.tituloColor}>Asilo</h2>
        <h2 className={styles.loginTitle}>Nova conta</h2>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="nomeCompleto">Nome Completo</label>
        <input
          type="text"
          id="nomeCompleto"
          required
          placeholder="Digite seu nome completo"
          onChange={(e) => setNomeCompleto(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
          placeholder="Digite seu email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          required
          placeholder="Digite sua senha"
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      <div className={styles.checkboxGroup}>
        <div className={styles.checkboxArea}>
          <input type="checkbox" id="lembrar" />
          <label htmlFor="lembrar">
            Eu aceito os <a href="#">Termos & Confições</a>
          </label>
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        Criar Conta
      </button>
      <div className={styles.links}>
        <span>Já possui uma conta?</span>
        <a href="/login">Login</a>
      </div>
    </form>
  );
}

export default CadastroLoginForm;
