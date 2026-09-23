import React from 'react';
import Header from '../components/Header.jsx';
import PainelClima from '../components/PainelClima.jsx';

function Dashboard() {
  return (
    <div className="app-container">
      <Header />
      <main style={{ color: '#fff', padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>✈️ Dashboard Flutuar</h1>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Acompanhamento de voo livre e condições meteorológicas da rampa.</p>
        
        {/* Bloco de Meteorologia com busca interativa */}
        <PainelClima cidadeInicial="Rio de Janeiro" />
      </main>
    </div>
  );
}