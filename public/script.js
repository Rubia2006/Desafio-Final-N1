const API_BASE = '/';

// Carrega abrigos disponíveis 
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
async function carregarAbrigosSelect() {
    try {
        const res = await fetch(`${API_BASE}abrigos`);
        const abrigos = await res.json();
        const select = document.getElementById('abrigos_select');
        select.innerHTML = '<option value="">Selecione um abrigo...</option>' +
            abrigos.map(a => 
                `<option value="${a.id}">${a.nome} (ID: ${a.id})</option>`
            ).join('');
    } catch(err) {
        console.error('Erro select');
    }
}
async function carregarPessoas() {
    try {
        const res = await fetch(`${API_BASE}pessoas`);
        const pessoas = await res.json();
        document.getElementById('pessoas-list').innerHTML = pessoas.map(p => `
             <div class="pessoa">
                <h4>${p.nome}</h4>
                <p>
                    <span class="id-badge">ID ${p.abrigos_id}</span> 
                      ${p.abrigo_nome || 'Abrigo'} | ${p.quantidade_pessoas} pessoas
                </p>
                ${p.data_saida ? '🔴 DESLIGADA' : '🟢 ATIVA'}
            </div>
        `).join('');
    } catch(err) {
        console.error('Pessoas:', err);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-pessoa').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const dados = {
            nome: document.getElementById('nome').value,
            abrigos_id: parseInt(document.getElementById('abrigos_select').value),
            quantidade_pessoas: parseInt(document.getElementById('quantidade').value),
            necessidade_imediata: document.getElementById('necessidade').value,
            tempo_permanencia: document.getElementById('tempo').value,
            bairro: 'Centro'
        };
        try {
            const res = await fetch(`${API_BASE}pessoas`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dados)
            });
            alert('✅ Cadastrado!');
            e.target.reset();
            carregarPessoas();
            carregarAbrigos();
        } catch(err) {
            alert('❌ ' + err.message);
        }
    });

carregarAbrigosSelect();
carregarAbrigos();
carregarPessoas();
});
