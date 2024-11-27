// Função que realiza a atualização dos dados
async function atualizarCadastro(tipoCadastro, id) {
    const token = validarToken(); // Valida o token

    if (!token) return;

    let url = "";
    let dadosAtualizados = {};

    // Preenche os dados com os valores dos campos
    if (tipoCadastro === "Cliente") {
        url = `https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Cliente/Atualizar/${id}`;
        dadosAtualizados = {
            nome: document.getElementById("nome").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value,
            cpf: document.getElementById("cpf-cnpj").value,
            cnpj: document.getElementById("cnpj").value,
            razaoSocial: document.getElementById("razao-social") ? document.getElementById("razao-social").value : undefined,
            nomeFantasia: document.getElementById("nome-fantasia") ? document.getElementById("nome-fantasia").value : undefined,
            endereco: {
                logradouro: document.getElementById("logradouro").value,
                complemento: document.getElementById("complemento").value,
                bairro: document.getElementById("bairro").value,
                estado: document.getElementById("estado").value,
                cidade: document.getElementById("cidade").value,
                cep: document.getElementById("cep").value,
                numero: document.getElementById("numero").value
            }
        };
    } else if (tipoCadastro === "Funcionario") {
        url = `https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Funcionario/Atualizar/${id}`;
        dadosAtualizados = {
            nome: document.getElementById("nome").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value,
            cpf: document.getElementById("cpf").value,
            endereco: {
                logradouro: document.getElementById("logradouro").value,
                complemento: document.getElementById("complemento").value,
                bairro: document.getElementById("bairro").value,
                estado: document.getElementById("estado").value,
                cidade: document.getElementById("cidade").value,
                cep: document.getElementById("cep").value,
                numero: document.getElementById("numero").value
            }
        };
    } else if (tipoCadastro === "Fornecedor") {
        url = `https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Fornecedor/Atualizar/${id}`;
        dadosAtualizados = {
            nome: document.getElementById("nome").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value,
            cnpj: document.getElementById("cnpj").value,
            razaoSocial: document.getElementById("razao-social") ? document.getElementById("razao-social").value : undefined,
            nomeFantasia: document.getElementById("nome-fantasia") ? document.getElementById("nome-fantasia").value : undefined,
            endereco: {
                logradouro: document.getElementById("logradouro").value,
                complemento: document.getElementById("complemento").value,
                bairro: document.getElementById("bairro").value,
                estado: document.getElementById("estado").value,
                cidade: document.getElementById("cidade").value,
                cep: document.getElementById("cep").value,
                numero: document.getElementById("numero").value
            }
        };
    } else {
        alert("Tipo de cadastro inválido.");
        return;
    }

    // Log para verificar a URL e os dados
    console.log("URL da requisição:", url);
    console.log("Dados atualizados:", dadosAtualizados);

    // Envia a requisição PUT com os dados atualizados
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar dados: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Resposta da API:", data); // Log da resposta da API

        alert("Cadastro atualizado com sucesso!");

    } catch (error) {
        console.error(error);
        alert("Erro ao atualizar dados: " + error.message);
    }
}

// Escutando o evento DOMContentLoaded para quando a página for carregada
document.addEventListener("DOMContentLoaded", () => {
    // Escutando todos os botões de submit
    const botoesSubmit = document.querySelectorAll("button[type='submit']");

    botoesSubmit.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); // Previne o envio do formulário

            // Obtemos o id do botão que foi clicado
            const botaoId = event.target.id;
            console.log("ID do botão clicado:", botaoId); // Verifique o id do botão no console

            // Mapeamento de botões para tipoCadastro
            const tipoCadastroMap = {
                "btn-pesquisar-cliente": "Cliente",
                "btn-pesquisar-funcionario": "Funcionario",
                "btn-pesquisar-fornecedor": "Fornecedor"
            };

            // Verifica se o botão existe no mapa
            const tipoCadastro = tipoCadastroMap[botaoId];

            if (!tipoCadastro) {
                alert("Botão inválido.");
                return;
            }

            // Recupera o id do localStorage
            const id = localStorage.getItem("id");
            if (!id) {
                alert("ID não encontrado! Não é possível atualizar.");
                return;
            }
            // Chama a função de atualização com o tipo de cadastro e o id
            atualizarCadastro(tipoCadastro, id);
        });
    });
});
