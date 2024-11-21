document.addEventListener("DOMContentLoaded", function () {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userType = localStorage.getItem("userType");

    // Verifica se o usuário está logado e se tem o tipo correto
    if (isAuthenticated !== "true" || !userType) {
        //alert("Você precisa fazer login para acessar esta página.");
        window.location.href = "../Login.html"; // Redireciona para o login
    }

    // Se necessário, verifica o tipo de usuário
    if (userType !== "usuario" && window.location.pathname.includes("../TelaUser.html")) {
        alert("Acesso negado.");
        window.location.href = "../Login.html";
    }
    if (userType !== "funcionario" && window.location.pathname.includes("../TelaFuncionario.html")) {
        alert("Acesso negado.");
        window.location.href = "../Login.html";
    }
    if (userType !== "admin" && window.location.pathname.includes("../TelaAdmin.html")) {
        alert("Acesso negado.");
        window.location.href = "../Login.html";
    }
});
