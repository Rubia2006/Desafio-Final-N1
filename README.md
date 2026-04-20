# 🚀 Desafio Final - N1

## 📌 Sobre o projeto
O Desafio Final tinha como proposta uma solução tecnológica capaz de organizar e conectar informações relevantes em um cenário de enchente, facilitando a comunicação
entre as pessoas que precisam de ajuda. Minha solução foi pensar na organização dos abrigos, tentando buscar um abrigo próximo do local aonde a pessoa
se econtra e que tenha a disponibilidade de vagas baseado na quantidade de pessoas por famílias que necessitem de um local para ficar. 

## 🎯 Problema que Resolvemos
- Dificuldade em encontrar abrigos próximos e confiáveis rapidamente.

- Falta de informações atualizadas sobre capacidade, suprimentos e rotas seguras.

### 💻 Tecnologias ultilizadas

- Node.js
- Express
- SQLite
- SQLite3
- Postman
- Nodemon

---

### ⚙️ Instalação

`npm install`

### ▶️ Como executar
```bash
npm run dev
```
`http:localhost:3000`

---

### 💾 Banco de Dados
O banco de dados é criado automaticamente ao inicar o projeto.

```
database.db
```


#### 📋 Tabela de abrigos 

|Campo	          |Descrição                  |
|-----------------|---------------------------|
|id	              |Identificador único        |
|nome	            |nome do abrigo             |          
|endereco         |localização do abrigo      |
|telefone         |telefone do abrigo         |
|capaciadade	    |capacidade total do abrigo |
|vagas_disponieis |vagas disponieis           |
|atualizado_em    |data atual                 |


----------------


#### 📋 Tabela de pessoas 

|Campo               |	Descrição|
|--------------------|---------------------------------------------|
|id	                 |Identificador único                          |
|nome	               |nome da pessoa                               |
|bairro	             |localização da pessoa                        |
|quantidade_pessoas	 |quantas pessoas vão precisar do abrigo       |
|necessidade_imediata|	o que a pessoa precisa nesse momento       |
|abrigos_id          |	id do abrigo que ela quer ficar            |
|capacidade	         |capacidade total do abrigo                   |  
|tempo_permanencia   |	tempo que a pessoa pretende ficar no abrigo|
|data_entrada	       |data que ela vai entrar no abrigo            |
|data_saida          |	data da baixa da pessoa do sistema         |
|atualizado_em       |	data atual                                 |


### 🧷 Endpoints

###### Rota inicial
```html
GET /
```
Retorna uma página HTML simples com informações da API.

###### Rota para listar todos os abrigos
```html
GET /abrigos
```
Retorna todos os registros de abrigos do banco de dados

###### Rota para listar todas as pessoas
```html
GET /pessoas
```
Retorna todos os registros de pessoas do banco de dados

###### Rota para postar pessoas
```html
POST /pessoas
```
Body (JSON)
```json
{
  "nome": "Rúbia Silva",
  "bairro": "Garças",
  "quantidade_pessoas": 3,
  "necessidade_imediata": "Abrigo",
  "abrigos_id": 4,
  "tempo_permanencia": "20 dias"
}
```

###### Rota para listar abrigos disponíveis
```html
GET /abrigos/disponiveis
```
Retorna todos os abrigos disponiveis pelo número de vagas

###### Rota para deletar uma pessoa do abrigo 
```html
DELETE /pessoas/:nome/:abrido_id
```

### 📚 Conceitos
Rotas com Express
- Métodos/Verbos HTTP (GET, POST, DELETE)
- Banco de Dados SQLite
- SQL Básico
- Uso de req.params e req.body

### 🎯 Observações
- O banco de dados é criado automaticamente
- Dados inciais são inseridos apenas se estiver vazio
- A API pode ser testada com o Postman

