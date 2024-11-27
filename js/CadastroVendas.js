// Função para carregar clientes
async function carregarClientes(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const token = localStorage.getItem("authToken"); // Obtém o token armazenado

    if (!token) {
        alert("Token de autenticação não encontrado!");
        return;
    }

    try {
        // Configurar cabeçalhos com o token
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Insere o token automaticamente
        };

        // Fazer a requisição à API com os cabeçalhos
        const response = await fetch("https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Cliente", {
            method: "GET",
            headers: headers
        });

        if (!response.ok) throw new Error("Erro ao buscar clientes");

        const clientes = await response.json();
        const clienteSelect = document.getElementById("clienteVenda");
        clienteSelect.innerHTML = '<option value="" disabled selected>Selecione um Cliente</option>'; // Limpa o campo

        clientes.forEach(cliente => {
            const option = document.createElement("option");
            option.value = cliente.nome; // Ajuste conforme o campo desejado do cliente
            option.textContent = cliente.nome; // Ajuste conforme o campo desejado
            clienteSelect.appendChild(option);
        });
    } catch (error) {
        alert("Erro ao carregar clientes: " + error.message);
    }
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarClientes);
