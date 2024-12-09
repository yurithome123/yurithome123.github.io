//configs
const config = {
    responsive: true,
    displayModeBar: true // Habilita barra de ferramentas para zoom
};


// Funções de interface
function createRemoveButton() {
    const button = document.createElement('button');
    button.textContent = 'Remover';
    button.className = 'remove-btn';
    button.onclick = function(e) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.style.opacity = '0';
        setTimeout(() => parent.remove(), 300);
    };
    return button;
}

function showFeedback(message, type = 'success') {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${type}`;
    feedback.textContent = message;
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 3000);
}

// Funções de adição de cargas
function addLoad() {
    const loadContainer = document.getElementById('loads');
    const loadDiv = document.createElement('div');
    loadDiv.className = 'load';
    loadDiv.style.opacity = '0';
    loadDiv.innerHTML = `
        <input type="number" class="loadValue" placeholder="Carga (kN)" min="1">
        <input type="number" class="loadPosition" placeholder="Posição (m)" min="0">
    `;
    loadDiv.appendChild(createRemoveButton());
    loadContainer.appendChild(loadDiv);
    setTimeout(() => loadDiv.style.opacity = '1', 10);
}

function addMoment() {
    const momentContainer = document.getElementById('moments');
    const momentDiv = document.createElement('div');
    momentDiv.className = 'moment';
    momentDiv.style.opacity = '0';
    momentDiv.innerHTML = `
        <input type="number" class="momentValue" placeholder="Momento (kN·m)" min="1">
        <input type="number" class="momentPosition" placeholder="Posição (m)" min="0">
    `;
    momentDiv.appendChild(createRemoveButton());
    momentContainer.appendChild(momentDiv);
    setTimeout(() => momentDiv.style.opacity = '1', 10);
}

function addDistributedLoad() {
    const distributedLoadContainer = document.getElementById('distributedLoads');
    const loadDiv = document.createElement('div');
    loadDiv.className = 'distributedLoad';
    loadDiv.style.opacity = '0';
    loadDiv.innerHTML = `
        <input type="number" class="distributedLoadValue" placeholder="Carga (kN/m)" min="1">
        <input type="number" class="distributedLoadStart" placeholder="Início (m)" min="0">
        <input type="number" class="distributedLoadEnd" placeholder="Fim (m)" min="0">
    `;
    loadDiv.appendChild(createRemoveButton());
    distributedLoadContainer.appendChild(loadDiv);
    setTimeout(() => loadDiv.style.opacity = '1', 10);
}

function addTriangularLoad() {
    const triangularLoadContainer = document.getElementById('triangularLoads');
    const loadDiv = document.createElement('div');
    loadDiv.className = 'triangularLoad';
    loadDiv.style.opacity = '0';
    loadDiv.innerHTML = `
        <input type="number" class="triangularLoadHeight" placeholder="Altura máxima (kgf/m)" min="1">
        <input type="number" class="triangularLoadStart" placeholder="Início (m)" min="0">
        <input type="number" class="triangularLoadBase" placeholder="Base (m)" min="0">
    `;
    loadDiv.appendChild(createRemoveButton());
    triangularLoadContainer.appendChild(loadDiv);
    setTimeout(() => loadDiv.style.opacity = '1', 10);
}

// Função principal de cálculo
function calculateDiagrams() {
    const length = parseFloat(document.getElementById('length').value);
    
    if (!length) {
        alert('Por favor, insira o comprimento da viga');
        return;
    }

    const loads = Array.from(document.querySelectorAll('.load')).map(load => ({
        value: parseFloat(load.querySelector('.loadValue').value),
        position: parseFloat(load.querySelector('.loadPosition').value)
    }));

    const distributedLoads = Array.from(document.querySelectorAll('.distributedLoad')).map(load => ({
        value: parseFloat(load.querySelector('.distributedLoadValue').value),
        start: parseFloat(load.querySelector('.distributedLoadStart').value),
        end: parseFloat(load.querySelector('.distributedLoadEnd').value)
    }));

    const moments = Array.from(document.querySelectorAll('.moment')).map(moment => ({
        value: parseFloat(moment.querySelector('.momentValue').value),
        position: parseFloat(moment.querySelector('.momentPosition').value)
    }));

    const triangularLoads = Array.from(document.querySelectorAll('.triangularLoad')).map(load => ({
        height: parseFloat(load.querySelector('.triangularLoadHeight').value),
        start: parseFloat(load.querySelector('.triangularLoadStart').value),
        base: parseFloat(load.querySelector('.triangularLoadBase').value)
    }));

    // Cálculo das reações
    let RA = 0;
    let RB = 0;

    // Cálculo das reações para cargas triangulares
    triangularLoads.forEach(load => {
        const area = (load.height * load.base) / 2;
        const centroid = load.start + (2 * load.base) / 3;
        RA += area * (length - centroid) / length;
        RB += area * centroid / length;
    });

    // Cálculo dos diagramas
    const shearData = [];
    const momentData = [];
    const step = length / 100;

    for (let x = 0; x <= length; x += step) {
        let shear = RA;
        let moment = RA * x;

        loads.forEach(load => {
            if (x >= load.position) shear -= load.value;
        });

        distributedLoads.forEach(load => {
            if (x >= load.start) {
                const distributedLength = Math.min(x, load.end) - load.start;
                if (distributedLength > 0) shear -= load.value * distributedLength;
            }
        });

        triangularLoads.forEach(load => {
            if (x >= load.start && x <= load.start + load.base) {
                const h = load.height * (x - load.start) / load.base;
                const area = (h * (x - load.start)) / 2;
                const centroid = load.start + (2 * (x - load.start)) / 3;
                shear -= area;
                moment -= area * (x - centroid);
            }
        });

        shearData.push({ x, y: shear });
        momentData.push({ x, y: moment });
    }

    // Renderização dos gráficos
    renderChart('shearChart', shearData, 'Diagrama de Força Cortante (kN)');
    renderChart('momentChart', momentData, 'Diagrama de Momento Fletor (kN·m)');

    // Momento máximo
    const maxMoment = Math.max(...momentData.map(point => Math.abs(point.y)));
    document.getElementById('maxMoment').innerText = `Momento Máximo: ${maxMoment.toFixed(2)} kN·m`;
}

// Função de renderização do gráfico
function renderChart(elementId, data, label) {
    const trace = {
        x: data.map(point => point.x),
        y: data.map(point => point.y),
        type: 'scatter',
        mode: 'lines+markers', // Adiciona marcadores
        line: { color: 'rgb(75, 192, 192)', width: 2 },
        fill: 'tozeroy',
        text: data.map(point => `(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`), // Tooltip com valores
        hoverinfo: 'text' // Exibe valores no hover
    };

    const layout = {
        title: label,
        xaxis: { title: 'Posição (m)' },
        yaxis: { title: label },
        autosize: true,
        height: 500
    };

    const config = {
        responsive: true,
        displayModeBar: true // Permite zoom
    };

    Plotly.newPlot(elementId, [trace], layout, config);
}
function toggleDetailedView() {
    const detailedView = document.getElementById('detailedView').checked;
    if (detailedView) {
        // Re-renderize os gráficos com mais detalhes
        calculateDiagrams(true);
    } else {
        calculateDiagrams(false);
    }
}

function displayEquations() {
    const equationsContainer = document.getElementById('equations');
    equationsContainer.innerHTML = `
        $$ V(x) = \\text{Equação da força cortante} $$
        $$ M(x) = \\text{Equação do momento fletor} $$
    `;
    MathJax.typesetPromise();
}


// Garantir que as funções estejam disponíveis globalmente
window.addLoad = addLoad;
window.addTriangularLoad = addTriangularLoad;
window.calculateDiagrams = calculateDiagrams;
