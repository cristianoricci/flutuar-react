import React from 'react';

function AlunoCard({ aluno, onVerFicha, onDeletar, onEditar}) {
  return (
    <div style={{
      backgroundColor: '#222',
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff'
    }}>
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#2e6fad' }}>{aluno.nome}</h3>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc' }}>Curso: {aluno.curso}</p>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#aaa' }}>Tel: {aluno.telefone}</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {/* Botão de Ver Ficha */}
        <button
          onClick={() => onVerFicha(aluno.id)}
          style={{
            padding: '0.5rem 0.8rem',
            backgroundColor: '#2e6fad',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          📄 Ver Ficha
        </button>

        {/* Botão NOVO: Editar */}
        <button
          onClick={() => onEditar(aluno)}
          style={{
            padding: '0.5rem 0.8rem',
            backgroundColor: '#f39c12',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ✏️ Editar
        </button>

        {/* Botão de Deletar */}
        <button
          onClick={() => onDeletar(aluno.id, aluno.nome)}
          style={{
            padding: '0.5rem 0.8rem',
            backgroundColor: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🗑️ Excluir
        </button>
      </div>
    </div>
  );
}

export default AlunoCard;