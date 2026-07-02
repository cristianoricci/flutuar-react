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

        // Remove os parênteses, espaços e hifens para contar apenas os números puros
        const numerosApenas = telefone.replace(/\D/g, '');

        if (!telefone.trim()) {
            setErro("⚠️ Por favor, insira um telefone de contato.");
            return;
        }

        // Validação: Verifica se tem menos de 10 dígitos (DDD + fixo) ou formato incorreto
        if (numerosApenas.length < 10 || numerosApenas.length > 11) {
            setErro("⚠️ O telefone deve conter o DDD válido e de 8 a 9 dígitos. Ex: (35) 99999-8888");
            return;
        }

        onSave({
            nome: nome,
            curso: curso,
            telefone: telefone // Salva o telefone já formatado com a máscara
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
                            maxLength={15} // Limita o tamanho máximo visual da máscara
                            onChange={(e) => {
                                // Remove tudo o que não for número (bloqueia letras na hora)
                                let v = e.target.value.replace(/\D/g, "");
                                
                                // Aplica a máscara dinamicamente (XX) XXXXX-XXXX
                                if (v.length <= 11) {
                                    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
                                    v = v.replace(/(\d)(\d{4})$/g, "$1-$2");
                                }
                                
                                setTelefone(v);
                            }} 
                            autoComplete="new-password"
                        /> 
                    </div>

                    <button type='submit' className='btn-salvar' style={{ width: '100%', marginBottom: '0.5rem' }}>
                         Salvar Aluno
                    </button>
                </form>

                <button onClick={onClose} className='btn-cancelar' style={{ width: '100%' }}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default Modal;