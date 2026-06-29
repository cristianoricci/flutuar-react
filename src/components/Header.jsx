import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {

  const location = useLocation();


  const verificarAtivo = (caminho) => {
    return location.pathname === caminho ? '#2e6fad' : 'transparent';
  };

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 2rem', 
      backgroundColor: '#1a1a1a', 
      borderBottom: '1px solid #2e6fad' 
    }}>
      <div className="logo">
        <h1 style={{ color: '#fff', margin: 0, fontSize: '1.5rem' }}>🪂 Flutuar</h1>
      </div>
      
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ 
          color: '#fff', 
          textDecoration: 'none', 
          padding: '0.5rem 1rem', 
          borderRadius: '4px',
          backgroundColor: verificarAtivo('/') // <-- Linha 33 que estava quebrando
        }}>
          Dashboard
        </Link>
        
        <Link to="/alunos" style={{ 
          color: '#fff', 
          textDecoration: 'none', 
          padding: '0.5rem 1rem', 
          borderRadius: '4px',
          backgroundColor: verificarAtivo('/alunos') 
        }}>
          Gerenciar Alunos
        </Link>
      </nav>
    </header>
  );
}

export default Header;