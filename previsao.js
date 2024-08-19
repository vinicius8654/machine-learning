function carregarCSV(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => callback(Papa.parse(data, { header: true }).data))
        .catch(error => console.error('Erro ao carregar CSV:', error));
}

function calcularMedia(alugueis) {
    const total = alugueis.reduce((sum, valor) => sum + parseInt(valor), 0);
    return total / alugueis.length;
}

function preverAlugueis() {
    const diaSelecionado = document.getElementById('dia').value;
    const climaSelecionado = document.getElementById('clima').value;

    carregarCSV('historico.csv', (data) => {
        const alugueisFiltrados = data
            .filter(entry => entry['Dia da Semana'] === diaSelecionado && entry['Clima'] === climaSelecionado)
            .map(entry => entry['Alugueis']);

        const mediaAlugueis = calcularMedia(alugueisFiltrados);
        
        document.getElementById('resultado').innerText = 
            `Previsão de aluguéis para ${diaSelecionado} com clima ${climaSelecionado}: ${mediaAlugueis.toFixed(2)}`;
    });
}