import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';

function DetalhesAluno() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dadosSalvos = localStorage.getItem('alunos_flutuar');
  const alunos = dadosSalvos ? JSON.parse(dadosSalvos) : [];
  const aluno = alunos.find(a => a.id === Number(id));

 
  if (!aluno) {
    return (
      <div className="app-container" style={{ color: '#fff', padding: '2rem', textAlign: 'center' }}>
        <Header />
        <h2>Piloto não encontrado!</h2>
        <button onClick={() => navigate('/alunos')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#2e6fad', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Voltar para Lista
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      
      <main style={{ padding: '2rem', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      {/* Botão Voltar usando o useNavigate */}
<button 
  onClick={() => navigate('/alunos')} 
  style={{
    display: 'inline-flex',     
    alignItems: 'center',       
    backgroundColor: 'transparent',
    border: '1px solid #2e6fad',
    color: '#2e6fad',
    padding: '0.6rem 1.2rem',   
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '2rem',
    fontSize: '1rem'            
  }}
>
  
  <span style={{ 
    fontSize: '1.5rem',         
    marginRight: '0.6rem',      
    lineHeight: '0'             
  }}>
    ←
  </span> 
  Voltar para a Listagem
</button>

        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid #2e6fad' }}>
          <h1 style={{ borderBottom: '2px solid #2e6fad', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            Ficha do Piloto
          </h1>
          
          <p style={{ fontSize: '1.2rem' }}>Nome: <strong>{aluno.nome}</strong></p>
          <p style={{ fontSize: '1.2rem' }}>Curso Atual: <span style={{ color: '#ffcc00', fontWeight: 'bold' }}>{aluno.curso}</span></p>
          <p style={{ fontSize: '1.2rem' }}>Telefone de Contato: {aluno.telefone}</p>
          
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(46, 111, 173, 0.1)', borderRadius: '6px', fontSize: '0.9rem', color: '#aaa' }}>
            <strong>Status de Matrícula:</strong> Ativo na Escola Flutuar Parapente.
          </div>
        </div>
      </main>
    </div>
  );
}

export default DetalhesAluno;