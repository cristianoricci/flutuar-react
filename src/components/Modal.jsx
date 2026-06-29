import React, { useState } from 'react';

function Modal({ isOpen, onClose, onSave }){
    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('Iniciante'); 
    const [telefone, setTelefone] = useState('');

    
    const formatarTelefone = (valor) => {
        const apenasNumeros = valor.replace(/\D/g, '');

        if (!apenasNumeros) return ''; 

        if (apenasNumeros.length <= 2) {
            return `(${apenasNumeros}`;
        }
        if (apenasNumeros.length <= 7) {
            return `(${apenasNumeros.substring(0, 2)}) ${apenasNumeros.substring(2)}`;
        }
       
        return `(${apenasNumeros.substring(0, 2)}) ${apenasNumeros.substring(2, 7)}-${apenasNumeros.substring(7, 11)}`;
    };

    const lidarComSalvar = (e) => {
        e.preventDefault(); 
        
        if (!nome.trim()) return alert("Por favor, digite o nome do aluno.");

        onSave({
            nome: nome,
            curso: curso,
            telefone: telefone
        });

       
        setNome('');
        setCurso('Iniciante');
        setTelefone('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className='overlay open'>
            <div className='modal'>
                <h2>Cadastrar Novo Aluno</h2>

                <form onSubmit={lidarComSalvar}>

                    {/* Campo 1: Nome */}
                    <div className='form-group'>
                        <label>Nome do Aluno</label>
                        <input 
                            type="text" 
                            placeholder='Ex: João Silva' 
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    {/* Campo 2: Curso */}
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

                    {/* Campo 3: Telefone (Único e Máscara ativa) */}
                    <div className='form-group'>
                        <label>Telefone / Contato</label>
                        <input 
                            type='text' 
                            placeholder='Ex: (35) 99999-8888'
                            maxLength={15} 
                            value={telefone}
                            onChange={(e) => setTelefone(formatarTelefone(e.target.value))} 
                        /> 
                    </div>

                    <button type='submit' className='btn-salvar'>
                         Salvar Aluno
                    </button>
                </form>

                <button onClick={onClose} className='btn-cancelar'>
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default Modal;