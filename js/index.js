const canvas = document.getElementById('my-canvas')
const ctx = canvas.getContext('2d')

const background = new Image()
background.src = './images/background.jpg'

const player1 = new Image()
player1.src = './images/player 1.png'

const player2 = new Image()
player2.src = './images/player 2.png'

const pizza = new Image()
pizza.src = './images/pizza.png'

const yum = new Image()
yum.src = './images/yum.png'

const bonus = new Image()
bonus.src = './images/pizza-bonus.png'

const malus = new Image()
malus.src = './images/burger.png'

const winner = new Image()
winner.src = './images/winner.png'

const loser = new Image()
loser.src = './images/loser.png'


class GameBoard {
    constructor() {
        this.width = 1000
        this.height = 700
    }
    drawBackground() {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    }
}

class Player1 {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    drawPlayer1() {
        let x = this.x
        let y = this.y
        let width = this.width
        let height = this.height

        ctx.drawImage(player1, x, y, width, height)
    }

    moveLeft() {
        this.x -= 30
    }

    moveRight() {
        this.x += 30
    }

}

class Player2 extends Player1 {
    drawPlayer2() {
        let x = this.x
        let y = this.y
        let width = this.width
        let height = this.height

        ctx.drawImage(player2, x, y, width, height)
    }
}

class Pizza {
    constructor(x, y, radius, startAngle, endAngle) {
        this.x = x
        this.y = y
        this.radius = radius
        this.startAngle = startAngle
        this.endAngle = endAngle
    }

    drawPizza() {
        let x = this.x
        let y = this.y
        let radius = this.radius
        let startAngle = this.startAngle
        let endAngle = this.endAngle

        const pattern = ctx.createPattern(pizza, 'repeat')
        ctx.beginPath()
        ctx.arc(x, y, radius, startAngle * Math.PI, (Math.PI / 180) * endAngle)
        ctx.strokeStyle = 'orange'
        ctx.lineWidth = 14
        ctx.stroke()
        ctx.lineTo(x, y)
        ctx.fillStyle = pattern
        ctx.fill()
    }

    eatPizza() {
        this.startAngle += 0.25
    }

}

class Bonus {
    constructor(x, y, speed, width, height) {
        this.x = x
        this.y = y
        this.speed = speed
        this.width = width
        this.height = height
        this.collision = false
    }

    drawBonus() {
        let x = this.x
        let y = this.y
        let width = this.width
        let height = this.height

        ctx.drawImage(bonus, x, y, width, height)
    }

    moveBonus() {
        this.y += this.speed
    }

}

class Malus {
    constructor(x, y, speed, width, height) {
        this.x = x
        this.y = y
        this.speed = speed
        this.width = width
        this.height = height
        this.collision = false
    }

    drawMalus() {
        let x = this.x
        let y = this.y
        let width = this.width
        let height = this.height

        ctx.drawImage(malus, x, y, width, height)
    }

    moveMalus() {
        this.y += this.speed
    }

}


class Yummy {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    drawYummy() {
        let x = this.x
        let y = this.y
        let width = this.width
        let height = this.height

        ctx.drawImage(yum, x, y, width, height)
    }

    showYummy() {
        this.intervalId = setInterval(() => {
            this.width = 50
            this.height = 50
        }, 2000)
    }

    hideYummy() {
        this.intervalId = setInterval(() => {
            this.width = 0
            this.height = 0
        }, 1000)
    }

}

class Timer {
    constructor(currentTime) {
        this.currentTime = currentTime
        this.intervalId = 0
    }

    drawTimer() {
        let currentTime = this.currentTime
        ctx.fillStyle = 'black'
        ctx.font = '24px Verdana'
        ctx.fillText(`Remaining Time: ${currentTime}`, 50, 50)
    }

    startTimer() {
        this.intervalId = setInterval(() => {
            this.currentTime--
        }, 1000)
    }

}

class Start {
    constructor(currentTime) {
        this.currentTime = currentTime
        this.intervalId = 0
    }

    drawStart() {
        let currentTime = this.currentTime
        if (this.currentTime > 0) {
            ctx.fillStyle = 'black'
            ctx.font = '48px Verdana'
            ctx.fillText(currentTime, 450, 200)
        }
        if (this.currentTime == 0) {
            ctx.fillStyle = 'black'
            ctx.font = '48px Verdana'
            ctx.fillText('START', 390, 200)
        }
    }

