// VARIÁVEIS GLOBAIS
const CARRINHO = [];
const TELEFONE = '5516994079324'; // Seu número: 55 + DDD + Número

// FUNÇÃO PRINCIPAL: Adiciona um item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    // Busca se o item já existe no carrinho
    const itemExistente = CARRINHO.find(item => item.nome === nome);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        CARRINHO.push({ nome, preco, quantidade: 1 });
    }
    
    atualizarVisualizacaoCarrinho();
}

// FUNÇÃO: Atualiza o HTML do carrinho
function atualizarVisualizacaoCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalElement = document.getElementById('total-carrinho');
    
    // Limpa a lista atual
    listaCarrinho.innerHTML = '';
    let total = 0;

    // Constrói a nova lista e calcula o total
    CARRINHO.forEach((item, index) => {
        const precoItem = item.preco * item.quantidade;
        
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.quantidade}x ${item.nome} 
            <span style="font-weight: 400;">R$ ${precoItem.toFixed(2).replace('.', ',')}</span>
            <button onclick="removerDoCarrinho(${index})">X</button>
        `;
        listaCarrinho.appendChild(li);
        total += precoItem;
    });

    totalElement.textContent = total.toFixed(2).replace('.', ',');

    // Mostra/Esconde a seção do carrinho
    const carrinhoSection = document.querySelector('.carrinho-flutuante');
    if (CARRINHO.length > 0) {
        carrinhoSection.style.display = 'block';
    } else {
        carrinhoSection.style.display = 'none';
    }
}

// FUNÇÃO: Remove um item (reduz a quantidade ou remove totalmente)
function removerDoCarrinho(index) {
    const item = CARRINHO[index];
    
    if (item.quantidade > 1) {
        item.quantidade -= 1;
    } else {
        CARRINHO.splice(index, 1);
    }
    
    atualizarVisualizacaoCarrinho();
}


// FUNÇÃO: Formata e envia para o WhatsApp
function finalizarPedido() {
    if (CARRINHO.length === 0) {
        alert("Seu carrinho está vazio! Adicione pelo menos um item.");
        return;
    }

    let mensagem = '*🍕 Pedido Canada Lanches:*%0A%0A';
    let total = 0;

    // Lista de itens
    CARRINHO.forEach(item => {
        const precoItem = item.preco * item.quantidade;
        mensagem += `${item.quantidade}x ${item.nome} (R$ ${item.preco.toFixed(2).replace('.', ',')} cada) - Total: R$ ${precoItem.toFixed(2).replace('.', ',')}%0A`;
        total += precoItem;
    });

    // Total
    mensagem += `%0A*💰 Total dos Produtos: R$ ${total.toFixed(2).replace('.', ',')}*%0A%0A`;
    mensagem += `*Detalhes da Entrega:*%0A`;
    mensagem += `*Nome:* [Seu Nome]%0A`;
    mensagem += `*Endereço:* [Rua e Número]%0A`;
    mensagem += `*Bairro:* [Seu Bairro]%0A`;
    mensagem += `*Pagamento:* [Dinheiro/Cartão/Pix]%0A%0A`;
    mensagem += `_Por favor, confirme o valor da taxa de entrega. Obrigado!_`;

    // Cria e redireciona para o link do WhatsApp
    const url = `https://wa.me/${TELEFONE}?text=${mensagem}`;
    window.open(url, '_blank');
}

// Inicializa a visualização do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarVisualizacaoCarrinho);