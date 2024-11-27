// Função para validar o token (supondo que você tenha um método para isso)
function validarToken() {
    const token = localStorage.getItem('token'); // Supondo que o token esteja no localStorage
    if (!token) {
        alert('Token inválido ou não encontrado.');
        return null;
    }
    return token;
}

// Função para deletar a conta
async function deleteAccount() {
    const token = validarToken(); // Valida o token

    if (!token) return;

    // Obtemos o tipo de cadastro e o ID da conta a ser excluída
    const tipoCadastro = "Cliente"; // Supondo que é um Cliente. Caso tenha outros tipos, ajuste aqui.
    const id = document.getElementById("account-id").value; // Supondo que o ID da conta está armazenado em um input com id "account-id"

    if (!id) {
        alert("ID da conta não encontrado! Não é possível excluir.");
        return;
    }

    let url = "";

    // Define a URL com base no tipo de cadastro
    if (tipoCadastro === "Cliente") {
        url = `https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Cliente/Excluir/${id}`;
    } else if (tipoCadastro === "Funcionario") {
        url = `https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Funcionario/Excluir/${id}`;
    } else if (tipoCadastro === "Fornecedor") {
        url = `https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Fornecedor/Excluir/${id}`;
    } else {
        alert("Tipo de cadastro inválido.");
        return;
    }

    // Envia a requisição DELETE para excluir o cadastro
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir cadastro: ${response.statusText}`);
        }

        const data = await response.json();
        alert("Conta excluída com sucesso!");
        console.log("Resposta da API:", data);

    } catch (error) {
        console.error(error);
        alert("Erro ao excluir conta: " + error.message);
    }
}
