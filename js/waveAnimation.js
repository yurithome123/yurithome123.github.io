class WaveAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        // Modificando o z-index para um valor bem baixo
        this.canvas.style.zIndex = '-999';
        // Adicionando uma opacidade mais suave
        this.canvas.style.opacity = '0.3';
        document.body.appendChild(this.canvas);
        
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.amplitude = 200; // Aumentado para ondas maiores
        this.waveCount = 4;  // Mais ondas
        this.lineWidth = 4;  // Linha mais grossa
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    draw(audioData) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        this.ctx.lineWidth = this.lineWidth;

        // Draw multiple waves
        for (let wave = 0; wave < this.waveCount; wave++) {
            this.ctx.beginPath();
            
            // Distribuir as ondas verticalmente
            const startY = this.canvas.height * 0.5; // Centralizar verticalmente
            
            // Draw wave path
            for (let i = 0; i < audioData.length; i++) {
                const x = (i / audioData.length) * this.canvas.width;
                const value = audioData[i] / 255.0;
                // Amplitude aumentada e variável com o áudio
                const amplitude = this.amplitude * value * (1 + wave * 0.5);
                // Onda mais suave
                const frequency = 0.05;
                const y = startY + 
                    Math.sin(i * frequency + wave + performance.now() * 0.001) * amplitude + 
                    (wave * 50); // Espaçamento vertical entre ondas
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.stroke();
        }
    }
}

window.WaveAnimation = WaveAnimation;
