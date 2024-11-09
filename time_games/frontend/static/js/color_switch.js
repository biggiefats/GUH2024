// color_switch.js
class ColorSwitch {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 400;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext('2d');
        
        this.player = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 100,
            radius: 15,
            color: '#FF6B6B'
        };
        
        this.init();
    }

    init() {
        const gameContainer = document.getElementById('game-container');
        if (!gameContainer) return;

        // Clear container
        gameContainer.innerHTML = '';
        
        // Style canvas
        this.canvas.style.display = 'block';
        this.canvas.style.margin = '0 auto';
        this.canvas.style.backgroundColor = '#1a1a1a';
        
        // Add canvas to container
        gameContainer.appendChild(this.canvas);
        
        // Add color switch button
        const switchButton = document.createElement('button');
        switchButton.textContent = 'Switch Color';
        switchButton.style.position = 'absolute';
        switchButton.style.bottom = '20px';
        switchButton.style.left = '50%';
        switchButton.style.transform = 'translateX(-50%)';
        switchButton.style.padding = '10px 20px';
        switchButton.style.fontSize = '18px';
        switchButton.style.backgroundColor = '#333';
        switchButton.style.color = '#fff';
        switchButton.style.border = 'none';
        switchButton.style.borderRadius = '5px';
        switchButton.style.cursor = 'pointer';
        
        gameContainer.appendChild(switchButton);
        
        // Start game loop
        this.gameLoop();
    }

    drawPlayer() {
        this.ctx.beginPath();
        this.ctx.arc(this.player.x, this.player.y, this.player.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.player.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    gameLoop = () => {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw player
        this.drawPlayer();

        // Continue loop
        requestAnimationFrame(this.gameLoop);
    }

    cleanup() {
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.innerHTML = '';
        }
    }
}

// Initialize the game when the script loads
window.currentGame = new ColorSwitch();