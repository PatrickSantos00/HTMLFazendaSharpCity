function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}

document.getElementById('openModalBtn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'flex';
});

document.getElementById('closeModalBtn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

// Apenas adiciona o evento ao botão de deletar produto se ele existir
const deleteProductBtn = document.getElementById('deleteProductBtn');
if (deleteProductBtn) {
    deleteProductBtn.addEventListener('click', function() {
        populateProductSelect();
        document.getElementById('deleteModal').style.display = 'flex';
    });
}

const closeDeleteModalBtn = document.getElementById('closeDeleteModalBtn');
if (closeDeleteModalBtn) {
    closeDeleteModalBtn.addEventListener('click', function() {
        document.getElementById('deleteModal').style.display = 'none';
    });
}

// Ajuste: fechamento do modal de venda com o botão "X"
document.getElementById('closeEditModalBtn').addEventListener('click', function() {
    document.getElementById('editModal').style.display = 'none';
    resetSellModalFields(); // Limpa os campos ao fechar o modal
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    const deleteModal = document.getElementById('deleteModal');
    const editModal = document.getElementById('editModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (event.target === deleteModal) {
        deleteModal.style.display = 'none';
    }
    if (event.target === editModal) {
        editModal.style.display = 'none';
        resetSellModalFields(); // Limpa os campos ao fechar o modal
    }
});

// Adiciona produto e cria um novo box
document.querySelector('#addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('productName').value;
    const quantidade = document.getElementById('productQuantity').value;
    const preco = document.getElementById('productPrice').value;
    const validade = document.getElementById('productValidity').value;

    const newBox = document.createElement('div');
    newBox.classList.add('rectangle');
    newBox.dataset.name = nome;
    newBox.dataset.quantity = quantidade;
    newBox.dataset.price = preco;
    newBox.dataset.validity = validade;

    newBox.innerHTML = `
        <p>Nome: ${nome}</p>
        <p>Quantidade: ${quantidade}</p>
        <p>Custo: R$ ${parseFloat(preco).toFixed(2)}</p>
        <p>Validade: ${formatDate(validade)}</p>
    `;

    document.querySelector('.container').appendChild(newBox);
    document.querySelector('#addProductForm').reset();
    document.getElementById('modal').style.display = 'none';
});

// Preenche a seleção de produtos no modal de exclusão
function populateProductSelect() {
    const select = document.getElementById('productSelect');
    select.innerHTML = ''; // Limpa opções existentes
    const boxes = document.querySelectorAll('.container .rectangle');

    boxes.forEach((box, index) => {
        const productNameElement = box.querySelector('p:nth-child(1)');
        if (productNameElement) {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = productNameElement.textContent.split(": ")[1]; // Usa o nome do produto
            select.appendChild(option);
        }
    });
}

// Remove o produto selecionado, se o botão de deletar produto existir
const deleteProductForm = document.querySelector('#deleteProductForm');
if (deleteProductForm) {
    deleteProductForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedIndex = document.getElementById('productSelect').value;
        const boxes = document.querySelectorAll('.container .rectangle');

        if (selectedIndex !== '') {
            boxes[selectedIndex].remove();
            document.getElementById('deleteModal').style.display = 'none';
        }
    });
}

// Abre o modal de venda ao clicar no botão "Vender"
document.getElementById('editProductBtn').addEventListener('click', function() {
    populateSellProductSelect();
    document.getElementById('editModal').style.display = 'flex';
    resetSellModalFields(); // Limpa os campos ao abrir o modal
});

// Limpa os campos do modal de venda
function resetSellModalFields() {
    document.getElementById('sellProductSelect').value = '';
    document.getElementById('sellProductQuantity').value = '';
    document.getElementById('sellProductCost').value = '';
    document.getElementById('sellProductPrice').value = '';
    document.getElementById('sellProductMargin').value = '';
    document.getElementById('sellTotalValue').value = '';
    document.getElementById('sellQuantityInput').value = '';
    document.getElementById('sellQuantityInput').style.border = ''; // Remove qualquer estilo de erro anterior
    document.getElementById('sellProductBtn').disabled = true; // Desabilita o botão de venda inicialmente
}

function populateSellProductSelect() {
    const select = document.getElementById('sellProductSelect');
    select.innerHTML = ''; // Limpa as opções existentes
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Selecione um produto';
    select.appendChild(defaultOption);

    const boxes = document.querySelectorAll('.container .rectangle');
    boxes.forEach((box, index) => {
        const productNameElement = box.querySelector('p:nth-child(1)');
        if (productNameElement) {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = productNameElement.textContent.split(": ")[1];
            select.appendChild(option);
        }
    });

    select.selectedIndex = 0; // Define o valor inicial como a opção padrão
}

