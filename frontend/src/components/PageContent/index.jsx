import { useRef, useEffect, useState } from 'react';
import Sidebar from '../Sidebar/index.jsx';
import styles from './PageContent.module.css';
// import { Breadcrumbs, Link, Typography } from '@mui/material';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function PageContent({ children, currentPageId }) {
  // Usado para dimensionar a area do conteudo baseado no tamanho da sidebar
  const sidebarRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState(0);

  // atualiza a margem da sidebar
  const handleResize = () => {
    if (!sidebarRef.current) return;
    setSidebarWidth(sidebarRef.current.offsetWidth);
    console.log(`Sidebar width: ${sidebarRef.current.offsetWidth}`);
    // const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    // console.log(`Scrollbar width: ${scrollbarWidth}`);
  };

  // observa quando o tamanho da sidebar mudar
  useEffect(() => {
    if (!sidebarRef.current) return false;
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(sidebarRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  // melhor approach
  const contentStylePadding = {
    paddingLeft: `${sidebarWidth}px`, // Define a margem esquerda igual à largura da sidebar
  };

  // Função para adicionar classe ao body quando o componente for montado
  useEffect(() => {
    document.body.classList.add(styles.pageContentBody);
    // Retorna uma função para remover a classe quando o componente for desmontado
    return () => {
      document.body.classList.remove(styles.pageContentBody);
    };
  }, []); // [] indica que o efeito só deve ser executado uma vez, equivalente a componentDidMount

  return (
    <>
      <Sidebar selectedPageId={currentPageId} innerRef={sidebarRef} />
      <div style={contentStylePadding}>
        <div className={styles.pageContent}>
          {/* <Breadcrumbs
          aria-label="breadcrumb"
          className="flex-align-start"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          <Typography color="text.primary">Asilo</Typography>
          <Link underline="hover" color="inherit" href="#">
          Cadastrar Paciente
          </Link>
        </Breadcrumbs> */}
          {children}
        </div>
      </div>
      <br />
    </>
  );
}
