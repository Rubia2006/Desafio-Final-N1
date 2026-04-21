const express = require('express')
const { criarBanco } = require('./database')

const cors = require('cors')  //CORS

const app = express()

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public')); //(HTML/CSS/JS)

app.get("/", (req, res) => {
    res.send(`
    <body>
    <h1>Desafio Final - N1</h1>
    <h2>Gestão de organização dos abrigos</h2>
    <p>Endpoint que leva aos abrigos cadastrados: /abrigos </p>
    </body>
    `)});

    function formatarDataBR(data) 
{
    return data.toLocaleDateString('pt-BR'); //  DD/MM/YYYY
}

//Lista abrigos - FUNCIONANDO
app.get("/abrigos", async (req, res) => {
    const db = await criarBanco()
    const listar = await db.all(`SELECT * FROM abrigos`)
    res.json(listar)
});

//Lista pessoas - FUNCIONANDO
app.get("/pessoas", async (req, res) => {
    const db = await criarBanco()
    const listar = await db.all(`SELECT 
        p.*, 
        a.nome as abrigo_nome,
        a.endereco as abrigo_endereco
      FROM pessoas p 
      LEFT JOIN abrigos a ON p.abrigos_id = a.id
      ORDER BY p.nome`)
    res.json(listar)
});

//Posta pessoa - FUNCIONANDO
app.post("/pessoas", async (req, res) => {
    const {nome, bairro, quantidade_pessoas, necessidade_imediata, abrigos_id, capacidade, tempo_permanencia} = req.body;
    const db = await criarBanco();
    await db.run(`INSERT INTO pessoas (nome, bairro,  quantidade_pessoas, necessidade_imediata, abrigos_id, capacidade, tempo_permanencia) VALUES (?,?,?,?,?,?,?)`, [nome, bairro, quantidade_pessoas, necessidade_imediata, abrigos_id, capacidade, tempo_permanencia])
    const data = formatarDataBR(new Date());
    res.send(`${nome} registrado(a) na data ${data} no abrigo de número ${abrigos_id}, com ${quantidade_pessoas} membro(s) por um período de ${tempo_permanencia}`);
});

//Abrigos disponiveis - FUNCIONANDO
app.get("/abrigos/disponiveis", async (req, res) => {
    const db = await criarBanco();
    const abrigos = await db.all(`
          SELECT 
            a.id,
            a.nome AS nome_abrigo, 
            a.endereco,
            a.telefone,
            a.capacidade,
            COALESCE(SUM(p.quantidade_pessoas), 0) AS ocupadas,
            (a.capacidade - COALESCE(SUM(p.quantidade_pessoas), 0)) AS vagas_livres
        FROM abrigos a 
        LEFT JOIN pessoas p ON a.id = p.abrigos_id 
        GROUP BY a.id 
        ORDER BY a.id ASC`);
        console.log('=== ORDEM DOS ABRIGOS ===');
        abrigos.forEach(a => console.log(`${a.id} - ${a.nome_abrigo}`));
        console.log('======================');
    res.json(abrigos);});

//Rota de remoção da pessoa do abrigo - FUNCIONANDO
app.delete("/pessoas/:nome/:abrigos_id", async (req, res) => {
const { nome } = req.params;
const { abrigos_id } = req.params;
const db = await criarBanco()
const pessoa = await db.get(`SELECT * FROM pessoas WHERE nome = ? AND abrigos_id = ?`, [nome, abrigos_id]);
await db.run(`UPDATE pessoas SET data_saida = date('now') WHERE nome = ? AND abrigos_id = ?`, [nome, abrigos_id]);
const pessoaAtualizada = await db.get(`SELECT data_entrada, data_saida FROM pessoas WHERE nome = ? AND abrigos_id = ?`,[nome, abrigos_id]);
    res.json({mensagem:`${nome} saiu do abrigo ${abrigos_id}`, data_entrada: pessoa.data_entrada, data_saida: pessoaAtualizada.data_saida});
});

// Atualizar data null - FUNCIONANDO
app.put("/pessoas/atualizarData", async (req, res) => {
const db = await criarBanco();
      await db.run(`UPDATE pessoas SET data_entrada = date('now') WHERE data_entrada IS NULL`);
      const data = formatarDataBR(new Date());
 res.json({ mensagem: "Datas de entrada atualizadas para registros com data nula." });
});

//var para a porta
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
