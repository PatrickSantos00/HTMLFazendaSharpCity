function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}


document.getElementById('openModalBtn').addEventListener('click', function() {
    console.log("Abrindo modal de inclusão de produto.");
    document.getElementById('modal').style.display = 'flex';
});

document.getElementById('closeModalBtn').addEventListener('click', function() {
    console.log("Fechando modal de inclusão de produto.");
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('deleteProductBtn').addEventListener('click', function() {
    console.log("Abrindo modal de exclusão de produto.");
    populateProductSelect();
    document.getElementById('deleteModal').style.display = 'flex';
});

document.getElementById('closeDeleteModalBtn').addEventListener('click', function() {
    console.log("Fechando modal de exclusão de produto.");
    document.getElementById('deleteModal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    const deleteModal = document.getElementById('deleteModal');
    if (event.target === modal) {
        console.log("Fechando modal de inclusão ao clicar fora.");
        modal.style.display = 'none';
    }
    if (event.target === deleteModal) {
        console.log("Fechando modal de exclusão ao clicar fora.");
        deleteModal.style.display = 'none';
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
        <p>Preço: R$ ${preco}</p>
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
        const productNameElement = box.querySelector('p');
        
        // Verifica se o elemento p foi encontrado
        if (productNameElement) {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = productNameElement.textContent; // Usa o nome do produto
            select.appendChild(option);
        } else {
            console.log(`Produto na posição ${index} está vazio e não será adicionado à lista.`);
        }
    });

    console.log("Opções de produtos preenchidas:", select.innerHTML);
}


// Remove o produto selecionado
document.querySelector('#deleteProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedIndex = document.getElementById('productSelect').value;
    const boxes = document.querySelectorAll('.container .rectangle');

    if (selectedIndex !== '') {
        console.log(`Removendo produto na posição: ${selectedIndex}`);
        boxes[selectedIndex].remove();
        document.getElementById('deleteModal').style.display = 'none';
    } else {
        console.log("Nenhum produto selecionado para remoção.");
    }
});

// Criação de um modal para edição de produtos
// Abre o modal de edição ao clicar no botão "Editar Produto"
document.getElementById('editProductBtn').addEventListener('click', function() {
    console.log("Abrindo modal de edição de produto.");
    populateEditProductSelect();
    document.getElementById('editModal').style.display = 'flex';
});

// Fecha o modal de edição ao clicar no botão de fechar
document.getElementById('closeEditModalBtn').addEventListener('click', function() {
    console.log("Fechando modal de edição de produto.");
    document.getElementById('editModal').style.display = 'none';
});

// Função para preencher o seletor de produtos no modal de edição
function populateEditProductSelect() {
    const select = document.getElementById('editProductSelect');
    select.innerHTML = ''; // Limpa as opções existentes
    const boxes = document.querySelectorAll('.container .rectangle');

    boxes.forEach((box, index) => {
        const productNameElement = box.querySelector('p');
        if (productNameElement) {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = box.querySelector('p').textContent.split(": ")[1]; // Usa o nome do produto
            select.appendChild(option);
        }
    });
    console.log("Opções de produtos preenchidas para edição:", select.innerHTML);
}

// Preenche o formulário de edição com os dados do produto selecionado
document.getElementById('editProductSelect').addEventListener('change', function() {
    const selectedIndex = this.value;
    const boxes = document.querySelectorAll('.container .rectangle');

    if (selectedIndex !== '') {
        const selectedBox = boxes[selectedIndex];
        document.getElementById('editProductName').value = selectedBox.dataset.name;
        document.getElementById('editProductQuantity').value = selectedBox.dataset.quantity;
        document.getElementById('editProductPrice').value = selectedBox.dataset.price;
        document.getElementById('editProductValidity').value = selectedBox.dataset.validity;
    }
});

// Atualiza o produto com os novos valores ao submeter o formulário de edição
document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedIndex = document.getElementById('editProductSelect').value;
    const boxes = document.querySelectorAll('.container .rectangle');

    if (selectedIndex !== '') {
        const selectedBox = boxes[selectedIndex];
        const newName = document.getElementById('editProductName').value;
        const newQuantity = document.getElementById('editProductQuantity').value;
        const newPrice = document.getElementById('editProductPrice').value;
        const newValidity = document.getElementById('editProductValidity').value;

        selectedBox.querySelector('p:nth-child(1)').textContent = "Nome: " + newName;
        selectedBox.querySelector('p:nth-child(2)').textContent = "Quantidade: " + newQuantity;
        selectedBox.querySelector('p:nth-child(3)').textContent = "Preço: R$ " + newPrice;
        selectedBox.querySelector('p:nth-child(4)').textContent = "Validade: " + formatDate(newValidity);

        selectedBox.dataset.name = newName;
        selectedBox.dataset.quantity = newQuantity;
        selectedBox.dataset.price = newPrice;
        selectedBox.dataset.validity = newValidity;

        document.getElementById('editModal').style.display = 'none';
    }
});