    preStart() {
        this.intervalId = setInterval(() => {
            this.currentTime--
        }, 1000)
    }

}

class Game {
    constructor() {
        this.gameBoard = new GameBoard()
        this.start = new Start(3)
        this.timer = new Timer(30)
        this.player1 = new Player1(200, 400, 100, 200)
        this.player2 = new Player2(650, 400, 100, 200)
        this.pizza1 = new Pizza(380, 500, 70, 0, 360)
        this.pizza2 = new Pizza(570, 500, 70, 0, 360)
        this.player1.score = 0
        this.player2.score = 0
        this.yum1 = new Yummy(300, 375, 0, 0)
        this.yum2 = new Yummy(250, 350, 0, 0)
        this.yum3 = new Yummy(625, 375, 0, 0)
        this.yum4 = new Yummy(575, 350, 0, 0)
        this.bonus = []
        this.malus = []
    }

    startGame() {
        this.gameBoard.drawBackground()
        this.start.preStart()
        setTimeout(this.timer.startTimer.bind(this.timer), 3000)
        setTimeout(this.yum1.showYummy.bind(this.yum1), 3000)
        this.yum1.hideYummy()
        setTimeout(this.yum2.showYummy.bind(this.yum2), 3000)
        this.yum2.hideYummy()
        setTimeout(this.yum3.showYummy.bind(this.yum3), 3000)
        this.yum3.hideYummy()
        setTimeout(this.yum4.showYummy.bind(this.yum4), 3000)
        this.yum4.hideYummy()
        setTimeout(this.addListeners.bind(this), 3000)
        this.statusStop = false
        this.intervalId = setInterval(this.addBonus.bind(this), 5000)
        this.intervalId = setInterval(this.addMalus.bind(this), 6000)
        this.playStartSound()
        setTimeout(this.startGameSound.bind(this), 4000)
        requestAnimationFrame(this.gameLoop.bind(this))
    }

    gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.gameBoard.drawBackground()
        this.player1.drawPlayer1()
        this.player2.drawPlayer2()
        this.pizza1.drawPizza()
        this.pizza2.drawPizza()
        this.start.drawStart()
        this.timer.drawTimer()
        this.yum1.drawYummy()
        this.yum2.drawYummy()
        this.yum3.drawYummy()
        this.yum4.drawYummy()

        this.bonus.forEach(bonus => {
            bonus.drawBonus()
            bonus.moveBonus()
        })

        this.malus.forEach(malus => {
            malus.drawMalus()
            malus.moveMalus()
        })

        this.stopGame()

        this.updateScorePlayer1(ctx)
        this.updateScorePlayer2(ctx)

        this.collisionBonusDetectionPlayer1(this.bonus)
        this.collisionBonusDetectionPlayer2(this.bonus)
        this.collisionMalusDetectionPlayer1(this.malus)
        this.collisionMalusDetectionPlayer2(this.malus)

