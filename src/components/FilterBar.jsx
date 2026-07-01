import React from 'react';


function FilterBar({ setFiltro, setModalAberto }) {

  const filtrar = (categoria) => {
    console.log("Filtrando por:" + categoria);
    
    setFiltro(categoria); 
  };

  const abrirModal = () => {
    console.log("Abrindo o modal de cadastro...");
    setModalAberto(true);
  };

  return (
    <div className="filter-bar">
      <span>Filtrar:</span>
      <button onClick={() => filtrar('todos')} title="Filtrar por todos os cursos">Todos</button>
      <button onClick={() => filtrar('Iniciante')} title="Filtrar apenas alunos iniciantes">Iniciante</button>
      <button onClick={() => filtrar('Cross')} title="Filtrar apenas os alunos de cross">Cross</button>
      <button onClick={() => filtrar('Voo Duplo')} title="Filtrar apenas os alunos de voo duplo">Voo Duplo</button>
      <button className="btn-novo" onClick={abrirModal} title="Cadastrar um novo aluno">+ Novo Aluno</button>
    </div>
  );
}

export default FilterBar;