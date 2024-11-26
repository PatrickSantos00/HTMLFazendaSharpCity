async function validarFormulario() {
    // Obter os dados do formulário
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
        cep: document.getElementById("cep").value,
        numero: document.getElementById("numero").value
    };

    try {
        // Cadastrar endereço
        const enderecoResponse = await fetch("https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Endereco", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(endereco)
        });

        if (!enderecoResponse.ok) {
            throw new Error("Erro ao cadastrar endereço.");
        }

        const enderecoData = await enderecoResponse.json();
        fornecedor.enderecoId = enderecoData.id; // Supondo que a API retorna o ID do endereço criado

        // Cadastrar fornecedor
        const fornecedorResponse = await fetch("https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Fornecedor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fornecedor)
        });

        if (!fornecedorResponse.ok) {
            throw new Error("Erro ao cadastrar fornecedor.");
        }

        const fornecedorData = await fornecedorResponse.json();
        alert("Cadastro realizado com sucesso!");
        console.log("Fornecedor cadastrado:", fornecedorData);
    } catch (error) {
        console.error(error);
        document.getElementById("validation-errors").textContent = error.message;
    }

    // Impede o envio tradicional do formulário
    return false;
}
