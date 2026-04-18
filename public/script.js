const API_BASE = '/';

//Abrigos
async function carregarAbrigos() {
    try {
        const res = await fetch(`${API_BASE}abrigos/disponiveis`);
        const abrigos = await res.json();
        const lista = document.getElementById('abrigos-list');
        lista.innerHTML = abrigos.map(a => `
      <div class="abrigo ${a.vagas_livres < 5 ? 'vaga-baixa' : ''}">
        <h3>${a.nome}</h3>
        <p><strong>Vagas livres:</strong> ${a.vagas_livres}/${a.capacidade}</p>
        <p>${a.endereco}</p>
      </div>
    `).join('');
    } catch (err) {
        alert('Erro ao carregar abrigos');
    }
}

// Pessoas
async function carregarPessoas() {
    try {
        const res = await fetch(`${API_BASE}pessoas`);
        const pessoas = await res.json();
        document.getElementById('pessoas-list').innerHTML = pessoas.map(p => `
      <div class="pessoa">
        <h4>${p.nome}</h4>
        <p>Abrigo: ${p.abrigo_nome || p.abrigos_id} | Qtd: ${p.quantidade_pessoas}</p>
        <p>${p.data_entrada ? 'Entrada: ' + new Date(p.data_entrada).toLocaleDateString('pt-BR') : ''}</p>
        ${p.data_saida ? `<span style="color:red">Saiu: ${new Date(p.data_saida).toLocaleDateString('pt-BR')}</span>` : ''}
      </div>
    `).join('');
    } catch (err) {
        alert('Erro ao carregar pessoas');
    }
}

//Cadastrar Pessoa
document.getElementById('form-pessoa').addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
        nome: document.getElementById('nome').value,
        abrigos_id: parseInt(document.getElementById('abrigos_id').value),
        quantidade_pessoas: parseInt(document.getElementById('quantidade de pessoas').value),
        necessidade_imediata: document.getElementById('necessidade').value,
        tempo_permanencia: document.getElementById('tempo de permanência').value
    };

    try {
        const res = await fetch(`${API_BASE}pessoas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        if (res.ok) {
            alert('Pessoa cadastrada!');
            document.getElementById('form-pessoa').reset();
            carregarPessoas();
        }
    } catch (err) {
        alert('Erro ao cadastrar');
    }
});

//Saída (DELETE)
async function removerPessoa(nome, abrigosId) {
    if (confirm(`${nome} saiu do abrigo?`)) {
        await fetch(`${API_BASE}pessoas/${nome}/${abrigosId}`, { method: 'DELETE' });
        carregarPessoas();
    }
}

carregarAbrigos();
carregarPessoas();