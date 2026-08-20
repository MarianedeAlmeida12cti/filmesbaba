async function buscarFilmes() {
    try {
        const resposta = await fetch("https://filmesbaba-mx34.vercel.app/");

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const filmes = await resposta.json();
        const sectionFilmes = document.querySelector(".filmes");

        if (!sectionFilmes) {
            console.error("Elemento .filmes não encontrado no DOM.");
            return;
        }

        sectionFilmes.innerHTML = filmes.map((filme) => `
            <div>
                <h2>${filme.name}</h2>
                <p><strong>Gênero:</strong> ${filme.genero}</p>
                <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${
                    filme.classificacaoetaria > 0 ? `${filme.classificacaoetaria} anos` : 'Livre'
                }</p>
            </div>
        `).join("");

    } catch (error) {
        console.error("Erro ao buscar os filmes:", error);
    }
}

buscarFilmes();