import React, { useState } from 'react';
import { database } from '../firebase';
import { ref, push } from 'firebase/database';

const Admin = () => {
  const [produto, setProduto] = useState({
    nome: '',
    marca: '',
    preco: '',
    estoque: '',
    descricao: '',
    categoria: '',
    cor: '',
    tamanho: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prev => ({ ...prev, [name]: value }));
  };

  const cadastrarProduto = (e) => {
    e.preventDefault();

    const produtosRef = ref(database, 'produtos');

    const produtoParaEnviar = {
      ...produto,
      preco: Number(produto.preco),
      estoque: Number(produto.estoque),
    };

    push(produtosRef, produtoParaEnviar)
      .then(() => {
        alert('Produto cadastrado com sucesso!');
        setProduto({
          nome: '',
          marca: '',
          preco: '',
          estoque: '',
          descricao: '',
          categoria: '',
          cor: '',
          tamanho: ''
        });
      })
      .catch((error) => {
        alert('Erro ao cadastrar: ' + error.message);
        console.error(error);
      });
  };

  return (
    <main>
      <header>
        <h1>Admin - Revolt Store</h1>
        <nav>
          <a href="#produtos">Produtos</a>
          <a href="#clientes">Clientes</a>
          <a href="#pedidos">Pedidos</a>
          <a href="#relatorios">Relatórios</a>
        </nav>
      </header>

      {/* Seção Produtos */}
      <section id="produtos">
        <h2>🛍️ Gestão de Produtos</h2>
        <form className="card" onSubmit={cadastrarProduto}>
          <input type="text" name="nome" placeholder="Nome do Produto" value={produto.nome} onChange={handleChange} required />
          <input type="text" name="marca" placeholder="Marca" value={produto.marca} onChange={handleChange} required />
          <input type="number" name="preco" placeholder="Preço" value={produto.preco} onChange={handleChange} required min="0" step="0.01" />
          <input type="number" name="estoque" placeholder="Estoque" value={produto.estoque} onChange={handleChange} required min="0" />
          <textarea name="descricao" placeholder="Descrição detalhada" value={produto.descricao} onChange={handleChange} />
          <input type="text" name="categoria" placeholder="Categoria" value={produto.categoria} onChange={handleChange} />
          <input type="text" name="cor" placeholder="Cor" value={produto.cor} onChange={handleChange} />
          <input type="text" name="tamanho" placeholder="Tamanho" value={produto.tamanho} onChange={handleChange} />
          <button type="submit">Cadastrar Produto</button>
        </form>
      </section>

      {/* Seção Pedidos */}
      <section id="pedidos">
        <h2>🧾 Gestão de Pedidos</h2>
        <div className="card">
          <p><strong>Pedido #12345</strong> - João Silva</p>
          <p>Status: 
            <select>
              <option>Em processamento</option>
              <option>Enviado</option>
              <option>Entregue</option>
              <option>Cancelado</option>
            </select>
          </p>
          <button>Atualizar Status</button>
        </div>
      </section>

      {/* Seção Relatórios */}
      <section id="relatorios">
        <h2>📊 Relatórios e Indicadores</h2>
        <div className="card">
          <p>📈 Vendas do mês: <strong>R$ 5.400,00</strong></p>
          <p>🔝 Produto mais vendido: <strong>Moleton Adidas</strong></p>
          <p>🧍 Clientes ativos: <strong>18</strong></p>
        </div>
      </section>
    </main>
  );
};

export default Admin;
