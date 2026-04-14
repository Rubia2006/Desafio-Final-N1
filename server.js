const express = require('express')
const { criarBanco } = require('./database')

const cors = require('cors')  //CORS

const app = express()

app.use(cors())

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
    <body>
    <h1>Desafio Final - N1<h1>
    <h2>Gestão de organização dos abrigos</h2>
    <p>Endpoint que leva os abrigos cadastrados: /abrigos </p>
    </body>
    `)});

    //var para a porta
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get("/abrigos", async (req, res) => {
    const db = await criarBanco()
    const lista = await db.all(`SELECT * FROM organizacao`)
    res.json(lista)
});

app.get("/abrigos/disponiveis", async  (req, res) => {
const db = await criarBanco();
const abrigos = await db.all(`SELECT *, (capacidade - ocupadas) AS livres FROM organizacao WHERE (capacidade - ocupadas) > 0 ORDER BY livres DESC`);
res.json(abrigos);
});




