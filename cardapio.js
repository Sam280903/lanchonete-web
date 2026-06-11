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
