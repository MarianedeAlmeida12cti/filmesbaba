async function buscarFilmes() {
    try {
        const resposta = await fetch("MarianedeAlmeida12cti/filmesbaba");
        const filmes = await resposta.json();
        const sectionFilmes = document.querySelector(".filmes");
        
        sectionFilmes.innerHTML = "";
        
        filmes.forEach((filme) => {
            sectionFilmes.innerHTML += `
                <div>
                    <h2>${filme.name}</h2>
                    <p><strong>Gênero:</strong> ${filme.genero}</p>
                    <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
                    <p><strong>Classificação indicativa:</strong> ${filme.classificacaoetaria > 0 ? filme.classificacaoetaria + ' anos' : 'Livre'}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error("Erro ao buscar os filmes:", error);
    }
}

buscarFilmes();