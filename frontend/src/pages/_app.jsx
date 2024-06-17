import { Outlet, useLocation } from 'react-router-dom';
import PageContent from '../components/PageContent/index.jsx';
import ThemeProvider from '../theme/index.jsx';

export default function App() {
  const ignorePageContent = ['login', 'cadastrarLogin', '']; // ultimo item é para a página inicial
  const location = useLocation();
  const pathName = location.pathname.split('/')[1]; // pega a URL depois do primeiro '/' e antes do segundo '/'
  console.log(`PathName: ${pathName}`);

  // ignora PageContent para páginas específicas
  if (ignorePageContent.includes(pathName)) {
    return (
      <main>
        <Outlet />
      </main>
    );
  }

  return (
    <ThemeProvider>
      <PageContent currentPageId={pathName}>
        <Outlet />
      </PageContent>
    </ThemeProvider>
  );
}
