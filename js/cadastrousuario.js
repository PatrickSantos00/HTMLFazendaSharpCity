function permitirApenasNumeros(event) {
    let key = event.key;
    if (!/[0-9]/.test(key) && key !== "Backspace" && key !== "Delete") {
        event.preventDefault();
    }
}

function formatarCpfCnpj(value) {
    value = value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    } else if (value.length > 11) {
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }
    return value;
}

function formatarNumero(value) {
    value = value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.replace(/^(\d{5})(\d{4})$/, '$1-$2');
    }
    return value;
}

function validarFormulario() {
    document.getElementById("validation-errors").innerHTML = "";
    let erros = [];

    let nome = document.getElementById("nome").value;
    if (!nome || nome.split(' ').length < 2) {
        erros.push("O nome deve conter pelo menos dois nomes.");
    }

    let cpfCnpj = document.getElementById("cpf").value;
    if (!/^\d+$/.test(cpfCnpj)) {
        erros.push("CPF ou CNPJ deve conter apenas números.");
    }

    let uf = document.getElementById("uf").value;
    if (!uf) {
        erros.push("Selecione uma UF.");
    }

    let numero = document.getElementById("numero").value;
    if (!/^\d+$/.test(numero)) {
        erros.push("O número deve conter apenas números.");
    }

    let camposObrigatorios = ['nome', 'tipo-pessoa', 'cpf', 'data-nascimento', 'genero', 'uf', 'cidade', 'endereco', 'logradouro', 'bairro', 'numero'];
    camposObrigatorios.forEach(function(id) {
        let campo = document.getElementById(id);
        if (!campo.value) {
            erros.push("O campo " + campo.previousElementSibling.innerText + " é obrigatório.");
        }
    });

    if (erros.length > 0) {
        let errorHtml = "<ul>";
        erros.forEach(function (erro) {
            errorHtml += "<li>" + erro + "</li>";
        });
        errorHtml += "</ul>";
        document.getElementById("validation-errors").innerHTML = errorHtml;
        return false;
    }

    return true;
}

function aplicarFormatacao(event) {
    let campo = event.target;
    let value = campo.value;
    if (campo.id === "cpf") {
        campo.value = formatarCpfCnpj(value);
    } else if (campo.id === "numero") {
        campo.value = formatarNumero(value);
    }
}

document.getElementById('cpf').addEventListener('input', function(event) {
    let value = event.target.value;
    event.target.value = value.replace(/\D/g, '');
});

document.getElementById('cpf').addEventListener('blur', aplicarFormatacao);
document.getElementById('numero').addEventListener('blur', aplicarFormatacao);
document.getElementById('numero').addEventListener('keydown', permitirApenasNumeros);
document.getElementById('cpf').addEventListener('keydown', permitirApenasNumeros);
