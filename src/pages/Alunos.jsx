import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import StatsBar from '../components/StatsBar.jsx';
import FilterBar from '../components/FilterBar.jsx';
import Modal from '../components/Modal.jsx';
import AlunoCard from '../components/AlunoCard.jsx';

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState(false);

  const [filtro, setFiltro] = useState('todos');
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();

  // Carrega os dados uma única vez, quando o componente é montado
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('alunos_flutuar');

    if (dadosSalvos) {
      // Já existe dado salvo localmente (ex: aluno cadastrado antes) -> usa direto
      setAlunos(JSON.parse(dadosSalvos));
      setCarregando(false);
    } else {
      // SIMULA UMA REQUISIÇÃO A UM SERVIDOR:
      // em vez de um backend real, lemos um arquivo JSON estático
      fetch('/data/alunos.json')
        .then(resposta => resposta.json())
        .then(dados => {
          // setTimeout aqui simula o tempo de espera de uma rede real
          setTimeout(() => {
            setAlunos(dados);
            setCarregando(false);
          }, 800);
        })
        .catch(erro => {
          console.error('Erro ao carregar alunos:', erro);
          setErroCarregamento(true);
          setCarregando(false);
        });
    }
  }, []); // <-- array vazio: roda só uma vez, quando a página carrega

  // Salva no localStorage sempre que a lista mudar (exceto durante o carregamento inicial)
  useEffect(() => {
    if (!carregando) {
      localStorage.setItem('alunos_flutuar', JSON.stringify(alunos));
    }
  }, [alunos, carregando]);

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

        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="🔍 Buscar piloto pelo nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            title="Digite o nome do piloto para filtrar a listagem abaixo"
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

        {/* ESTADO DE CARREGAMENTO */}
        {carregando ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#aaa' }}>
            <p>🪂 Carregando lista de pilotos...</p>
          </div>
        ) : erroCarregamento ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#ff8080' }}>
            <p>⚠️ Erro ao carregar os dados. Tente novamente mais tarde.</p>
          </div>
        ) : alunosFiltrados.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px dashed #2e6fad' }}>
            <p style={{ color: '#aaa', fontSize: '1.2rem' }}>🪂 Nenhum piloto ou aluno encontrado com esses filtros.</p>
          </div>
        ) : (
          <div id="lista-alunos">
            {alunosFiltrados.map(aluno => (
              <AlunoCard
                key={aluno.id}
                aluno={aluno}
                onVerFicha={(id) => navigate(`/alunos/${id}`)}
              />
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