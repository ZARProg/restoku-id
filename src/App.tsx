import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Menu from './pages/Menu';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { menuItems } from './data/dummyData';
import { MenuItem } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [globalMenuItems, setGlobalMenuItems] = useState<MenuItem[]>(menuItems);

  // Function to update menu items globally
  const updateGlobalMenuItems = (updatedMenuItems: MenuItem[]) => {
    setGlobalMenuItems(updatedMenuItems);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return <Orders menuItems={globalMenuItems} />;
      case 'menu':
        return <Menu onMenuUpdate={updateGlobalMenuItems} />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;