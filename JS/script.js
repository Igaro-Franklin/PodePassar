alert(
    "Esse sistema está em fase de teste! Se ao excluir um item o valor total não atualizar, é só atualizar a pagina! Não se preocupe, voce não perdera suas compras"
)

let valorEntrada = parseFloat(localStorage.getItem("valorEntrada")) || 0;

function atualizarTotal() {
    const tabela = document.querySelector("#TabelaDeCompras table");
    let total = valorEntrada;

    for (let i = 1; i < tabela.rows.length; i++) {
        const preco = parseFloat(tabela.rows[i].cells[1].textContent);
        total -= preco; 
    }

    const totalSpan = document.getElementById("totalSpan");
    totalSpan.textContent = total.toFixed(2);

    if (total >= 0) {
        totalSpan.style.color = "green"; 
    } else {
        totalSpan.style.color = "red"; 
    }
}

window.onload = function() {
    const tabela = document.querySelector("#TabelaDeCompras table");
    const savedItems = JSON.parse(localStorage.getItem("tabelaItens")) || [];

    const valorEntradaLocalStorage = parseFloat(localStorage.getItem("valorEntrada"));
    if (!isNaN(valorEntradaLocalStorage)) {
        valorEntrada = valorEntradaLocalStorage;
    }

    savedItems.forEach(item => {
        const novaLinha = tabela.insertRow(-1);

        const celulaNome = novaLinha.insertCell(0);
        const celulaPreco = novaLinha.insertCell(1);
        const celulaExcluir = novaLinha.insertCell(2);

        celulaNome.textContent = item.nome;
        celulaPreco.textContent = item.preco.toFixed(2);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.innerHTML = '<i class="bi bi-trash3-fill"></i>';
        botaoExcluir.onclick = function () {
            tabela.deleteRow(novaLinha.rowIndex);
            atualizarTotal();
            salvarTabela();
        };
        celulaExcluir.appendChild(botaoExcluir);
    });

    atualizarTotal(); 
};

function adicionarValor() {
    const valorEntradaInput = parseFloat(document.getElementById("valorEntrada").value);
    
    if (!isNaN(valorEntradaInput)) { 
        valorEntrada = valorEntradaInput; 
        localStorage.setItem("valorEntrada", valorEntrada); 
        atualizarTotal();
    }else{
        alert("Preencha com um valor valido!")
    }

    document.getElementById("valorEntrada").value = "";
}

function adicionarProduto() {
    const nomeProduto = document.getElementById("nomeProduto").value;
    const precoProduto = parseFloat(document.getElementById("precoProduto").value);

    if (!isNaN(precoProduto)) { 
        const tabela = document.querySelector("#TabelaDeCompras table");
        const novaLinha = tabela.insertRow(-1);
        novaLinha.className = "tableBorder";

        const celulaNome = novaLinha.insertCell(0);
        const celulaPreco = novaLinha.insertCell(1);
        const celulaExcluir = novaLinha.insertCell(2);

        celulaNome.textContent = nomeProduto;
        celulaPreco.textContent = precoProduto.toFixed(2);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.innerHTML = '<i class="bi bi-trash3-fill"></i>';
        botaoExcluir.onclick = function () {
            tabela.deleteRow(novaLinha.rowIndex);
            valorEntrada -= precoProduto; 
            atualizarTotal(); 
            salvarTabela(); 
        };
        celulaExcluir.appendChild(botaoExcluir);

        salvarTabela(); 
        atualizarTotal(); 

    }else{
        alert("Verifique se o nome do produto ou o preço estão preenchido!")
    }

    document.getElementById("nomeProduto").value = "";
    document.getElementById("precoProduto").value = "";
}

botaoExcluir.onclick = function () {
    tabela.deleteRow(novaLinha.rowIndex);
    atualizarTotal();
    salvarTabela(); 
};


function salvarTabela() {
    const tabela = document.querySelector("#TabelaDeCompras table");
    const items = [];

    for (let i = 1; i < tabela.rows.length; i++) {
        const nome = tabela.rows[i].cells[0].textContent;
        const preco = parseFloat(tabela.rows[i].cells[1].textContent);

        items.push({ nome, preco });
    }

    localStorage.setItem("tabelaItens", JSON.stringify(items));
}

function limparInformacoes(){
    localStorage.clear();
    valorEntrada = 0;
    atualizarTotal();
    limparTabela();
}

function limparTabela(){
    const tabela = document.querySelector("#TabelaDeCompras table");
    while (tabela.rows.length > 1){
        tabela.deleteRow(1);
    }
}
