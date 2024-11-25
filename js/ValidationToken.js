// Verificar se o token está salvo
const token = localStorage.getItem("authToken");

if (!token) {
    // Se não houver token, redirecione para a página de login
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "/login.html";
} else {
    console.log("Usuário autenticado. Token:", token);
    // Você pode usar esse token para fazer requisições protegidas à API
}
