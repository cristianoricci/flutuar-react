import React, { useState, useEffect } from 'react';

function Modal({ isOpen, onClose, onSave, alunoParaEditar }) {
  // 1. Estados dos campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [curso, setCurso] = useState('Iniciante');

  // 2. Preenche os campos se estiver em modo de edição, ou limpa se for novo cadastro
  useEffect(() => {
    if (alunoParaEditar) {
      setNome(alunoParaEditar.nome || '');
      setEmail(alunoParaEditar.email || '');
      setTelefone(alunoParaEditar.telefone || '');
      setCurso(alunoParaEditar.curso || 'Iniciante');
    } else {
      setNome('');
      setEmail('');
      setTelefone('');
      setCurso('Iniciante');
    }
  }, [alunoParaEditar, isOpen]);

  if (!isOpen) return null;

  // 3. Envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Monta o objeto. Se estiver editando, preserva o ID original!
    const dadosAluno = {
      ...(alunoParaEditar && { id: alunoParaEditar.id }),
      nome,
      email,
      telefone,
      curso,
    };

    onSave(dadosAluno);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '2rem',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        color: '#fff',
        border: '1px solid #333'
      }}>
        {/* Título dinâmico */}
        <h2 style={{ marginTop: 0, color: '#2e6fad' }}>
          {alunoParaEditar ? '✏️ Editar Piloto' : '🪂 Cadastrar Novo Piloto'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem' }}>Nome Completo:</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '4px',
                border: '1px solid #444',
                backgroundColor: '#222',
                color: '#fff'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem' }}>E-mail:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '4px',
                border: '1px solid #444',
                backgroundColor: '#222',
                color: '#fff'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem' }}>Telefone:</label>
            <input
              type="text"
              required
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '4px',
                border: '1px solid #444',
                backgroundColor: '#222',
                color: '#fff'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem' }}>Curso / Categoria:</label>
            <select
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '4px',
                border: '1px solid #444',
                backgroundColor: '#222',
                color: '#fff'
              }}
            >
              <option value="Iniciante">Iniciante</option>
              <option value="Cross">Cross</option>
              <option value="Voo Duplo">Voo Duplo</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: '#555',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: '#2e6fad',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {alunoParaEditar ? 'Salvar Alterações' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;