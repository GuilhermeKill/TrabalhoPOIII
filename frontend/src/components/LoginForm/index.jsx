import { useState, useEffect } from 'react';
import logoAsilo from '../../images/logoAsilo.svg';
import styles from './Login.module.css';
import { useAuth } from '../../providers/auth.jsx';
import Toast from '../Toast/index.jsx';

function LoginForm() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [toast, setToast] = useState({});

  const showToast = (message, type) => {
    setToast({
      key: Math.random(),
      open: true,
      message,
      type,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, senha);
      showToast('Login efetuado com sucesso', 'success');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } catch (error) {
      showToast('Erro ao fazer login', 'error');
    }
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
    <>
      {toast.open && (
        <Toast key={toast.key} message={toast.message} type={toast.type} />
      )}
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.loginHeader}>
          <img className={styles.icone} src={logoAsilo} alt="Asilo Logo" />
          <h2 className={styles.tituloColor}>Asilo</h2>
          <h2 className={styles.loginTitle}>Login</h2>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            required
            placeholder="Digite seu email"
            defaultValue={localStorage.getItem('email')}
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
            <label htmlFor="lembrar">Lembre de mim</label>
          </div>
          <a href="#" className={styles.link}>
            Esqueceu a senha?
          </a>
        </div>
        <button type="submit" className={styles.submitButton}>
          Entrar
        </button>
        <div className={styles.links}>
          <span>Não tem uma conta?</span>
          <a href="cadastrarLogin" className={styles.links}>
            Crie uma conta
          </a>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
