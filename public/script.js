const API_BASE = '/';

async function carregarAbrigos() {
    const res = await fetch(`${API_BASE}abrigos/disponiveis`);
    const abrigos = await res.json();
    document.getElementById('abrigos-list').innerHTML = abrigos.map(a => 
    `
        <div class="abrigo ${a.vagas_livres < 5 ? 'vaga-baixa' : ''}">
            <h3>${a.nome_abrigo || a.nome} (ID: ${a.id})</h3>
            <p>Vagas: ${a.vagas_livres}/${a.capacidade}</p>
            <p>${a.endereco}</p>
        </div>
    `).join('');
    }


// Carrega abrigos
async function carregarAbrigos() {
    try {
        const res = await fetch(`${API_BASE}abrigos/disponiveis`);
        const abrigos = await res.json();
        const lista = document.getElementById('abrigos-list');
        lista.innerHTML = abrigos.map(a => `
            <div class="abrigo-card ${a.vagas_livres < 5 ? 'vaga-baixa' : ''}">
                <h3>${a.nome_abrigo || a.nome} <span class="id-badge">ID: ${a.id}</span></h3>
                <p class="vagas"><strong>Vagas livres:</strong> ${a.vagas_livres}/${a.capacidade}</p>
                <p>${a.endereco}</p>
                ${a.telefone ? `<p>📞 ${a.telefone}</p>` : ''}
            </div>
        `).join('');
    } catch (err) {
        console.error('Abrigos:', err);
    }
}

// Carrega pessoas
async function carregarPessoas() {
    const res = await fetch(`${API_BASE}pessoas`);
    const pessoas = await res.json();
    document.getElementById('pessoas-list').innerHTML = pessoas.map(p => `
        <div class="pessoa">
            <h4>${p.nome}</h4>
            <p><span class="id-badge">ID ${p.abrigos_id}</span> 
               ${p.abrigo_nome || 'Abrigo'} | Nº pessoas: ${p.quantidade_pessoas}
            </p>
            ${p.data_saida ? '🔴 DESLIGADA' : '🟢 ATIVA'}
        </div>
    `).join('');
}

// DOMContentLoaded GARANTIDO
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// CADASTRAR PESSOA 
document.getElementById('form-pessoa').addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
        nome: document.getElementById('nome').value,
        abrigos_id: parseInt(document.getElementById('abrigos_id').value),
        quantidade_pessoas: parseInt(document.getElementById('quantidade').value),
        necessidade_imediata: document.getElementById('necessidade').value,
        tempo_permanencia: document.getElementById('tempo').value,
        bairro: 'Centro',
        capacidade: null
    };
    
    console.log('Enviando:', dados);
    
    try {
        const res = await fetch(`${API_BASE}pessoas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        const resultado = await res.json();
        
        alert(resultado.mensagem || 'Cadastrado!');
        e.target.reset();
        carregarPessoas();
        carregarAbrigos();
    } catch(err) {
        alert('Erro: ' + err.message);
    }
});

// DELETAR PESSOA
async function removerPessoa(nome, abrigosId) {
    if(confirm(`${nome} saiu do abrigo ${abrigosId}?`)) {
        try {
            await fetch(`${API_BASE}pessoas/${nome}/${abrigosId}`, { method: 'DELETE' });
            carregarPessoas();
            carregarAbrigos();
        } catch(err) {
            alert('Erro ao remover');
        }
    }
}


carregarAbrigos();
carregarPessoas();