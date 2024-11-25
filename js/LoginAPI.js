async function realizarLogin() {
    const loginInput = document.getElementById("login").value;
    const passwordInput = document.getElementById("password").value;

    // Requisição para realizar o login
    const response = await fetch("https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Usuario/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Login: loginInput, Password: passwordInput }),
    });

    if (response.ok) {
        const token = await response.text(); // Salva o token
        localStorage.setItem("authToken", token); // Salva o token no localStorage

        // Verifica permissões
        const isFuncionario = await verificarPermissao(token, "https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Acesso");
        const isAdmin = await verificarPermissao(token, "https://cors-anywhere.herokuapp.com/http://164.152.53.66:5000/Acesso/AcessoAdmin");

        // Redireciona baseado nas permissões
        if (isAdmin) {
            window.location.href = "TelaAdmin.html";
        } else if (isFuncionario) {
            window.location.href = "TelaFuncionario.html";
        } else {
            alert("Permissões insuficientes para acessar o sistema.");
        }
    } else {
        alert("Login ou senha inválidos.");
    }
}

// Função para verificar permissões
async function verificarPermissao(token, url) {
    const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.ok; // Retorna true se a resposta for 200 OK
}

// Adiciona o listener ao botão
document.getElementById("btn-login").addEventListener("click", (e) => {
    e.preventDefault();
    realizarLogin();
});
