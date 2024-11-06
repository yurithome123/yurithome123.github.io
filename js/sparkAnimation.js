
class SparkAnimation {
    constructor() {
        this.sparks = [];
        this.corners = [
            { x: 0, y: 0 }, // Top-left
            { x: window.innerWidth, y: 0 }, // Top-right
            { x: 0, y: window.innerHeight }, // Bottom-left
            { x: window.innerWidth, y: window.innerHeight } // Bottom-right
        ];
    }

    createSpark(corner) {
        return {
            x: corner.x,
            y: corner.y,
            size: Math.random() * 3,
            opacity: Math.random(),
            speedX: (Math.random() - 0.5) * 10,
            speedY: (Math.random() - 0.5) * 10
        };
    }

    updateSparks(audioData) {
        const intensity = audioData.reduce((acc, val) => acc + val, 0) / audioData.length;
        
        if (intensity > 0.5) {
            this.corners.forEach(corner => {
                for (let i = 0; i < 3; i++) {
                    this.sparks.push(this.createSpark(corner));
                }
            });
        }

        this.sparks = this.sparks.filter(spark => {
            spark.x += spark.speedX;
            spark.y += spark.speedY;
            spark.opacity -= 0.02;
            return spark.opacity > 0;
        });
    }

    draw(ctx) {
        ctx.save();
        this.sparks.forEach(spark => {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${spark.opacity})`;
            ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    }
}

// Export for use in main visualization
window.SparkAnimation = SparkAnimation;
