const token = localStorage.getItem("authToken"); // Obtém o token armazenado
const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` // Insere o token automaticamente
};

// Função para cadastrar produto
async function cadastrarProduto(produto) {
    try {
        const response = await fetch("https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Produto/Cadastrar", {
            method: "POST",
            headers,
            body: JSON.stringify(produto)
        });
        if (!response.ok) throw new Error("Erro ao cadastrar produto");

        alert("Produto cadastrado com sucesso!");
    } catch (error) {
        alert("Erro ao cadastrar produto: " + error.message);
    }
}

// Função para editar produto
async function editarProduto() {
    const produtoId = prompt("Informe o ID do produto que deseja editar:");
    if (!produtoId) return alert("ID do produto não informado!");

    try {
        const produto = {
            nome: document.getElementById("produto").value,
            quantidade: parseInt(document.getElementById("quantidade").value),
            validade: document.getElementById("validade").value,
            preco: parseFloat(document.getElementById("preco").value),
            descricao: document.getElementById("descricao").value
        };

        const response = await fetch(`https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Produto/Atualizar/${produtoId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(produto)
        });

        if (!response.ok) throw new Error("Erro ao editar produto");

        alert("Produto editado com sucesso!");
    } catch (error) {
        alert("Erro ao editar produto: " + error.message);
    }
}

// Função para excluir produto
async function excluirProduto() {
    const produtoId = prompt("Informe o ID do produto que deseja excluir:");
    if (!produtoId) return alert("ID do produto não informado!");

    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Produto/Excluir/${produtoId}`, {
            method: "DELETE",
            headers
        });

        if (!response.ok) throw new Error("Erro ao excluir produto");

        alert("Produto excluído com sucesso!");
    } catch (error) {
        alert("Erro ao excluir produto: " + error.message);
    }
}

// Listener para formulário
document.getElementById("produtoForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const produto = {
        nome: document.getElementById("produto").value,
        quantidade: parseInt(document.getElementById("quantidade").value),
        validade: document.getElementById("validade").value,
        preco: parseFloat(document.getElementById("preco").value),
        descricao: document.getElementById("descricao").value
    };

    await cadastrarProduto(produto);
});