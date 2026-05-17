const formulario = document.getElementById("form-gasto");
const areaListas = document.getElementById("listas");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nomeLista = document.getElementById("lista").value.trim();
    const destino = document.getElementById("destino").value.trim();
    const valor = Number(document.getElementById("valor").value);

    if (nomeLista === "" || destino === "" || valor <= 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    let listaExistente = procurarLista(nomeLista);

    if (listaExistente) {
        adicionarLinha(listaExistente, destino, valor);
    } else {
        criarNovaLista(nomeLista, destino, valor);
    }

    formulario.reset();
});

function procurarLista(nome) {
    const listas = document.querySelectorAll(".lista");

    for (let lista of listas) {
        const titulo = lista.querySelector("h2").textContent.toLowerCase();

        if (titulo === nome.toLowerCase()) {
            return lista;
        }
    }

    return null;
}

function adicionarLinha(lista, destino, valor) {
    const tbody = lista.querySelector("tbody");

    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
        <td>${destino}</td>
        <td>R$ ${valor.toFixed(2).replace(".", ",")}</td>
    `;

    tbody.appendChild(novaLinha);

    atualizarTotal(lista);
}

function criarNovaLista(nome, destino, valor) {
    const novaLista = document.createElement("div");
    novaLista.classList.add("lista");

    novaLista.innerHTML = `
        <h2>${nome}</h2>

        <table>
            <thead>
                <tr>
                    <th>Destino</th>
                    <th>Valor</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>${destino}</td>
                    <td>R$ ${valor.toFixed(2).replace(".", ",")}</td>
                </tr>
            </tbody>
        </table>

        <p class="total">Total: R$ ${valor.toFixed(2).replace(".", ",")}</p>
    `;

    areaListas.appendChild(novaLista);
}

function atualizarTotal(lista) {
    const valores = lista.querySelectorAll("tbody tr td:nth-child(2)");
    let total = 0;

    valores.forEach(function (celula) {
        let valorTexto = celula.textContent
            .replace("R$", "")
            .replace(",", ".")
            .trim();

        total += Number(valorTexto);
    });

    const totalFormatado = total.toFixed(2).replace(".", ",");

    lista.querySelector(".total").textContent = `Total: R$ ${totalFormatado}`;
}