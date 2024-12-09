function addLoad() {
    const loadContainer = document.getElementById('loads');
    loadContainer.insertAdjacentHTML('beforeend', `
      <div class="load">
        <input type="number" class="loadValue" placeholder="Carga (kN)" min="1">
        <input type="number" class="loadPosition" placeholder="Posição (m)" min="0">
      </div>
    `);
  }
  
  function addMoment() {
    const momentContainer = document.getElementById('moments');
    momentContainer.insertAdjacentHTML('beforeend', `
      <div class="moment">
        <input type="number" class="momentValue" placeholder="Momento (kN·m)" min="1">
        <input type="number" class="momentPosition" placeholder="Posição (m)" min="0">
      </div>
    `);
  }
  
  function calculateDiagrams() {
    const length = parseFloat(document.getElementById('length').value);
    const loads = Array.from(document.querySelectorAll('.load')).map(load => ({
      value: parseFloat(load.querySelector('.loadValue').value),
      position: parseFloat(load.querySelector('.loadPosition').value)
    }));
    const moments = Array.from(document.querySelectorAll('.moment')).map(moment => ({
      value: parseFloat(moment.querySelector('.momentValue').value),
      position: parseFloat(moment.querySelector('.momentPosition').value)
    }));
  
    // Validação básica
    if (length <= 0 || loads.some(l => isNaN(l.value) || isNaN(l.position) || l.position > length)) {
      alert('Por favor, insira valores válidos para comprimento e cargas.');
      return;
    }
  
    // Reações nos apoios
    let RA = 0;
    let RB = 0;
  
    loads.forEach(load => {
      RA += load.value * (length - load.position) / length;
      RB += load.value * load.position / length;
    });
  
    // Calcular os diagramas de força cortante
    const shearData = [];
    const step = length / 100;
    for (let x = 0; x <= length; x += step) {
      let shear = RA;
      loads.forEach(load => {
        if (x >= load.position) shear -= load.value;
      });
      shearData.push({ x: x, y: shear });
    }
  
    // Calcular os diagramas de momento fletor
    const momentData = [];
    for (let x = 0; x <= length; x += step) {
      let moment = RA * x;
      loads.forEach(load => {
        if (x >= load.position) moment -= load.value * (x - load.position);
      });
      momentData.push({ x: x, y: moment });
    }
  
    // Encontrar momento máximo
    const maxMoment = Math.max(...momentData.map(point => Math.abs(point.y)));
    document.getElementById('maxMoment').innerText = `Momento Máximo: ${maxMoment.toFixed(2)} kN·m`;
  
    renderChart('shearChart', shearData, 'Diagrama de Força Cortante (kN)');
    renderChart('momentChart', momentData, 'Diagrama de Momento Fletor (kN·m)');
  }
  
  function renderChart(elementId, data, label) {
    const xValues = data.map(point => point.x);
    const yValues = data.map(point => point.y);

    const trace = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        fill: 'tozeroy',
        line: {
            color: 'rgb(75, 192, 192)',
            width: 2
        },
        fillcolor: 'rgba(75, 192, 192, 0.2)',
        name: label
    };

    const layout = {
        title: label,
        xaxis: {
            title: 'Posição (m)',
            gridcolor: 'rgba(0,0,0,0.1)',
            zerolinecolor: 'black'
        },
        yaxis: {
            title: label,
            gridcolor: 'rgba(0,0,0,0.1)',
            zerolinecolor: 'black'
        },
        plot_bgcolor: 'white',
        paper_bgcolor: 'white',
        margin: { t: 40, b: 40, l: 60, r: 10 },
        hovermode: 'closest'
    };

    const config = {
        responsive: true,
        displayModeBar: false
    };

    Plotly.newPlot(elementId, [trace], layout, config);
}
