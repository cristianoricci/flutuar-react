import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import Header from '../components/Header.jsx'; 
import StatsBar from '../components/StatsBar.jsx'; 
import FilterBar from '../components/FilterBar.jsx';
import Modal from '../components/Modal.jsx';

const listaInicial = [
  { id: 1, nome: "Mariana Santos", curso: "Iniciante", telefone: "35 9999-8888" },
  { id: 2, nome: "Cristiano Alvarenga", curso: "Cross", telefone: "35 9888-7777" },
  { id: 3, nome: "Rodrigo Melo", curso: "Voo Duplo", telefone: "11 9777-6666" }
];

function Alunos() {
  const [alunos, setAlunos] = useState(() => {
    const dadosSalvos = localStorage.getItem('alunos_flutuar');
    return dadosSalvos ? JSON.parse(dadosSalvos) : listaInicial;
  });

  const [filtro, setFiltro] = useState('todos');
  const [busca, setBusca] = useState(''); // NOVO ESTADO: Guarda o texto digitado na busca
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('alunos_flutuar', JSON.stringify(alunos));
  }, [alunos]); 

  // FILTRAGEM DUPLA: Filtra por curso E por nome digitado ao mesmo tempo
  const alunosFiltrados = alunos.filter(aluno => {
    const matchesCurso = filtro === 'todos' || aluno.curso === filtro;
    const matchesBusca = aluno.nome.toLowerCase().includes(busca.toLowerCase());
    return matchesCurso && matchesBusca;
  });
  
  const adicionarAluno = (novoAluno) => {
    const proximoId = alunos.length > 0 
    ? Math.max(...alunos.map(aluno => Number(aluno.id))) + 1 
    : 1;
    const alunoComId = { ...novoAluno, id: proximoId };
    setAlunos([...alunos, alunoComId]);
    setModalAberto(false);
  };

  return (
    <div className="app-container">
      <Header />
      <StatsBar listaDeAlunos={alunos} />
      <FilterBar setFiltro={setFiltro} setModalAberto={setModalAberto} />

      <main style={{ padding: '2rem' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Lista de Alunos Registrados</h2>
        
        {/* NOVO: Campo de Busca com Tooltip nativo (title) */}
        <div style={{ marginBottom: '1.5rem' }}>
          <input 
            type="text"
            placeholder="🔍 Buscar piloto pelo nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            title="Digite o nome do piloto para filtrar a listagem abaixo" // Tooltip
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '0.75rem',
              borderRadius: '6px',
              border: '1px solid #2e6fad',
              backgroundColor: 'rgba(0,0,0,0.3)',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* REQUISITO DE USABILIDADE: Mensagem condicional caso não encontre ninguém */}
        {alunosFiltrados.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px dashed #2e6fad' }}>
            <p style={{ color: '#aaa', fontSize: '1.2rem' }}>🪂 Nenhum piloto ou aluno encontrado com esses filtros.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
            {alunosFiltrados.map(aluno => (
              <div key={aluno.id} style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid #2e6fad', padding: '1rem', borderRadius: '8px', color: '#fff' }}>
                <h3>{aluno.nome}</h3>
                <p>Curso: <strong>{aluno.curso}</strong></p>
                <p>Contato: {aluno.telefone}</p>
                <button 
                  onClick={() => navigate(`/alunos/${aluno.id}`)}
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#2e6fad',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Ver Ficha Completa
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {modalAberto && (
  <Modal
    isOpen={modalAberto}
    onClose={() => setModalAberto(false)}
    onSave={adicionarAluno} 
  />
)}
    </div>
  );
}

export default Alunos;