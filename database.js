const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const criarBanco = async () => {
    const db = await open({
     filename: './database.db',
     driver: sqlite3.Database
    });

console.log("Banco aberto!");

await db.exec('PRAGMA foreign_keys = ON;');

//Tabela abrigos
await db.exec(`
   CREATE TABLE IF NOT EXISTS abrigos (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   nome TEXT NOT NULL,
   endereco TEXT NOT NULL,
   telefone TEXT,
   capacidade INTEGER NOT NULL CHECK (capacidade > 0),
   vagas_disponiveis INTEGER NOT NULL DEFAULT 0 CHECK (vagas_disponiveis >=0),
   atualizado_em TEXT DEFAULT (date('now'))
   )`);  
   
   console.log("Abrigos criados com sucesso!!");

   const checagemAbrigos = await db.get(`SELECT COUNT(*) AS total FROM abrigos`);
 if(checagemAbrigos.total === 0)   {
 await db.exec(`
 INSERT INTO abrigos (nome, endereco, telefone, capacidade, vagas_disponiveis) VALUES
<<<<<<< HEAD
 ("Ginasio James Ferreira", "Rua Major João Rocha, 198", 11987654321, 50, 20),
 ("Escola Abelard Pereira",  "Rua Antônio Carlos, 123", 11987654322, 60, 52),
 ("Escola João Pereira", "Rua das Flores, 60", 11987654323, 70, 22),
 ("Escola Deputado Patrus de Souza", "Rua Santa Luzia, 356", 11987654324, 80, 12),
 ("Ginasio PoliEsportivo", "Bairro Garças, 1200", 11987654325, 100, 16)
=======
 ("Ginasio James Ferreira", "Rua Major João Rocha, 198", 11987654321, 100, 20),
 ("Escola Abelard Pereira",  "Rua Antônio Carlos, 123", 11987654322, 200, 52),
 ("Escola João Pereira", "Rua das Flores, 60", 11987654323, 150, 22),
 ("Escola Deputado Patrus de Souza", "Rua Santa Luzia, 133", 11987654324, 200, 12),
 ("Ginasio PoliEsportivo", "Bairro Garças, 1200", 11987654325, 200, 16)
>>>>>>> 0a6c6e2c7b659122e79cadeecd8dd85390975df6
 `);

 console.log("Abrigos inseridos com sucesso!");

 }else{ console.log(`Banco pronto com ${checagemAbrigos.total} de registros!`); }

//Tabela de pessoas
await db.exec(`
    CREATE TABLE IF NOT EXISTS pessoas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    bairro TEXT,
    quantidade_pessoas INTEGER NOT NULL DEFAULT 1 CHECK (quantidade_pessoas > 0),
    necessidade_imediata TEXT,
    abrigos_id INTEGER NOT NULL,
    capacidade INTEGER,
    tempo_permanencia TEXT,
    data_entrada TEXT DEFAULT (date('now')),
    data_saida TEXT,
    atualizado_em TEXT DEFAULT (date('now')),
    FOREIGN KEY (abrigos_id) REFERENCES abrigos(id) ON DELETE RESTRICT
    )`)

 console.log("Tabela de pessoas criado com sucesso!!");

 const checagemPessoas = await db.get(`SELECT COUNT(*) AS total FROM pessoas`);
 
 if(checagemPessoas.total === 0)   {
 await db.exec(`
 INSERT INTO pessoas (nome, bairro, quantidade_pessoas, necessidade_imediata, abrigos_id, capacidade, tempo_permanencia, data_entrada) VALUES
 ("Amélia", "Centro", 5, "Aliementos", 1, 200, "2 dias", NULL),
 ("Bruno", "Crespo", 3, "Água", 2, 150, "7 dias", NULL),
 ("Carla", "Vale da Aldeia", 2, "Medicamentos", 3, 60, "indefinido", NULL),
 ( "Diego", "Sinoá", 1, "Atendimento Médico", 4, 100, "indefinido", NULL),
 ("Eduardo", "Hermilo", 1, "Comida", 5, 250, "5 dias", NULL)
 `);

 console.log("Pessoas inseridas no Banco de Dados!");

 }else{ console.log(`Registros: ${checagemPessoas.total} pessoas`); }

return db;
};

module.exports = {criarBanco}; //export para o server 
criarBanco();

