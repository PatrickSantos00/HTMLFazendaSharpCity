//Remove infos de login do localStorage e redireciona para a página inicial.
function logout() {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authToken"); // Remove o token
    localStorage.removeItem("userType");
    alert("Desconectado com sucesso!");
    window.location.href = "https://fazendasharpcity.ddns.net/";
}