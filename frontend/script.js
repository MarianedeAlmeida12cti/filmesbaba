async function buscarFilmes() {
    // através do acesso a rota GET, trazer os filmes e mostrar na tela
    const resposta = await fetch("http://localhost:3333/all-movies")
    const filmes = await application.json()
    const sectionFilmes = document.querySelector(".filmes")
    
    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filmes.name}</h2>
                <p><strong>Gênero:</strong> ${filmes.genero}</p>
                <p><strong>Duração:</strong> ${filmes.duracao} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filmes.classificacaoetaria > 0 ? filme.classificacaoetaria + ' anos' : 'Livre'}</p>
            </div>
        `
    })
}

buscarFilmes()