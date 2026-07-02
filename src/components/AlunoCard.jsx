import React from "react";

const cursoParaClasse = {
    'Iniciante': 'iniciante',
    'Cross': 'cross',
    'Voo Duplo': 'duplo'
};

function AlunoCard({aluno, onVerFicha}) {
    const classeCurso = cursoParaClasse[aluno.curso] || 'iniciante';

    return (
        <div className={"card- c${classeCurso}"}>
            <h3 className="card-nome">{aluno.nome}</h3>

            <span className={"badge-curso badge-${classeCurso}"}>
                {aluno.curso}
            </span>  

            <div className="card-info">
                <span>📞 {aluno.telefone}</span>
            </div>

      <div className="card-actions">
        <button
          className="btn-acao"
          onClick={() => onVerFicha(aluno.id)}
          title="Ver a ficha completa deste piloto"
        >
          Ver Ficha Completa
        </button>
      </div>
    </div>
  );
}

export default AlunoCard;