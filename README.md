cat > README.md << 'EOF'
# Flutuar Parapente - Gerenciador de Alunos (Front-End)

O **Flutuar Parapente** é uma aplicação web de front-end desenvolvida como MVP para o curso de pós-graduação em Desenvolvimento Full Stack da PUC-Rio. O sistema foi projetado para gerenciar o fluxo de alunos e pilotos de uma escola de voo livre, permitindo o cadastro, a filtragem por nível de curso e o acompanhamento de métricas em tempo real.

## 🚀 Tecnologias Utilizadas

* **React** (Componentização e arquitetura base)
* **React Router Dom** (Gerenciamento de rotas dinâmicas e navegação SPA)
* **Hooks do React:**
  * `useState`: Gerenciamento de estado local (filtros, modais e dados).
  * `useEffect`: Sincronização automática com a API de armazenamento e busca de dados.
  * `useParams` e `useNavigate`: Captura de parâmetros na URL e navegação interna.
  * `useLocation`: Identificação da rota atual para destaque no menu de navegação.
* **HTML5 Semântico & CSS3 Customizado** (Layout responsivo com CSS Grid e Flexbox).
* **LocalStorage API**: Persistência de dados diretamente no navegador, eliminando a dependência de um back-end ativo nesta etapa do MVP.
* **Simulação de API via JSON**: Carga inicial de dados através da leitura de um arquivo `.json` estático (`public/data/alunos.json`), simulando uma requisição a um servidor.

## 📦 Funcionalidades Implementadas

* **Dashboard/Painel Central:** Exibição de estatísticas dinâmicas baseadas na lista de alunos cadastrados.
* **Listagem Responsiva:** Cards estilizados por categoria de curso (Iniciante, Cross Country e Voo Duplo) que se adaptam a qualquer tamanho de tela.
* **Filtros e Busca:** Filtragem rápida de pilotos por categoria e por nome, sem recarregamento de página.
* **Ficha Cadastral Dinâmica (`/alunos/:id`):** Rota que recupera e exibe os dados detalhados do aluno selecionado utilizando o ID da URL.
* **Persistência de Dados (Modo Autônomo):** Inclusão e leitura de dados salvos no cache do navegador (`localStorage`), mantendo os dados após o F5.
* **Feedback ao Usuário:** Indicador de carregamento, mensagens de erro em formulários e aviso de "nenhum resultado encontrado" nos filtros.
* **Página 404:** Rota de fallback para URLs inexistentes.

## 🔧 Como Executar o Projeto Localmente

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu ambiente (desenvolvido e testado em ambiente Linux Debian).

1. Clone o repositório para sua máquina local:
```bash
   git clone https://github.com/cristianoricci/flutuar-react.git
```

2. Acesse a pasta do projeto:
```bash
   cd flutuar-react
```

3. Instale as dependências do projeto:
```bash
   npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
   npm run dev
```

5. Abra o navegador no endereço indicado no terminal (geralmente `http://localhost:5173`).

## 📁 Estrutura do Projeto

flutuar-react/
├── public/
│   └── data/
│       └── alunos.json      # Dados simulados de alunos (leitura via fetch)
├── src/
│   ├── components/          # Componentes reutilizáveis (Header, AlunoCard, FilterBar, Modal, StatsBar)
│   ├── pages/                # Páginas da aplicação (Alunos, DetalhesAluno)
│   ├── App.jsx                # Definição das rotas da aplicação
│   ├── main.jsx               # Ponto de entrada da aplicação React
│   └── style.css              # Estilos globais
├── index.html
└── package.json

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos, como parte do MVP de Front-End Avançado da Pós-Graduação em Desenvolvimento Full Stack da PUC-Rio.
EOF