document.getElementById('sellProductSelect').addEventListener('change', function() {
    const selectedIndex = this.value;
    const boxes = document.querySelectorAll('.container .rectangle');

    if (selectedIndex !== '') {
        const selectedBox = boxes[selectedIndex];
        document.getElementById('sellProductQuantity').value = selectedBox.dataset.quantity || 0;
        document.getElementById('sellProductCost').value = `R$ ${parseFloat(selectedBox.dataset.price).toFixed(2)}` || "R$ 0.00";
        
        // Define o valor máximo permitido no campo de quantidade vendida
        document.getElementById('sellQuantityInput').max = selectedBox.dataset.quantity || 0;
    } else {
        document.getElementById('sellProductQuantity').value = '';
        document.getElementById('sellProductCost').value = '';
        document.getElementById('sellQuantityInput').max = 0;
    }
});

// Valida a quantidade de venda no campo de quantidade vendida e recalcula o total
document.getElementById('sellQuantityInput').addEventListener('input', function() {
    const maxQuantity = parseInt(document.getElementById('sellProductQuantity').value) || 0;
    const inputQuantity = parseInt(this.value) || 0;

    const sellButton = document.getElementById('sellProductBtn');

    if (inputQuantity > maxQuantity || inputQuantity <= 0) {
        this.style.border = '2px solid red'; // Borda vermelha para indicar erro
        sellButton.disabled = true; // Desabilita o botão de venda
    } else {
        this.style.border = ''; // Remove a borda se estiver correto
        sellButton.disabled = false; // Habilita o botão de venda
    }
    calculateTotalValue(); // Calcula o total da venda quando a quantidade muda
});

// Calcula a margem e o total automaticamente ao inserir o preço de venda
document.getElementById('sellProductPrice').addEventListener('input', function() {
    let value = this.value.replace(/[^\d.,]/g, ''); // Permite apenas números, vírgula e ponto durante a digitação
    this.value = value;

    calculateMargin();
    calculateTotalValue(); // Calcula o total da venda quando o preço muda
});

// Formata o preço quando o campo perde o foco
document.getElementById('sellProductPrice').addEventListener('blur', function() {
    let value = parseFloat(this.value.replace(',', '.'));
    if (!isNaN(value) && value > 0) {
        this.value = `R$ ${value.toFixed(2)}`;
    }
});

// Calcula o valor total da venda
function calculateTotalValue() {
    const sellPrice = parseFloat(document.getElementById('sellProductPrice').value.replace('R$', '').replace(',', '.').trim()) || 0;
    const quantity = parseInt(document.getElementById('sellQuantityInput').value) || 0;

    const total = sellPrice * quantity;
    document.getElementById('sellTotalValue').value = total > 0 ? `R$ ${total.toFixed(2)}` : '';
}

// Calcula a margem de lucro
function calculateMargin() {
    const cost = parseFloat(document.getElementById('sellProductCost').value.replace('R$', '').replace(',', '.').trim()) || 0;
    const sellPrice = parseFloat(document.getElementById('sellProductPrice').value.replace('R$', '').replace(',', '.').trim()) || 0;

    let margin = 0;

    if (cost !== 0) {
        margin = ((sellPrice - cost) / cost) * 100;
    } else {
        margin = sellPrice > 0 ? 100 : 0; // Se custo é 0, margem é 100% (todo o preço é lucro)
    }

    document.getElementById('sellProductMargin').value = sellPrice > 0 ? `${margin.toFixed(2)}%` : '';
}

document.querySelector('#sellProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedIndex = document.getElementById('sellProductSelect').value;
    const boxes = document.querySelectorAll('.container .rectangle');

    if (selectedIndex !== '') {
        const selectedBox = boxes[selectedIndex];
        const price = document.getElementById('sellProductPrice').value;
        const margin = document.getElementById('sellProductMargin').value;
        const quantity = document.getElementById('sellQuantityInput').value;
        const total = document.getElementById('sellTotalValue').value;

        console.log(`Venda realizada para o produto: ${selectedBox.dataset.name}, Preço: ${price}, Margem: ${margin}, Quantidade: ${quantity}, Total: ${total}`);
        document.getElementById('editModal').style.display = 'none';
        resetSellModalFields(); // Limpa os campos ao fechar o modal após a venda
    }
});
