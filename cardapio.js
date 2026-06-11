const cardapio = [];

function renderCardapio() {
  const lista = document.getElementById('lista-cardapio');
  if (!lista) return;
  lista.innerHTML = '';
  cardapio.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <h3>${item.nome}</h3>
      <p>R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
      <span class="categoria">${item.categoria}</span>
      <button onclick="pedir('${item.nome}')">Pedir</button>
    `;
    lista.appendChild(div);
  });
}

function pedir(nome) {
  alert(`Pedido de "${nome}" realizado com sucesso!`);
}

// Itens iniciais carregados na página
cardapio.push(
  { nome: 'X-Burguer',     preco: 18.90, categoria: 'Lanches' },
  { nome: 'X-Bacon',       preco: 21.90, categoria: 'Lanches' },
  { nome: 'Combo Família', preco: 45.90, categoria: 'Combos'  },
  { nome: 'Milkshake',     preco: 12.90, categoria: 'Bebidas' },
  { nome: 'Batata Frita',  preco:  8.90, categoria: 'Acompanhamentos' }
);

function buscarItem(termo) {
  return cardapio.filter(item =>
    item.nome.toLowerCase().includes(termo.toLowerCase()) ||
    item.categoria.toLowerCase().includes(termo.toLowerCase())
  );
}

function filtrarPorCategoria(categoria) {
  return cardapio.filter(item => item.categoria === categoria);
}

function getCategorias() {
  return [...new Set(cardapio.map(item => item.categoria))];
}
