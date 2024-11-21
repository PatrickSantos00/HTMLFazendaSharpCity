//Remove infos de login do localStorage e redireciona para a página inicial.
function logout() {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userType");
    window.location.href = "https://fazendasharpcity.ddns.net/";
}
