<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Administrativo - Revolt Store</title>
  <style>
    body {
      background-color: #0d0d0d;
      color: #fff;
      font-family: 'Segoe UI', sans-serif;
      padding: 2rem;
    }

    h1, h2 {
      color: #ff6600;
    }

    label {
      display: block;
      margin-top: 1rem;
    }

    input, select, textarea, button {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.5rem;
      background: #1a1a1a;
      border: 1px solid #444;
      color: #fff;
      border-radius: 5px;
    }

    button {
      background-color: #ff6600;
      color: #000;
      font-weight: bold;
      cursor: pointer;
    }

    .produto-item {
      margin: 1rem 0;
      padding: 1rem;
      background: #1a1a1a;
      border-radius: 10px;
    }
  </style>
</head>
<body>
  <h1>Portal Administrativo - Revolt Store</h1>

  <section>
    <h2>Login do Administrador</h2>
    <input type="email" id="email" placeholder="Email">
    <input type="password" id="senha" placeholder="Senha">
    <button onclick="revoltAdmin.login(email.value, senha.value)">Login</button>
  </section>

  <hr>

  <section>
    <h2>Cadastrar Produto</h2>
    <label>Nome: <input id="nome" type="text"></label>
    <label>Preço: <input id="preco" type="number"></label>
    <label>Estoque: <input id="estoque" type="number"></label>
    <label>Categoria: <input id="categoria" type="text"></label>
    <label>Descrição: <textarea id="descricao"></textarea></label>
    <label>Imagem: <input id="imagem" type="file"></label>
    <button onclick="cadastrarProduto()">Cadastrar</button>
  </section>

  <hr>

  <section>
    <h2>Produtos Cadastrados</h2>
    <div id="lista-produtos"></div>
  </section>

  <script type="module" src="firebase.js"></script>
  <script type="module" src="admin.js"></script>
  <script type="module">
    import { revoltAdmin } from './admin.js';

    window.revoltAdmin = revoltAdmin;

    async function cadastrarProduto() {
      const dados = {
        nome: nome.value,
        preco: parseFloat(preco.value),
        estoque: parseInt(estoque.value),
        categoria: categoria.value,
        descricao: descricao.value
      };
      const imagemFile = imagem.files[0];
      await revoltAdmin.cadastrarProduto(dados, imagemFile);
      listarProdutos();
    }

    async function listarProdutos() {
      const lista = await revoltAdmin.listarProdutos();
      const container = document.getElementById('lista-produtos');
      container.innerHTML = '';
      lista.forEach(p => {
        container.innerHTML += `
          <div class="produto-item">
            <h3>${p.nome} - R$${p.preco}</h3>
            <p>${p.descricao}</p>
            <img src="${p.imagem}" alt="${p.nome}" width="150">
            <p>Estoque: ${p.estoque}</p>
            <button onclick="removerProduto('${p.id}')">Remover</button>
          </div>
        `;
      });
    }

    window.removerProduto = async function(id) {
      await revoltAdmin.excluirProduto(id);
      listarProdutos();
    };

    listarProdutos();
  </script>
</body>
</html>
