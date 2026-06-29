import React from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';

import Alunos from './pages/Alunos.jsx';
import Header from './components/Header.jsx';

// 1. LISTA DE DADOS COMPARTILHADA (Colocada aqui fora para ambas as telas terem acesso)
const listaAlunosGlobal = [
  { id: 1, nome: "Mariana Santos", curso: "Iniciante", telefone: "35 9999-8888" },
  { id: 2, nome: "Cristiano Alvarenga", curso: "Cross", telefone: "35 9888-7777" },
  { id: 3, nome: "Rodrigo Melo", curso: "Voo Duplo", telefone: "11 9777-6666" }
];

function DetalhesAluno() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dadosSalvos = localStorage.getItem('alunos_flutuar');
  const alunosReais = dadosSalvos ? JSON.parse(dadosSalvos) : listaAlunosGlobal;
  const alunoEncontrado = alunosReais.find(aluno => aluno.id === Number(id));

  if (!alunoEncontrado) {
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
        <h1 style={{ color: '#2e6fad', margin: '1rem 0' }}>{alunoEncontrado.nome}</h1>
        
        <div style={{ border: '1px solid #333', padding: '1.5rem', borderRadius: '8px', background: '#222' }}>
          <p><strong>Curso Matriculado:</strong> {alunoEncontrado.curso}</p>
          <p><strong>Telefone de Contato:</strong> {alunoEncontrado.telefone}</p>
          <p><strong>ID do Sistema:</strong> {id}</p>
          <hr style={{ borderColor: '#333', margin: '1rem 0' }} />
          <p><strong>Status do Seguro CBVL:</strong> Ativo ✓</p>
          <p><strong>Localidade Base:</strong> Poços de Caldas, MG</p>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="app-container">
      <Header />
      <div style={{ color: '#fff', padding: '2rem' }}>
        <h1>✈️ Dashboard Flutuar</h1>
        <p>Bem-vindo ao painel de controle de Voo Livre.</p>
      </div>
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