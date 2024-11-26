async function validarFormulario(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const token = localStorage.getItem("authToken"); // Obtém o token armazenado

    // Configurar cabeçalhos
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Insere o token automaticamente
    };

    const fornecedor = {
        razaoSocial: document.getElementById("razaosocial").value,
        nomeFantasia: document.getElementById("nome").value,
        cnpj: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        telefoneFornecedor: document.getElementById("telefone").value,
        enderecoId: 0 // Será atualizado após o cadastro do endereço
    };

    const endereco = {
        logradouro: document.getElementById("logradouro").value,
        complemento: document.getElementById("complemento").value,
        bairro: document.getElementById("bairro").value,
        estado: document.getElementById("uf").value,
        cidade: document.getElementById("cidade").value,
        cep: document.getElementById("cep").value.replace("-", ""), // Remove hífen do CEP
        numero: parseInt(document.getElementById("numero").value, 10) // Converte o número para inteiro
    };

    try {
        // Cadastrar endereço
        const enderecoResponse = await fetch("https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Endereco", {
            method: "POST",
            headers,
            body: JSON.stringify(endereco)
        });

        const enderecoData = await enderecoResponse.json();
        if (!enderecoResponse.ok) {
            throw new Error(`Erro ao cadastrar endereço: ${enderecoData.message || "Desconhecido"}`);
        }

        fornecedor.enderecoId = enderecoData.id; // Supondo que a API retorna o ID do endereço criado

        // Cadastrar fornecedor
        const fornecedorResponse = await fetch("https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Fornecedor", {
            method: "POST",
            headers,
            body: JSON.stringify(fornecedor)
        });

        const fornecedorData = await fornecedorResponse.json();
        if (!fornecedorResponse.ok) {
            throw new Error(`Erro ao cadastrar fornecedor: ${fornecedorData.message || "Desconhecido"}`);
        }

        alert("Cadastro realizado com sucesso!");
        console.log("Fornecedor cadastrado:", fornecedorData);
    } catch (error) {
        console.error(error);
        document.getElementById("validation-errors").textContent = error.message;
    }

    return false;
}
