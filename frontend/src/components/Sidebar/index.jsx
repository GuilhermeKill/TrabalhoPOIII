import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useNavigate } from '../../router.ts';
import styles from './Sidebar.module.css';

import HamburguerIcon from '/icons/sidebar/hamburger.svg';
import DashboardIcon from '/icons/sidebar/dashboard.svg';
import PacientesIcon from '/icons/sidebar/people.svg';
import ConsultaIcon from '/icons/sidebar/consulta.svg';
import AlertaIcon from '/icons/sidebar/alerta.svg';
import MedicamentoIcon from '/icons/sidebar/medicamento2.svg';

const menuItems = [
  { name: 'Dashboard', icon: DashboardIcon, key: 'dashboard' },
  { name: 'Residentes', icon: PacientesIcon, key: 'residentes' },
  { name: 'Medicamentos', icon: MedicamentoIcon, key: 'medicamentos' },
  { name: 'Consultas', icon: ConsultaIcon, key: 'consultas' },
  { name: 'Alertas', icon: AlertaIcon, key: 'alertas' },
];

function containsPageId(pageId) {
  if (pageId == null) {
    console.error('pageId is null');
  }
  return menuItems.some(
    (menuItem) => menuItem.key.toLowerCase() === pageId.toLowerCase(),
  );
}

function compareMenuItem(pageId, menuItemKey) {
  return pageId.toLowerCase() === menuItemKey.toLowerCase();
}

export default function Sidebar({ selectedPageId, onMenuItemClick, innerRef }) {
  // Expansao
  const [isExpanded, setIsExpanded] = useState(true);
  // Navegacao
  const navigate = useNavigate();

  if (!containsPageId(selectedPageId)) {
    return <></>;
  }

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMenuItemClick = (menuItem) => {
    navigate(`/${menuItem}`);
    if (onMenuItemClick) onMenuItemClick(menuItem);
  };

  return (
    <div
      className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}
      ref={innerRef}
    >
      <div className={styles.toggleBtn} onClick={toggleSidebar}>
        <ReactSVG
          className={styles.collapseIcon}
          src={HamburguerIcon}
          alt=">>"
        />
      </div>
      <ul>
        {menuItems.map((menuItem) => (
          <li
            key={menuItem.key}
            className={
              compareMenuItem(selectedPageId, menuItem.key) ? styles.active : ''
            }
            onClick={() => handleMenuItemClick(menuItem.key)}
          >
            <div className={styles.highlight}></div>
            <div className={styles.iconArea}>
              <ReactSVG
                className={styles.icon}
                src={menuItem.icon}
                alt={menuItem.name}
              />
            </div>
            <span
              className={`${styles.text} ${isExpanded ? styles.expanded : ''}`}
            >
              {menuItem.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
