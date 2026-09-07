# 🏷️ Plataforma de Leilões

Aplicação web de uma plataforma de leilões desenvolvida com **React, Vite e Tailwind CSS**.

O projeto foi criado com foco no desenvolvimento Front-end, explorando componentização, gerenciamento de estado, formulários, navegação entre páginas, filtros, responsividade e interação com o usuário.

🔗 **[Acessar demonstração](https://agnesta90.github.io/Plataforma_de_Leilao/)**
---

## 🎯 Objetivo

Este projeto foi desenvolvido como parte da minha evolução no desenvolvimento Front-end.

A proposta foi criar uma experiência semelhante a uma plataforma de leilões, permitindo navegar pelos produtos, pesquisar itens, aplicar filtros, visualizar detalhes e realizar uma simulação de oferta.

O projeto **não possui backend**. Os dados utilizados pela aplicação são simulados no navegador para demonstrar as funcionalidades da interface.

---

## ✨ Funcionalidades

* 🔐 Login e cadastro simulados
* 👤 Perfil de usuário
* 🛍️ Cadastro de produtos
* 🔎 Pesquisa de produtos
* 🏷️ Filtros por categoria, região, preço e tempo
* ⏱️ Contagem regressiva dos leilões
* 💰 Simulação de ofertas
* 📦 Página de detalhes do produto
* 🛒 Carrinho de produtos selecionados
* 📱 Interface responsiva
* 🧩 Componentização com React
* 🛣️ Navegação com React Router
* 📝 Validação de formulários com React Hook Form
* 🎨 Interface desenvolvida com Tailwind CSS

---

## 🛠️ Tecnologias

| Tecnologia      | Utilização                            |
| --------------- | ------------------------------------- |
| React           | Construção da interface e componentes |
| Vite            | Ambiente de desenvolvimento e build   |
| Tailwind CSS    | Estilização e responsividade          |
| React Router    | Navegação entre páginas               |
| React Hook Form | Formulários e validações              |
| Lucide React    | Ícones da interface                   |
| JavaScript      | Lógica da aplicação                   |
| Git/GitHub      | Versionamento e publicação            |

---

## 🧠 Principais aprendizados

Durante o desenvolvimento, utilizei o projeto para praticar:

* criação e reutilização de componentes;
* passagem de dados através de props;
* gerenciamento de estado com `useState`;
* efeitos com `useEffect`;
* navegação e parâmetros de rota;
* criação de filtros e pesquisas;
* validação de formulários;
* armazenamento de dados no `sessionStorage`;
* criação de interfaces responsivas;
* organização de páginas e componentes;
* utilização de bibliotecas externas no React.

---

## 📂 Estrutura

```text
src/
├── components/
│   ├── Card.jsx
│   ├── CardMostra.jsx
│   ├── MenuPesquisa.jsx
│   ├── Oferta.jsx
│   └── ...
│
├── pages/
│   ├── login.jsx
│   ├── perfil.jsx
│   ├── pesquisar.jsx
│   ├── pagina_card.jsx
│   ├── Leilao.jsx
│   └── ...
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🚧 Sobre o backend

Esta versão do projeto possui foco exclusivo no **Front-end**.

Autenticação, produtos, ofertas e algumas interações são simulados no navegador utilizando dados locais e `sessionStorage`.

A ausência de backend é intencional nesta versão, pois o objetivo principal é demonstrar conhecimentos de desenvolvimento Front-end.

---

## 👨‍💻 Sobre o projeto

Projeto desenvolvido para estudo e evolução das minhas habilidades em desenvolvimento Front-end com React.
