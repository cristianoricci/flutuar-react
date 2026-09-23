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
  const [alunoParaEditar, setAlunoParaEditar] = useState(null);
  const [filtro, setFiltro] = useState('todos');
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();

  const abrirModalEdicao = (aluno) => {
    setAlunoParaEditar(aluno); // Guarda o piloto selecionado
    setModalAberto(true);      // Reusa o nosso modal já existente!
  };

  const abrirModalNovoCadastro = () => {
    setAlunoParaEditar(null); // Garante que o formulário venha limpo
    setModalAberto(true);
  };

  // 1. Carrega a lista de alunos
  const carregarAlunos = () => {
    setCarregando(true);
    setErroCarregamento(false);

    fetch('http://localhost:5000/buscar_alunos')
      .then((resposta) => {
        if (!resposta.ok) throw new Error('Erro na requisição com a API');
        return resposta.json();
      })
      .then((dados) => {
        const lista = Array.isArray(dados) ? dados : (dados.alunos || []);
        setAlunos(lista);
        setCarregando(false);
      })
      .catch((erro) => {
        console.error('Erro ao carregar alunos do Back-End:', erro);
        setErroCarregamento(true);
        setCarregando(false);
      });
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  const alunosFiltrados = alunos.filter((aluno) => {
    const matchesCurso = filtro === 'todos' || aluno.curso === filtro;
    const matchesBusca = (aluno.nome || '').toLowerCase().includes(busca.toLowerCase());
    return matchesCurso && matchesBusca;
  });

  // 2. Cadastra novo aluno
  const adicionarAluno = (novoAluno) => {
    fetch('http://localhost:5000/cadastrar_aluno', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoAluno),
    })
      .then((resposta) => {
        if (!resposta.ok) throw new Error('Erro ao salvar aluno');
        return resposta.json();
      })
      .then(() => {
        setModalAberto(false);
        carregarAlunos();
      })
      .catch((erro) => {
        console.error('Erro ao cadastrar aluno:', erro);
        alert('Erro ao cadastrar aluno na API.');
      });
  };

  // Função para deletar aluno na API Flask
  const deletarAluno = (id, nome) => {
    const confirmou = window.confirm(`Tem certeza que deseja remover o piloto ${nome}?`);
    
    if (!confirmou) return;

    fetch(`http://localhost:5000/deletar_aluno/${id}`, {
      method: 'DELETE',
    })
      .then((resposta) => {
        if (!resposta.ok) throw new Error('Erro ao deletar aluno');
        return resposta.json();
      })
      .then(() => {
        setAlunos((listaAtual) => listaAtual.filter((aluno) => aluno.id !== id));
        alert('Piloto removido com sucesso!');
      })
      .catch((erro) => {
        console.error('Erro ao deletar aluno:', erro);
        alert('Não foi possível deletar o aluno.');
      });
  };

  // Função para enviar as alterações via PUT para o Flask
  const salvarEdicaoAluno = (alunoAtualizado) => {
    fetch(`http://localhost:5000/atualizar_aluno/${alunoAtualizado.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(alunoAtualizado),
    })
      .then((resposta) => {
        if (!resposta.ok) throw new Error('Erro ao atualizar aluno');
        return resposta.json();
      })
      .then(() => {
        alert('Piloto atualizado com sucesso!');
        setModalAberto(false);      // Fecha o modal
        setAlunoParaEditar(null);   // Limpa o piloto que estava em edição
        carregarAlunos();           // Recarrega a lista para mostrar os dados novos
      })
      .catch((erro) => {
        console.error('Erro ao atualizar aluno:', erro);
        alert('Não foi possível atualizar o aluno.');
      });
  };

  return (
    <div className="app-container">
      <Header />
      <StatsBar listaDeAlunos={alunos} /> 
      <FilterBar 
        filtro={filtro} 
        setFiltro={setFiltro} 
        setModalAberto={abrirModalNovoCadastro} 
      />

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
              fontSize: '1rem',
            }}
          />
        </div>

        {carregando ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#aaa' }}>
            <p>🪂 Carregando lista de pilotos do servidor Docker...</p>
          </div>
        ) : erroCarregamento ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#ff8080' }}>
            <p>⚠️ Erro ao conectar com o servidor API (http://localhost:5000/buscar_alunos). Verifique se o container está ativo.</p>
          </div>
        ) : alunosFiltrados.length === 0 ? (
          <div
            style={{
              padding: '2rem',
              textAlign: 'center',
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              border: '1px dashed #2e6fad',
            }}
          >
            <p style={{ color: '#aaa', fontSize: '1.2rem' }}>
              🪂 Nenhum piloto ou aluno encontrado.
            </p>
          </div>
        ) : (
          <div id="lista-alunos">
            {alunosFiltrados.map((aluno) => (
              <AlunoCard
                key={aluno.id}
                aluno={aluno}
                onVerFicha={(id) => navigate(`/alunos/${id}`)}
                onDeletar={(id, nome) => deletarAluno(id, nome)}
                onEditar={(alunoSelecionado) => abrirModalEdicao(alunoSelecionado)}
              />
            ))}
          </div>
        )}
      </main>

      {modalAberto && (
        <Modal
          isOpen={modalAberto}
          onClose={() => {
            setModalAberto(false);
            setAlunoParaEditar(null);
          }}
          onSave={alunoParaEditar ? salvarEdicaoAluno : adicionarAluno}
          alunoParaEditar={alunoParaEditar}
        />
      )}
    </div>
  );
}

export default Alunos;