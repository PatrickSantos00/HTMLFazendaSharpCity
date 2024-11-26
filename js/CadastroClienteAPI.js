document.getElementById('form-cadastro').addEventListener('submit', async function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Obtém o token armazenado no localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("Você não está autenticado. Faça login novamente.");
        return;
    }

    // Configura os cabeçalhos com o token
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const cpf = document.getElementById('cpf').value;
    const cnpj = document.getElementById('cnpj').value;
    const cep = document.getElementById('cep').value.replace("-", "");
    const uf = document.getElementById('uf').value;
    const cidade = document.getElementById('cidade').value;
    const endereco = document.getElementById('endereco').value;
    const logradouro = document.getElementById('logradouro').value;
    const bairro = document.getElementById('bairro').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complemento').value;

    // Determina qual documento enviar
    const documento = tipoDocumento === 'cpf' ? { cpf } : { cnpj };

    // Monta os objetos Cliente e Endereco
    const clienteData = {
        nome,
        telefone,
        email,
        ...documento, // Insere o CPF ou CNPJ dinamicamente
        enderecoId: null // Será preenchido após cadastrar o endereço
    };

    const enderecoData = {
        logradouro,
        complemento,
        bairro,
        estado: uf,
        cidade,
        cep,
        numero: parseInt(numero, 10) || 0
    };

    try {
        // Faz a requisição para criar o endereço
        const enderecoResponse = await fetch("https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Endereco", {
            method: "POST",
            headers,
            body: JSON.stringify(enderecoData)
        });

        if (!enderecoResponse.ok) {
            throw new Error("Erro ao cadastrar endereço");
        }

        const enderecoResult = await enderecoResponse.json();
        clienteData.enderecoId = enderecoResult.id; // Assume que a API retorna um "id"

        // Faz a requisição para criar o cliente
        const clienteResponse = await fetch("https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Cliente", {
            method: "POST",
            headers,
            body: JSON.stringify(clienteData)
        });

        if (!clienteResponse.ok) {
            throw new Error("Erro ao cadastrar cliente");
        }

        const clienteResult = await clienteResponse.json();
        alert("Cliente cadastrado com sucesso!");
        console.log("Cliente cadastrado:", clienteResult);

    } catch (error) {
        console.error(error);
        document.getElementById('validation-errors').textContent = error.message;
    }
});
