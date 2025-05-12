document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;

    // Validação de CEP
    if (!(cepInformado.length === 8) || isNaN(cepInformado)) {
        alert("CEP inválido! O CEP deve conter 8 dígitos numéricos.");
        return;
    }

    // Busca no ViaCEP
    fetch(`https://viacep.com.br/ws/${cepInformado}/json`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            } else {
                alert("CEP não encontrado.");
                document.getElementById('logradouro').value = "";
                document.getElementById('bairro').value = "";
                document.getElementById('cidade').value = "";
                document.getElementById('estado').value = "";
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o CEP: ", error);
            alert("Não foi possível buscar o CEP. Verifique sua conexão e tente novamente.");
        });
});


//Função para salvar os dados no localStorage
function salvarDados() {
    const dados = {
        nomeCompleto: document.getElementById("nomeCompleto").value,
        telefone: document.getElementById("telefone").value,
        cep: document.getElementById("cep").value,
        logradouro: document.getElementById("logradouro").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        numero: document.getElementById("numero").value,
        complemento: document.getElementById("complemento").value
    };

    // Salvando no localStorage como uma string JSON. Utilizei "dadosFormulario" como chave, meio óbvio mas é pra mim mesmo
    localStorage.setItem("dadosFormulario", JSON.stringify(dados));
    alert("Dados salvos com sucesso!");
}

// Função para carregar os dados salvos, se existirem é claro
function carregarDados() {
    const dadosSalvos = localStorage.getItem("dadosFormulario");
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);

        document.getElementById("nomeCompleto").value = dados.nomeCompleto;
        document.getElementById("telefone").value = dados.telefone;
        document.getElementById("cep").value = dados.cep;
        document.getElementById("logradouro").value = dados.logradouro;
        document.getElementById("bairro").value = dados.bairro;
        document.getElementById("cidade").value = dados.cidade;
        document.getElementById("estado").value = dados.estado;
        document.getElementById("numero").value = dados.numero;
        document.getElementById("complemento").value = dados.complemento;
    }
}

// Referência ao botão
const botaoTema = document.getElementById("botaoTema");

// Função para alternar o tema
function alternarTema() {
    document.body.classList.toggle("dark");

    // Verifica o tema atual e armazena no localStorage
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("tema", "dark");
        botaoTema.textContent = "☽";
    } else {
        localStorage.setItem("tema", "light");
        botaoTema.textContent = "☼";
    }
}

// Verifica se existe um tema salvo no localStorage
window.onload = () => {
    carregarDados();
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "dark") {
        document.body.classList.add("dark");
        botaoTema.textContent = "☽";
    }
};

// Adiciona o evento de clique para alternar o tema
botaoTema.addEventListener("click", alternarTema);

document.getElementById("salvarDados").addEventListener("click", () => {
    salvarDados();
})