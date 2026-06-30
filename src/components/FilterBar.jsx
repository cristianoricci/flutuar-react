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
      <button onClick={() => filtrar('todos')}>Todos</button>
      <button onClick={() => filtrar('Iniciante')}>Iniciante</button>
      <button onClick={() => filtrar('Cross')}>Cross</button>
      <button onClick={() => filtrar('Voo Duplo')}>Voo Duplo</button>
      <button className="btn-novo" onClick={abrirModal}>+ Novo Aluno</button>
    </div>
  );
}

export default FilterBar;