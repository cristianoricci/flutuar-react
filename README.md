# Flutuar Parapente - Gerenciador de Alunos (Front-End)

O **Flutuar Parapente** é uma aplicação web de front-end desenvolvida como MVP para o curso de pós-graduação em Desenvolvimento Full Stack da PUC-Rio. O sistema foi projetado para gerenciar o fluxo de alunos e pilotos de uma escola de voo livre, permitindo o cadastro, a filtragem por nível de curso e o acompanhamento de métricas em tempo real.

## 🚀 Tecnologias Utilizadas

* **React** (Componentização e arquitetura base)
* **React Router Dom** (Gerenciamento de rotas dinâmicas e navegação SPA)
* **Hooks do React:**
  * `useState`: Gerenciamento de estado local (filtros, modais e dados).
  * `useEffect`: Sincronização automática com a API de armazenamento.
  * `useParams` e `useNavigate`: Captura de parâmetros na URL e navegação interna.
* **HTML5 Semântico & CSS3 Customizado** (Layout responsivo com CSS Grid e Flexbox).
* **LocalStorage API**: Persistência de dados diretamente no navegador, eliminando a dependência de um back-end ativo nesta etapa do MVP.

## 📦 Funcionalidades Implementadas

* **Dashboard/Painel Central:** Exibição de estatísticas dinâmicas baseadas na lista de alunos cadastrados.
* **Listagem Responsiva:** Cards estilizados por categoria de curso (Iniciante, Cross Country e Voo Duplo) que se adaptam a qualquer tamanho de tela.
* **Filtros Avançados:** Filtragem rápida de pilotos por categoria sem recarregamento de página.
* **Ficha Cadastral Dinâmica (`/alunos/:id`):** Rota protegida que recupera e exibe os dados detalhados do aluno selecionado utilizando o ID da URL.
* **Persistência de Dados (Modo Autônomo):** Inclusão, leitura e exclusão de dados salvas no cache do navegador (`localStorage`), mantendo os dados seguros após o F5.

## 🔧 Como Executar o Projeto Localmente

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu ambiente (desenvolvido e testado em ambiente Linux Debian utilizando gerenciamento de pacotes padrão).

1. Clone o repositório para sua máquina local:
   ```bash
   git clone [https://github.com/seu-usuario/flutuar-react.git](https://github.com/seu-usuario/flutuar-react.git)
