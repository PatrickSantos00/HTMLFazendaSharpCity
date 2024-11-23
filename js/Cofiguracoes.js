// Atualizar iniciais do perfil ao inserir o nome
document.getElementById("name").addEventListener("input", function (event) {
    const name = event.target.value;
    const initials = name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase())
        .join("")
        .slice(0, 2);

    const initialsContainer = document.getElementById("profile-initials");
    const profileImage = document.getElementById("profile-image");

    if (!profileImage.src) {
        initialsContainer.textContent = initials || "PS";
        initialsContainer.style.display = "flex";
    }

    document.getElementById("profile-name").textContent = name || "Nome do Usuário";
});

// Alterar foto de perfil
document.getElementById("upload-image").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const profileImage = document.getElementById("profile-image");
            profileImage.src = e.target.result;
            profileImage.style.display = "block";

            document.getElementById("profile-initials").style.display = "none";
            document.getElementById("camera-icon").style.display = "none";
        };
        reader.readAsDataURL(file);
    }
});

// Exibir notificações
function showNotification(message, isError = false) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";
    notification.style.backgroundColor = isError ? "#ff4d4d" : "#007f00";
    setTimeout(() => notification.style.display = "none", 3000);
}

// Função para excluir conta
function deleteAccount() {
    if (confirm("Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
        showNotification("Conta excluída com sucesso!");
    }
}

// Função para logout
function logout() {
    window.location.href = "https://fazendasharpcity.ddns.net/";
}

// Formatar número de telefone em tempo real
function formatPhone(event) {
    let phone = event.target.value.replace(/\D/g, '');
    if (phone.length <= 2) {
        phone = `(${phone}`;
    } else if (phone.length <= 7) {
        phone = `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
    } else {
        phone = `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
    }
    event.target.value = phone;
}

document.getElementById("phone").addEventListener("input", formatPhone);

// Validar e enviar o formulário
document.getElementById("submit-button").addEventListener("click", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const birthdate = document.getElementById("birthdate").value;
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value.replace(/\D/g, '');
    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Remover mensagens de erro antigas
    document.querySelectorAll('.error-message').forEach(e => e.remove());

    let valid = true;

    // Validações
    if (!name || name.split(' ').length < 2) {
        showError("name", "Por favor, insira pelo menos dois nomes.");
        valid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("email", "Por favor, insira um email válido.");
        valid = false;
    }

    if (!birthdate) {
        showError("birthdate", "Por favor, insira sua data de nascimento.");
        valid = false;
    }

    if (!gender) {
        showError("gender", "Por favor, selecione seu gênero.");
        valid = false;
    }

    if (phone.length !== 11) {
        showError("phone", "Por favor, insira um número de telefone válido com 11 dígitos.");
        valid = false;
    }

    if (newPassword !== confirmPassword) {
        showError("confirm-password", "As senhas não coincidem.");
        valid = false;
    }

    if (valid) {
        showNotification("Suas informações foram atualizadas com sucesso!");
    }
});

// Exibir mensagem de erro
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = document.createElement("span");
    error.className = "error-message";
    error.textContent = message;
    input.after(error);
}