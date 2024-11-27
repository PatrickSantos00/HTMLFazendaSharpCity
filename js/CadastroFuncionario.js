function permitirApenasNumeros(event) {
    const key = event.key;
    if (!/[0-9]/.test(key) && key !== "Backspace" && key !== "Delete") {
        event.preventDefault();
    }
}

function permitirApenasLetras(event) {
    const key = event.key;
    if (!/[a-zA-ZçÇáÁéÉíÍóÓúÚãÃõÕâÂêÊôÔàÀ ]/.test(key) && key !== "Backspace" && key !== "Delete") {
        event.preventDefault();
    }
}

function formatarTelefone(value) {
    value = value.replace(/\D/g, '');
    if (value.length > 10) {
        return value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 6) {
        return value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else {
        return value.replace(/^(\d{2})(\d{0,4})$/, '($1) $2');
    }
}

function validarCep(value) {
    return /^\d{5}-\d{3}$/.test(value);
}

function validarEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

function limitarDigitosTelefone(event) {
    const input = event.target;
    const value = input.value.replace(/\D/g, '');
    if (value.length > 11) {
        input.value = value.slice(0, 11);
    }
}

function validarFormulario() {
    document.getElementById("validation-errors").innerHTML = "";
    const erros = [];

    const nome = document.getElementById("nome").value.trim();
    if (!nome || nome.split(' ').length < 2) {
        erros.push("O nome deve conter pelo menos dois nomes.");
    }

    const senha = document.getElementById("senha").value.trim();
    if (!senha || senha.length < 6) {
        erros.push("A senha deve conter no mínimo 6 caracteres.");
    }

    const telefone = document.getElementById("telefone").value.trim();
    if (!telefone || telefone.replace(/\D/g, '').length !== 11) {
        erros.push("O telefone deve conter exatamente 11 dígitos.");
    }

    const email = document.getElementById("email").value.trim();
    if (!validarEmail(email)) {
        erros.push("O email informado é inválido.");
    }

    const cpfCnpj = document.getElementById("cpf").value.trim();
    if (!cpfCnpj || cpfCnpj.replace(/\D/g, '').length < 11) {
        erros.push("O CPF ou CNPJ deve conter pelo menos 11 números.");
    }

    const cep = document.getElementById("cep").value.trim();
    if (!validarCep(cep)) {
        erros.push("O CEP deve estar no formato 00000-000.");
    }

    const camposObrigatorios = ['uf', 'cidade', 'endereco', 'logradouro', 'bairro', 'numero'];
    camposObrigatorios.forEach(function (id) {
        const campo = document.getElementById(id);
        if (!campo || !campo.value.trim()) {
            erros.push("O campo " + campo.previousElementSibling.innerText + " é obrigatório.");
        }
    });

    if (erros.length > 0) {
        const errorHtml = "<ul>" + erros.map(erro => `<li>${erro}</li>`).join('') + "</ul>";
        document.getElementById("validation-errors").innerHTML = errorHtml;
        return false;
    }

    return true;
}

function aplicarFormatacao(event) {
    const campo = event.target;
    const value = campo.value;

    if (campo.id === "cpf") {
        campo.value = value.replace(/\D/g, '');
    } else if (campo.id === "telefone") {
        campo.value = formatarTelefone(value);
    } else if (campo.id === "cep") {
        campo.value = value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})$/, '$1-$2');
    }
}

// Adicionando os eventos de forma eficiente
document.getElementById('nome').addEventListener('keydown', permitirApenasLetras);
document.getElementById('cidade').addEventListener('keydown', permitirApenasLetras);
document.getElementById('telefone').addEventListener('input', aplicarFormatacao);
document.getElementById('telefone').addEventListener('keydown', permitirApenasNumeros);
document.getElementById('cep').addEventListener('input', aplicarFormatacao);
document.getElementById('cep').addEventListener('keydown', permitirApenasNumeros);
document.getElementById('cpf').addEventListener('keydown', permitirApenasNumeros);
document.getElementById('numero').addEventListener('keydown', permitirApenasNumeros);
