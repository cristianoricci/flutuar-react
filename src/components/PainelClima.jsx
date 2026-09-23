import React, { useState, useEffect } from 'react';

function PainelClima({ cidadeInicial = 'Rio de Janeiro' }) {
  const [cidade, setCidade] = useState(cidadeInicial);
  const [cidadeBusca, setCidadeBusca] = useState(cidadeInicial);
  const [clima, setClima] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Função para sanitizar e higienizar a entrada do usuário
  const sanitizarInput = (texto) => {
    // Remove tags HTML/scripts, mantendo letras, acentos, números, espaços e hífen
    return texto
      .replace(/<[^>]*>?/gm, '') 
      .replace(/[^a-zA-Z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s-]/g, '')
      .trim();
  };

  // Função para buscar o clima na API Flask
  const buscarClima = (nomeCidade) => {
    setCarregando(true);
    setErro(null);

    // Encode seguro para acentuação na URL
    const urlCidade = encodeURIComponent(nomeCidade);

    fetch(`http://localhost:5000/clima?cidade=${urlCidade}`)
      .then((res) => {
        if (!res.ok) throw new Error('Não foi possível obter os dados da cidade informada.');
        return res.json();
      })
      .then((dados) => {
        if (dados.erro) {
          throw new Error(dados.erro);
        }
        setClima(dados);
        setCarregando(false);
      })
      .catch((err) => {
        console.error('Erro ao conectar com API de Clima:', err);
        setErro(err.message || 'Erro de comunicação com o servidor.');
        setCarregando(false);
      });
  };

  useEffect(() => {
    buscarClima(cidade);
  }, [cidade]);

  const handlePesquisar = (e) => {
    e.preventDefault();
    
    // 1. Sanitiza a entrada
    const cidadeTratada = sanitizarInput(cidadeBusca);

    // 2. Validações de tamanho e conteúdo
    if (!cidadeTratada) {
      setErro('Por favor, digite o nome de uma cidade.');
      return;
    }

    if (cidadeTratada.length < 2) {
      setErro('O nome da cidade deve ter pelo menos 2 caracteres.');
      return;
    }

    // 3. Atualiza os estados para disparo do efeito
    setCidadeBusca(cidadeTratada);
    setCidade(cidadeTratada);
  };

  const statusFavoravel = clima && clima.condicao_voo === 'Favorável para Voo';

  return (
    <div style={{
      padding: '1.25rem',
      borderRadius: '10px',
      backgroundColor: carregando 
        ? 'rgba(255,255,255,0.05)' 
        : statusFavoravel 
          ? 'rgba(46, 204, 113, 0.15)' 
          : 'rgba(231, 76, 60, 0.15)',
      border: `1px solid ${
        carregando 
          ? '#2e6fad' 
          : statusFavoravel 
            ? '#2ecc71' 
            : '#e74c3c'
      }`,
      color: '#fff',
      marginBottom: '2rem'
    }}>
      {/* Formulário de Busca por Cidade com Validação */}
      <form onSubmit={handlePesquisar} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Digite a cidade (ex: São Paulo, Poços de Caldas)..."
          value={cidadeBusca}
          maxLength={50}
          onChange={(e) => setCidadeBusca(e.target.value)}
          style={{
            flex: 1,
            padding: '0.6rem 1rem',
            borderRadius: '6px',
            border: '1px solid #2e6fad',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            color: '#fff',
            fontSize: '0.95rem'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: '#2e6fad',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          🔍 Buscar Clima
        </button>
      </form>

      {/* Conteúdo do Card */}
      {carregando ? (
        <div style={{ padding: '0.5rem 0', color: '#aaa' }}>
          <p style={{ margin: 0 }}>🌤️ Consultando condições meteorológicas na rampa de <strong>{cidade}</strong>...</p>
        </div>
      ) : erro ? (
        <div style={{ padding: '0.5rem 0', color: '#ff8080' }}>
          ⚠️ {erro}
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 0.4rem 0' }}>📍 Condições Meteorológicas — {clima.cidade}</h3>
            <p style={{ margin: 0, color: '#ccc', fontSize: '0.95rem' }}>
              {clima.descricao} • Temp: <strong>{clima.temperatura_c}°C</strong> • Vento: <strong>{clima.vento_kmh} km/h</strong> ({clima.direcao_vento})
            </p>
          </div>
          <div style={{
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontWeight: 'bold',
            backgroundColor: statusFavoravel ? '#2ecc71' : '#e74c3c',
            color: '#fff',
            fontSize: '0.9rem'
          }}>
            {statusFavoravel ? '🪂' : '⚠️'} {clima.condicao_voo}
          </div>
        </div>
      )}
    </div>
  );
}

export default PainelClima;