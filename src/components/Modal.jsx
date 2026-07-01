import React, { useState } from 'react';

function Modal({ isOpen, onClose, onSave }){
    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('Iniciante'); 
    const [telefone, setTelefone] = useState('');
    const [erro, setErro] = useState('');

    const lidarComSalvar = (e) => {
        e.preventDefault(); 
        setErro(''); 
        
        if (!nome.trim()) {
            setErro("⚠️ Por favor, digite o nome do aluno.");
            return;
        }
        if (!telefone.trim()) {
            setErro("⚠️ Por favor, insira um telefone de contato.");
            return;
        }

        onSave({
            nome: nome,
            curso: curso,
            telefone: telefone
        });

        alert("🎉 Aluno cadastrado com sucesso!");

        setNome('');
        setCurso('Iniciante');
        setTelefone('');
        setErro('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className='overlay open'>
            <div className='modal'>
                <h2>Cadastrar Novo Aluno</h2>

                {erro && (
                    <div style={{ backgroundColor: '#ff4d4d', color: '#fff', padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
                        {erro}
                    </div>
                )}

                <form onSubmit={lidarComSalvar}>
                    <div className='form-group'>
                        <label>Nome do Aluno</label>
                        <input 
                            type="text" 
                            placeholder='Ex: João Silva' 
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className='form-group'>
                        <label>Curso</label>
                        <select 
                            value={curso}
                            onChange={(e) => setCurso(e.target.value)}
                        >
                            <option value='Iniciante'>Iniciante</option>
                            <option value='Cross'>Cross</option>
                            <option value='Voo Duplo'>Voo Duplo</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Telefone / Contato</label>
                        <input 
                            type='text' 
                            placeholder='Ex: (35) 99999-8888'
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)} 
                            autoComplete="new-password"
                        /> 
                    </div>

                    <button type='submit' className='btn-salvar' style={{ width: '100%', marginBottom: '0.5rem' }}>
                         Salvar Aluno
                    </button>
                </form>

                <button onClick={onClose}  className='btn-cancelar' title="Fechar janela sem salvar" style={{ width: '100%' }}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default Modal;