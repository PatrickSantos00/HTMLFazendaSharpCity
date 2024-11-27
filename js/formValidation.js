document.addEventListener("DOMContentLoaded", () => {
    // Adiciona o evento para todos os botões de pesquisar
    document.querySelectorAll(".btn-pesquisar").forEach((button) => {
        button.addEventListener("click", (event) => {
            validarCadastro(event.target.id); // Passa o ID do botão clicado
        });
    });
});

// Validação do token
function validarToken() {
    const token = localStorage.getItem("authToken"); // Obtém o token armazenado
    if (!token) {
        alert("Você não está autenticado. Faça login para continuar.");
        window.location.href = "login.html"; // Redireciona para login
    }
    return token;
}

// Função que valida o cadastro com base no botão clicado
function validarCadastro(botaoId) {
    const token = validarToken(); // Valida o token
    if (!token) return;

    let url = "";
    let valorPesquisa = "";

    // Identifica o botão clicado e o campo de entrada correspondente
    if (botaoId === "btn-pesquisar-cliente") {
        valorPesquisa = document.getElementById("cpf-cnpj").value;
        url = `https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Cliente/PesquisaCPF-CNPJ/${valorPesquisa}`;
    } else if (botaoId === "btn-pesquisar-funcionario") {
        valorPesquisa = document.getElementById("cpf").value;
        url = `https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Funcionario/PesquisaCPF/${valorPesquisa}`;
    } else if (botaoId === "btn-pesquisar-fornecedor") {
        valorPesquisa = document.getElementById("cnpj").value;
        url = `https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Fornecedor/PesquisaCNPJ/${valorPesquisa}`;
    }

    // Valida se o campo foi preenchido
    if (!valorPesquisa || valorPesquisa.trim() === "") {
        alert("Por favor, preencha o campo correspondente antes de pesquisar.");
        return;
    }

    // Chama a função para buscar os dados
    buscarDados(url, token, botaoId);
}

// Função para buscar dados e preencher o formulário
async function buscarDados(url, token, botaoId) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }

        const data = await response.json();
        preencherFormulario(data, botaoId);
    } catch (error) {
        console.error(error);
        alert("Erro ao buscar dados: " + error.message);
    }
}

// Função para preencher o formulário com os dados recebidos
function preencherFormulario(data, botaoId) {
    const camposPrincipais = ["id", "nome", "telefone", "email", "cpf", "cnpj"];
    camposPrincipais.forEach(campo => {
        if (campo !== "id" && data[campo] !== undefined) {
            const input = document.getElementById(campo);
            if (input) {
                input.value = data[campo];
            }
        }
    });

    if (data.id) {
        localStorage.setItem("id", data.id);  // Armazenando o id
    }

    // Verifica se o botão "Pesquisar Fornecedor" foi clicado
    if (botaoId === "btn-pesquisar-fornecedor") {
        const razaoSocialInput = document.getElementById("razao-social");
        const nomeFantasiaInput = document.getElementById("nome-fantasia");

        // Verifica se os elementos existem antes de tentar preenchê-los
        if (razaoSocialInput && data.razaoSocial !== undefined) { // Usar razaoSocial
            razaoSocialInput.value = data.razaoSocial; // Usar razaoSocial
        }

        if (nomeFantasiaInput && data.nomeFantasia !== undefined) { // Usar nomeFantasia
            nomeFantasiaInput.value = data.nomeFantasia; // Usar nomeFantasia
        }
    }

    if (data.endereco) {
        const camposEndereco = ["logradouro", "complemento", "bairro", "estado", "cidade", "cep", "numero"];
        camposEndereco.forEach(campo => {
            const input = document.getElementById(campo);
            if (input) {
                input.value = data.endereco[campo];
            }
        });
    }
}