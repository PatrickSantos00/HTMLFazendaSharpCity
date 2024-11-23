// Função para garantir que somente números possam ser digitados
function permitirApenasNumeros(event) {
    let key = event.key; // Pega a tecla pressionada

    // Se a tecla não for um número (0-9), previne a digitação, mas permite Backspace e Delete
    if (!/[0-9]/.test(key) && key !== "Backspace" && key !== "Delete") {
        event.preventDefault(); // Impede a digitação de letras ou outros caracteres
    }
}

// Função para formatar CPF e CNPJ
function formatarCpfCnpj(value) {
    // Remove todos os caracteres não numéricos
    value = value.replace(/\D/g, '');

    // Se for CPF (11 dígitos)
    if (value.length <= 11) {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    }
    // Se for CNPJ (14 dígitos)
    else if (value.length > 11) {
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }

    return value;
}

// Função para formatar Número
function formatarNumero(value) {
    // Remove todos os caracteres não numéricos
    value = value.replace(/\D/g, '');

    // Formata o número conforme o tamanho
    if (value.length > 10) {
        // Formata para o padrão 00000-0000
        value = value.replace(/^(\d{5})(\d{4})$/, '$1-$2');
    }

    return value;
}

// Função de validação do formulário
function validarFormulario() {
    // Limpa os erros anteriores
    document.getElementById("validation-errors").innerHTML = "";

    let erros = [];

    // Validação do Nome: Deve ter pelo menos dois nomes
    let nome = document.getElementById("nome").value;
    if (!nome || nome.split(' ').length < 2) {
        erros.push("O nome deve conter pelo menos dois nomes.");
    }

    // Validação CPF/CNPJ: Deve aceitar apenas números
    let cpfCnpj = document.getElementById("cpf").value;
    if (!/^\d+$/.test(cpfCnpj)) {
        erros.push("CPF ou CNPJ deve conter apenas números.");
    }

    // Validação UF: Garantir que uma UF seja selecionada
    let uf = document.getElementById("uf").value;
    if (!uf) {
        erros.push("Selecione uma UF.");
    }

    // Validação Número: Aceitar somente números
    let numero = document.getElementById("numero").value;
    if (!/^\d+$/.test(numero)) {
        erros.push("O número deve conter apenas números.");
    }

    // Validação de campos obrigatórios
    let camposObrigatorios = ['nome', 'tipo-pessoa', 'cpf', 'data-nascimento', 'genero', 'uf', 'cidade', 'endereco', 'logradouro', 'bairro', 'numero'];
    camposObrigatorios.forEach(function(id) {
        let campo = document.getElementById(id);
        if (!campo.value) {
            erros.push("O campo " + campo.previousElementSibling.innerText + " é obrigatório.");
        }
    });

    // Se houver erros, exibe as mensagens
    if (erros.length > 0) {
        let errorHtml = "<ul>";
        erros.forEach(function (erro) {
            errorHtml += "<li>" + erro + "</li>";
        });
        errorHtml += "</ul>";
        document.getElementById("validation-errors").innerHTML = errorHtml;
        return false; // Impede o envio do formulário
    }

    return true; // Permite o envio do formulário
}

// Função para aplicar a formatação quando o campo perde o foco
function aplicarFormatacao(event) {
    let campo = event.target;
    let value = campo.value;

    // Aplicando formatação para CPF, CNPJ ou Número
    if (campo.id === "cpf") {
        campo.value = formatarCpfCnpj(value);
    } else if (campo.id === "numero") {
        campo.value = formatarNumero(value);
    }
}

// Adiciona os eventos para os campos CPF, CNPJ e Número
document.getElementById('cpf').addEventListener('input', function(event) {
    let value = event.target.value;
    // Permite apenas números enquanto digita
    event.target.value = value.replace(/\D/g, '');
});

// Quando o campo perder o foco, formata os valores corretamente
document.getElementById('cpf').addEventListener('blur', aplicarFormatacao);
document.getElementById('numero').addEventListener('blur', aplicarFormatacao);

// Garante que apenas números sejam digitados
document.getElementById('numero').addEventListener('keydown', permitirApenasNumeros);
document.getElementById('cpf').addEventListener('keydown', permitirApenasNumeros);
