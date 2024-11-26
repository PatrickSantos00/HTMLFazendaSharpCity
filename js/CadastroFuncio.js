async function cadastrarUsuario(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Captura os dados do formulário
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const email = document.getElementById("email").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const uf = document.getElementById("uf").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const logradouro = document.getElementById("logradouro").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const complemento = document.getElementById("complemento").value.trim();
    const usuario = document.getElementById("usuario").value.trim();  // Novo campo de usuário
    const senha = document.getElementById("senha").value.trim();  // Novo campo de senha

    // Validação básica no cliente
    const validationErrors = validarFormulario(cpf, usuario, senha);
    if (validationErrors.length > 0) {
        exibirErros(validationErrors);
        return;
    }

    try {
        // Cadastro do endereço
        const enderecoPayload = {
            logradouro: logradouro,
            complemento: complemento,
            bairro: bairro,
            estado: uf,
            cidade: cidade,
            cep: cep,
            numero: parseInt(numero), // Converte número para inteiro
        };

        const enderecoResponse = await fetch("https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Endereco", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(enderecoPayload),
        });

        if (!enderecoResponse.ok) {
            const errorDetails = await enderecoResponse.json();
            throw new Error(`Erro ao cadastrar endereço: ${errorDetails.message || enderecoResponse.statusText}`);
        }

        const enderecoData = await enderecoResponse.json(); // Recebe o `EnderecoId` do backend
        const enderecoId = enderecoData.id;


        // Cadastro do funcionário
        const funcionarioPayload = {
            Nome: nome,
            Cpf: cpf,
            Email: email,
            TelefoneFuncionario: telefone,
            EnderecoId: enderecoId, // Usa o ID do endereço
        };

        const funcionarioResponse = await fetch("https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Funcionario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(funcionarioPayload),
        });

        if (!funcionarioResponse.ok) {
            const errorDetails = await funcionarioResponse.json();
            throw new Error(`Erro ao cadastrar funcionário: ${errorDetails.message || funcionarioResponse.statusText}`);
        }

        // Agora, cadastro do usuário com o login e senha
        const usuarioPayload = {
            Username: usuario,
            Password: senha
        };

        const usuarioResponse = await fetch("https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Usuario/CadastroFunci", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuarioPayload),
        });

        if (!usuarioResponse.ok) {
            const errorDetails = await usuarioResponse.json();
            throw new Error(`Erro ao cadastrar usuário: ${errorDetails.message || usuarioResponse.statusText}`);
        }

        // Sucesso no cadastro do usuário
        console.log("Usuário cadastrado com sucesso!");

        // Exibe mensagem de sucesso e redireciona
        alert("Cadastro realizado com sucesso!");
        window.location.href = "./Login.html";

    } catch (error) {
        // Exibe mensagem de erro
        console.error("Erro durante o cadastro:", error);
        document.getElementById("validation-errors").innerText = error.message;
    }
}

// Função de validação básica no cliente
function validarFormulario(cpf, usuario, senha) {
    const errors = [];

    // Verifique se o CPF tem 11 dígitos numéricos
    if (!/^\d{11}$/.test(cpf)) {
        errors.push("CPF deve conter 11 dígitos numéricos.");
    }

    // Validação do campo de usuário
    if (!usuario || usuario.length < 3) {
        errors.push("O nome de usuário deve ter pelo menos 3 caracteres.");
    }

    // Validação da senha
    if (!senha || senha.length < 6) {
        errors.push("A senha deve ter pelo menos 6 caracteres.");
    }

    return errors;
}


// Função para exibir erros de validação
function exibirErros(errors) {
    const errorContainer = document.getElementById("validation-errors");
    errorContainer.innerHTML = errors.join("<br>");
}

// Adiciona o listener ao formulário
document.getElementById("form-cadastro").addEventListener("submit", cadastrarUsuario);
