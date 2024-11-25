document.getElementById('openModalBtn').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'flex'; // Exibe o modal
});

document.getElementById('closeModalBtn').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'none'; // Esconde o modal
});

// Lida com o envio do formulário para criar o card
document.querySelector('#addEmployeeForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o recarregamento da página

    // Obtém os valores do formulário
    const nome = document.getElementById('employeeName').value;
    const documento = document.getElementById('employeeDocument').value;
    const nascimento = document.getElementById('employeeBirthDate').value;
    const genero = document.getElementById('employeeGender').value;
    const cidade = document.getElementById('employeeCity').value;
    const estado = document.getElementById('employeeState').value;
    const endereco = document.getElementById('employeeAddress').value;
    const numero = document.getElementById('employeeNumber').value;
    const complemento = document.getElementById('employeeComplement').value;
    const bairro = document.getElementById('employeeDistrict').value;

    // Validação do CPF
    if (!isValidCPF(documento)) {
        alert("O CPF deve ter 11 dígitos numéricos!");
        return; // Cancela o envio se o CPF for inválido
    }

    // Cria o card com os campos preenchidos
    const newCard = document.createElement('div');
    newCard.classList.add('rectangle');

    const fields = [
        { label: "Nome", value: nome },
        { label: "CPF", value: formatCPF(documento) }, // Formata o CPF
        { label: "Data de Nascimento", value: formatDate(nascimento) },
        { label: "Gênero", value: genero },
        { label: "Cidade", value: cidade },
        { label: "Estado (UF)", value: estado },
        { label: "Endereço", value: endereco },
        { label: "Número", value: numero },
        { label: "Complemento", value: complemento },
        { label: "Bairro", value: bairro }
    ];

    fields.forEach(field => {
        if (field.value) { // Exibe apenas campos com valor
            const p = document.createElement('p');
            p.innerHTML = `<strong>${field.label}:</strong> ${field.value}`;
            newCard.appendChild(p);
        }
    });

    // Adiciona o card ao container
    document.querySelector('.container').appendChild(newCard);

    // Reseta o formulário e fecha o modal
    document.querySelector('#addEmployeeForm').reset();
    document.getElementById('modal').style.display = 'none';
});

// Função para validar CPF
function isValidCPF(cpf) {
    return /^[0-9]{11}$/.test(cpf); // Verifica se tem exatamente 11 dígitos numéricos
}

// Função para formatar CPF (000.000.000-00)
function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função para formatar a data no formato dd/mm/yyyy
function formatDate(dateString) {
    if (!dateString) return ""; // Retorna vazio se a data não for fornecida
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}