        if (!this.statusStop) {
            requestAnimationFrame(this.gameLoop.bind(this))
        }
    }

    // Score
    addScorePlayer1() {
        if (this.pizza1.startAngle % 2 == 0) {
            this.player1.score += 1
        }
    }

    addScorePlayer2() {
        if (this.pizza2.startAngle % 2 == 0) {
            this.player2.score += 1
        }
    }

    updateScorePlayer1() {
        ctx.fillStyle = 'black'
        ctx.font = '30px Verdana'
        ctx.fillText(this.player1.score, 370, 310)
    }

    updateScorePlayer2() {
        ctx.fillStyle = 'black'
        ctx.font = '30px Verdana'
        ctx.fillText(this.player2.score, 560, 310)
    }

    defineWinner() {
        if (this.player1.score > this.player2.score) {
            ctx.drawImage(winner, 150, 350, 250, 250)
            ctx.drawImage(loser, 600, 350, 250, 250)
        } else if (this.player1.score < this.player2.score) {
            ctx.drawImage(loser, 150, 350, 250, 250)
            ctx.drawImage(winner, 600, 350, 250, 250)
        } else {
            ctx.fillStyle = 'red'
            ctx.font = '42px Verdana'
            ctx.fillText('YOU ARE ON A NINJA DIET !', 200, 250)
        }
    }

    // Bonus & Malus
    addBonus() {
        for (let i = 0; i < 2; i++) {
            const randomX = 10 + (Math.random() * 1000)
            const randomY = 10 + (Math.random() * 50)
            const bonus = new Bonus(randomX, randomY, 5, 125, 125)
            this.bonus.push(bonus)
        }
    }

    addMalus() {
        for (let i = 0; i < 2; i++) {
            const randomX = 10 + (Math.random() * 1000)
            const randomY = 10 + (Math.random() * 50)
            const malus = new Malus(randomX, randomY, 5, 75, 75)
            this.malus.push(malus)
        }
    }

    collisionBonusDetectionPlayer1(bonus) {
        bonus.forEach(bonus => {
            if (this.player1.x < bonus.x + bonus.width && this.player1.x + this.player1.width > bonus.x && this.player1.y < bonus.y + bonus.height && this.player1.y + this.player1.height > bonus.y)
                if (bonus.collision === false) {
                    this.player1.score += 1
                    bonus.collision = true
                    this.playBonusSound()
                }
        })
    }

    collisionBonusDetectionPlayer2(bonus) {
        bonus.forEach(bonus => {
            if (this.player2.x < bonus.x + bonus.width && this.player2.x + this.player2.width > bonus.x && this.player2.y < bonus.y + bonus.height && this.player2.y + this.player2.height > bonus.y)
                if (bonus.collision === false) {
                    this.player2.score += 1
                    bonus.collision = true
                    this.playBonusSound()
                }
        })
    }

    collisionMalusDetectionPlayer1(malus) {
        malus.forEach(malus => {
            if (this.player1.x < malus.x + malus.width && this.player1.x + this.player1.width > malus.x && this.player1.y < malus.y + malus.height && this.player1.y + this.player1.height > malus.y)
                if (malus.collision === false) {
                    this.player1.score -= 1
                    malus.collision = true
                    this.playMalusSound()
                }
        })
    }

    collisionMalusDetectionPlayer2(malus) {
        malus.forEach(malus => {
            if (this.player2.x < malus.x + malus.width && this.player2.x + this.player2.width > malus.x && this.player2.y < malus.y + malus.height && this.player2.y + this.player2.height > malus.y)
                if (malus.collision === false) {
                    this.player2.score -= 1
                    malus.collision = true
                    this.playMalusSound()
                }
        })
    }

    // Add audio to the game
    startGameSound() {
        const gameSound = new Audio('./audio/background-music.mp3')
        gameSound.loop = false
        gameSound.volume = 0.5
        gameSound.play()
    }
    playStartSound() {
        const startSound = new Audio('./audio/start-sound.mp3')
        startSound.loop = false
        startSound.volume = 0.2
        startSound.play()
    }
    playPizzaSound() {
        const pizzaSound = new Audio('./audio/pizza-eating-sound.mp3')
        pizzaSound.loop = false
        pizzaSound.volume = 0.3
        pizzaSound.play()
    }
    playBonusSound() {
        const bonusSound = new Audio('./audio/bonus-sound.mp3')
        bonusSound.loop = false
        bonusSound.volume = 0.3
        bonusSound.play()
    }
    playMalusSound() {
        const malusSound = new Audio('./audio/malus-sound.mp3')
        malusSound.loop = false
        malusSound.volume = 0.2
        malusSound.play()
    }
    playEndSound() {
        const endSound = new Audio('./audio/game-over.mp3')
        endSound.loop = false
        endSound.volume = 0.3
        endSound.play()
    }

    // Stop game
    stopGame() {
        if (this.timer.currentTime <= 0) {
            clearInterval(this.timer.intervalId)
            this.statusStop = true
            this.defineWinner()
            this.playEndSound()
        }
    }

    // Event Listeners
    addListeners() {
        document.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'w':
                    this.pizza1.eatPizza()
                    this.addScorePlayer1()
                    this.playPizzaSound()
                    break;
                case 'o':
                    this.pizza2.eatPizza()
                    this.addScorePlayer2()
                    this.playPizzaSound()
                    break;
            }
        })
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'q':
                    this.player1.moveLeft()
                    break;
                case 'e':
                    this.player1.moveRight()
                    break;
                case 'i':
                    this.player2.moveLeft()
                    break;
                case 'p':
                    this.player2.moveRight()
                    break;
            }
        })
    }

}

const game = new Game()

window.addEventListener('load', () => {
    game.startGame();
});