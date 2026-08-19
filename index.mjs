import express from "express"
import mysql2 from "mysql2"

const app = express()
app.use(express.json())


const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MC"
})

app.get("/all-movies", (request, response) => {
    response.json({ message: "Você acessou a rota principal" })
})


app.post("/create-task", (request, response) => {
    const { id, name, genero, duracao, classificacaoetaria } = request.body
    const insertCommand = "INSERT INTO filmes_MarianeAlmeida(id, name, genero, duracao, classificacaoetaria) VALUES (?, ?, ?, ?, ?)"

    database.query(insertCommand, [id, name, genero, duracao, classificacaoetaria], (error) => {
        if (error) {
            return response.status(500).json({ erro: "Erro no banco", mensagem: error.message })
        }
        response.status(201).json({ message: "Filme cadastrado com sucesso!" })
    })
})


app.put("/update-task/:id", (request, response) => {
    const { id } = request.params 
    const { name, genero, duracao, classificacaoetaria } = request.body 

   
    const updateCommand = `
        UPDATE filmes_MarianeAlmeida 
        SET name = ?, genero = ?, duracao = ?, classificacaoetaria = ? 
        WHERE id = ?
    `

    
    database.query(updateCommand, [name, genero, duracao, classificacaoetaria, id], (error, results) => {
        if (error) {
            console.log("Erro ao atualizar:", error)
            return response.status(500).json({ erro: "Erro ao atualizar no banco", mensagem: error.message })
        }


        if (results.affectedRows === 0) {
            return response.status(404).json({ mensagem: "Filme não encontrado para atualização." })
        }

        response.json({ message: "Filme atualizado com sucesso!" })
    })
})


app.delete("/delete-task/:id", (request, response) => {
    const { id } = request.params
    const deleteCommand = "DELETE FROM filmes_MarianeAlmeida WHERE id=?"

    database.query(deleteCommand, [id], (error) => {
        if (error) {
            return response.status(500).json({ erro: "Erro ao apagar" })
        }
        response.json({ message: "Filme apagado com sucesso" })
    })
})

app.listen(3333, () => {
    console.log("Servidor online na porta 3333")
})
