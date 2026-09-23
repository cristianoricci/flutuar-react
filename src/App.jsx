import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';

import Alunos from './pages/Alunos.jsx';
import Header from './components/Header.jsx';
import PainelClima from './components/PainelClima.jsx';

function DetalhesAluno() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    // Ajustado para bater exatamente com a rota @app.route('/aluno/<int:aluno_id>') do seu app.py
    fetch(`http://localhost:5000/aluno/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Aluno não encontrado');
        return res.json();
      })
      .then((data) => {
        setAluno(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar ficha:", err);
        setErro(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="app-container">
        <Header />
        <div style={{ color: '#fff', padding: '2rem', textAlign: 'center' }}>
          <h2>Carregando ficha do piloto...</h2>
        </div>
      </div>
    );
  }

  if (erro || !aluno) {
    return (
      <div className="app-container">
        <Header />
        <div style={{ color: '#fff', padding: '2rem', textAlign: 'center' }}>
          <h2>Aluno não encontrado no sistema Flutuar.</h2>
          <button 
            onClick={() => navigate('/alunos')} 
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#2e6fad', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Voltar para Lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      <div style={{ color: '#fff', padding: '2rem', backgroundColor: '#1a1a1a', minHeight: '80vh' }}>
        <button 
          onClick={() => navigate('/alunos')} 
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #2e6fad',
            color: '#2e6fad',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginBottom: '1.5rem'
          }}
        >
          ← Voltar para a Listagem
        </button>

        <h2>Ficha Cadastral do Piloto</h2>
        <h1 style={{ color: '#2e6fad', margin: '1rem 0' }}>{aluno.nome}</h1>
        
        <div style={{ border: '1px solid #333', padding: '1.5rem', borderRadius: '8px', background: '#222' }}>
          <p><strong>Curso Matriculado:</strong> {aluno.curso}</p>
          <p><strong>Telefone de Contato:</strong> {aluno.telefone}</p>
          <p><strong>E-mail:</strong> {aluno.email}</p>
          <p><strong>Nível IPPI:</strong> {aluno.nivel_ippi || 'Não informado'}</p>
          <p><strong>ID do Sistema:</strong> {aluno.id}</p>
          <hr style={{ borderColor: '#333', margin: '1rem 0' }} />
          <p><strong>Observações:</strong> {aluno.observacoes || 'Sem observações cadastradas'}</p>
          <p><strong>Data de Cadastro:</strong> {aluno.data_cadastro}</p>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="app-container">
      <Header />
      <main style={{ color: '#fff', padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>✈️ Dashboard Flutuar</h1>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Bem-vindo ao painel de controle de Voo Livre.</p>
        
        <PainelClima cidadeInicial="Rio de Janeiro" />
      </main>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ color: '#fff', padding: '3rem', textAlign: 'center' }}>
      <h1>🛑 Erro 404</h1>
      <p>Espaço aéreo não encontrado.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/alunos/:id" element={<DetalhesAluno />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;