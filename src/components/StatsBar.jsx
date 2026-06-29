import React from "react";


function StatsBar ({ listaDeAlunos = [] }) {

   
    const totalAlunos = listaDeAlunos.length;
    
    const totalIniciantes = listaDeAlunos.filter(aluno => aluno.curso === 'Iniciante').length;
    const totalCross = listaDeAlunos.filter(aluno => aluno.curso === 'Cross').length;
    const totalVooDuplo = listaDeAlunos.filter(aluno => aluno.curso === 'Voo Duplo').length;

   
    return (
        <div className="stats-bar">
            {/* Trocamos o '0' fixo pelas variáveis vivas do React */}
            <div className="stat-pill">Total <span>{totalAlunos}</span></div>
            <div className="stat-pill">Iniciante <span>{totalIniciantes}</span></div>
            <div className="stat-pill">Cross <span>{totalCross}</span></div>
            <div className="stat-pill">Voo Duplo <span>{totalVooDuplo}</span></div>
        </div>
    );
}

export default StatsBar;