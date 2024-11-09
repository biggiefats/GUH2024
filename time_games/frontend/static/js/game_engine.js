// game_engine.js
class GameEngine {
    constructor() {
        this.currentDecade = 2020;
        this.score = 0;
        this.timeRemaining = 60;

        // Apply base styles immediately
        this.applyBaseStyles();
    }

    applyBaseStyles() {
        // Create and append style element
        const style = document.createElement('style');
        style.textContent = `
            html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(180deg, #800080 0%, #FFD700 100%);
                overflow: hidden;
                font-family: Arial, sans-serif;
            }

            #game-container {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            #time-machine {
                position: fixed;
                top: 20px;
                left: 20px;
                padding: 15px;
                background-color: rgba(0, 0, 0, 0.7);
                color: #FFD700;
                border-radius: 10px;
                border: 2px solid #FFD700;
                z-index: 1000;
            }

            .clock {
                display: flex;
                gap: 20px;
                margin-bottom: 10px;
                font-size: 24px;
                font-weight: bold;
            }

            .score {
                font-size: 20px;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    }

    init() {
        // Create game container if it doesn't exist
        if (!document.getElementById('game-container')) {
            const container = document.createElement('div');
            container.id = 'game-container';
            document.body.appendChild(container);
        }

        // Create time machine UI
        const clockElement = document.createElement('div');
        clockElement.id = 'time-machine';
        clockElement.innerHTML = `
            <div class="clock">
                <span class="year">${this.currentDecade}s</span>
                <span class="timer">${this.timeRemaining}s</span>
            </div>
            <div class="score">Score: ${this.score}</div>
        `;

        document.body.appendChild(clockElement);
        this.startTimer();
    }

    startTimer() {
        const timerElement = document.querySelector('.timer');
        
        const timer = setInterval(() => {
            this.timeRemaining--;
            if (this.timeRemaining >= 0) {
                timerElement.textContent = `${this.timeRemaining}s`;
            }
            
            if (this.timeRemaining === 0) {
                clearInterval(timer);
                this.timeTravel();
            }
        }, 1000);
    }

    timeTravel() {
        const decades = [2020, 2010, 2000, 1990, 1980, 1970, 1960, 1950];
        const currentIndex = decades.indexOf(this.currentDecade);
        const nextDecade = decades[currentIndex + 1] || decades[0];
        
        // Change background based on decade
        const backgrounds = {
            2020: 'linear-gradient(180deg, #FF6B6B 0%, #4ECDC4 100%)',
            2010: 'linear-gradient(180deg, #800080 0%, #FFD700 100%)',
            2000: 'linear-gradient(180deg, #FF8C00 0%, #000000 100%)',
            1990: 'linear-gradient(180deg, #800080 0%, #FF8C00 100%)',
            1980: 'linear-gradient(180deg, #FFD700 0%, #000000 100%)',
            1970: 'linear-gradient(180deg, #800080 0%, #000000 100%)',
            1960: 'linear-gradient(180deg, #FF8C00 0%, #FFD700 100%)',
            1950: 'linear-gradient(180deg, #000000 0%, #FFD700 100%)'
        };

        document.body.style.background = backgrounds[nextDecade];
        this.currentDecade = nextDecade;
        document.querySelector('.year').textContent = `${nextDecade}s`;
        this.timeRemaining = 60;
        this.startTimer();
    }

    updateScore(points) {
        this.score += points;
        document.querySelector('.score').textContent = `Score: ${this.score}`;
    }
}

// Initialize when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.gameEngine = new GameEngine();
        window.gameEngine.init();
    });
} else {
    // DOM is already ready
    window.gameEngine = new GameEngine();
    window.gameEngine.init();
}