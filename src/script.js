
// Endereço da API
const API = "http://localhost:5000";
// lista de todos so alunos carregados da API
let todosAlunos = [];
// Filtro ativo no momento
let filtroAtivo = "todos";


// Formata a data do formato americano para o brasileiro
function formatarData(dt) {
    if (!dt) return "-";
    const d = new Date(dt);
    if (isNaN(d)) return dt;
    return d.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Exibe uma mensagem temporaria no canto da tela
function toast(msg, tipo = "ok") {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.className = "show" + (tipo === "error" ? "error" : "");
    setTimeout(() => {
        el.className = "";
    }, 3000);
}


// Mapa de estilos CSS e emojis por curso
const estilos = {
    "Iniciante": { bagde: "badge-iniciante", card: "c-iniciante", emoji: "🔵" },
    "Cross": { badge: "badge-cross", card: "c-cross", emoji: "🟡" },
    "Voo Duplo": { badge: "badge-duplo", card: "c-duplo", emoji: "🟢" },
};


// Renderiza os cards dos alunos na tela
function renderizar(alunos) {
    const lista = document.getElementById('lista-alunos');

    if (!alunos.length) {
        lista.innerHTML = '<p class="empty">Nenhum aluno encontrado.</p>';
        return;
    }

    lista.innerHTML = alunos.map((a, i) => {
        const e = estilos[a.curso] || { badge: '', card: '', emoji: '📋' };
        return `
      <div class="card ${e.card}">
        <div class="card-nome">${a.nome}</div>
        <div class="badge-curso ${e.badge}">${e.emoji} ${a.curso}</div>
        <div class="card-info">
          <div>📞 ${a.telefone}</div>
          <div>✉️ ${a.email}</div>
          <div>📅 ${formatarData(a.data_cadastro)}</div>
          ${a.nivel_ippi ? `<div>🪂 Nível IPPI ${a.nivel_ippi}</div>` : ''}
          ${a.observacoes ? `<div>💬 ${a.observacoes}</div>` : ''}
        </div>
        <div class="card-actions">
          <button class="btn-acao" onclick="editarAluno(${a.id})">✏️ Editar</button>
          <button class="btn-acao danger" onclick="confirmarDelete(${a.id}, '${a.nome.replace(/'/g, "\\'")}')">🗑️ Remover</button>
        </div>
      </div>`;
    }).join('');
}


// Busca todos os alunos na API
async function carregarAlunos() {
    try {
        const res = await fetch(`${API}/buscar_alunos`);
        const data = await res.json();
        todosAlunos = data.alunos || [];
        atualizarStats();
        renderizar(todosAlunos);
    } catch (e) {
        document.getElementById("lista-alunos").innerHTML = '<p class="empty">⚠️ Não foi possível conectar à API. Verifique se o backend está rodando.</p>';

    }
}

// Atualiza os contadores de alunos por curso
function atualizarStats() {
    document.getElementById("stat-total").textContent = todosAlunos.length;
    document.getElementById("stat-iniciante").textContent = todosAlunos.filter(a => a.curso === "Iniciante").length;
    document.getElementById("stat-cross").textContent = todosAlunos.filter(a => a.curso === "Cross").length;
    document.getElementById("stat-duplo").textContent = todosAlunos.filter(a => a.curso === "Voo Duplo").length;
}

// Filta os alunos por curso chamando a API
async function filtrar(curso) {
    filtroAtivo = curso;

    document.querySelectorAll(".filter-bar button").forEach(b => {
        b.classList.remove("active");
    });
    event.target.classList.add("active");

    if (curso === "todos") {
        renderizar(todosAlunos);
        return
    }
    try {
        const res = await fetch(`${API}/buscar_por_curso?curso=${encodeURIComponent(curso)}`);
        const data = await res.json();
        renderizar(data.alunos || []);
    } catch (e) {
        toast("Erro ao filtrar alunos.", "error");
    }
}

// Abre o modal para cadastrar um novo aluno
function abrirModal() {
    document.getElementById('modal-titulo').textContent = 'NOVO ALUNO';
    document.getElementById('aluno-id').value = '';
    document.getElementById('f-nome').value = '';
    document.getElementById('f-telefone').value = '';
    document.getElementById('f-email').value = '';
    document.getElementById('f-curso').value = '';
    document.getElementById('f-ippi').value = '';
    document.getElementById('f-obs').value = '';
    document.getElementById('btn-salvar').textContent = 'CADASTRAR ALUNO';
    document.getElementById('overlay').classList.add('open');
}

// Fecha modal
function fecharModal() {
    document.getElementById("overlay").classList.remove("open");
}

// Busca os dados do aluno e abre o modal para edição
async function editarAluno(id) {
    try {
        const res = await fetch(`${API}/buscar_aluno/${id}`);
        if (!res.ok) {
            toast("Aluno não encontrado.", "error");
            return;
        }
        const a = await res.json();
        document.getElementById('modal-titulo').textContent = 'EDITAR ALUNO';
        document.getElementById('aluno-id').value = a.id;
        document.getElementById('f-nome').value = a.nome;
        document.getElementById('f-telefone').value = a.telefone;
        document.getElementById('f-email').value = a.email;
        document.getElementById('f-curso').value = a.curso;
        document.getElementById('f-ippi').value = a.nivel_ippi || '';
        document.getElementById('f-obs').value = a.observacoes || '';
        document.getElementById('btn-salvar').textContent = 'SALVAR ALTERAÇÕES';
        document.getElementById('overlay').classList.add('open');
    } catch (e) {
        toast("Erro ao carregar aluno.", "error");
    }
}

// Salva um aluno novo (POST) ou atualizaum existente (PUT)
async function salvarAluno() {
    const id = document.getElementById("aluno-id").value;
    const nome = document.getElementById("f-nome").value.trim();
    const telefone = document.getElementById("f-telefone").value.trim();
    const email = document.getElementById("f-email").value.trim();
    const curso = document.getElementById("f-curso").value.trim();
    const nivel_ippi = document.getElementById("f-ippi").value.trim();
    const obs = document.getElementById("f-obs").value.trim();

    if (!nome || !telefone || !email || !curso) {
        toast("Preencha todos os campos obrigtórios.", "error");
        return;
    }

    const body = { nome, telefone, email, curso, nivel_ippi, observacoes: obs };
    const btn = document.getElementById("btn-salvar");
    btn.disabled = true;

    try {
        let res;
        if (id) {
            res = await fetch(`${API}/atualizar_aluno/${id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });
        } else {
            res = await fetch(`${API}/cadastrar_aluno`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });
        }

        const data = await res.json();
        if (!res.ok) {
            toast(data.erro || "Erro ao salvar.", "error");
            btn.disabled = false;
            return;
        }

        toast(id ? "✅ Aluno atualizado!" : "✅ Aluno cadastrado!");
        fecharModal();
        await carregarAlunos();

    } catch (e) {
        toast("Erro de conexão com a API.", "error");
    }
    btn.disabled = false;
}

// Pede confirmação antes deletar 
function confirmarDelete(id, nome) {
    if (!confirm(`Remover o aluno "${nome}"?\nEsta ação não pode ser desfeita.`)) return;
    deletarAluno(id);
}

// Deleta o aluno chamndo a API
async function deletarAluno(id) {
    try {
        const res = await fetch(`${API}/deletar_aluno/${id}`, {
            method: "DELETE"
        });
        const data = await res.json();
        if (!res.ok) {
            toast(data.erro || "Erro ao remover.", "error");
            return;
        }
        toast("🗑️ Aluno removido.");
        await carregarAlunos();
    } catch (e) {
        toast("Erro de conexão.", "error");
    }

}

// Inicia o sistema carregando os alunos ao abrir a página
carregarAlunos();









