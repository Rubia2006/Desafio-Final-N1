const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const criarBanco = async () => {
    if (db) return db;
     const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
})

await db.exec(`
    CREATE TABLE IF NOT EXISTS organizacao(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    bairro TEXT,
    quantidade_pessoas INTEGER,
    telefone TEXT,
    necessidade_imediata TEXT,
    capacidade INTEGER,
    ocupadas INTEGER DEFAULT 0,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    tempo_permanencia TEXT
 )`);

 console.log("Banco de dados criado com sucesso!!");

 const checagem = await db.get(`SELECT COUNT (*) AS total FROM organizacao`);
 if(checagem.total === 0) {
    await db.exec(`
 INSERT INTO organizacao (nome, quantidade_pessoas, telefone, necessidade_imediata, tempo_permanencia, capacidade) VALUES
 ('Amélia', 5, '11987654321', 'Aliementos', '2 dias', 20),
 ('Bruno', 3, '11987456822', 'Água', '7 dia', 15),
 ('Carla', 2, '11987543210', 'Medicamentos', 'indefinido', 43),
 ('Diego', 1, '11987654322', 'Atendimento Médico', 'indefinido',10),
 ('Eduardo', 1, '11987654323', 'Comida', '5 dias', 25)
 `);
}else{
console.log(`Banco pronto com ${checagem.total} de registros!`);

}

 const todas_abrigos = await db.all('SELECT * FROM organizacao');
 console.table(todas_abrigos);

return db;
};

module.exports = {criarBanco}; //export para o server 

