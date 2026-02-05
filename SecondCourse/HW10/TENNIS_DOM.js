let ball = {
    posX: 250, 
    posY: 150, 
    speed: 2,
    speedX: 0,
    speedY: 0, 
    width: 50,
    height: 50,
    angle: 0,
    angleSpeed: function() {
        this.angle += Math.floor(Math.random() * 360) * Math.PI/ 180
        this.speedX = this.speed * Math.cos(this.angle)
        this.speedY = this.speed * Math.sin(this.angle)
    },
    update: function() {
        const ballElem = document.getElementById("ball")
        ballElem.style.left = this.posX + "px"
        ballElem.style.top = this.posY + "px"
    }
}

let blockLeft = { 
    posY: 0, 
    speedY: 5, 
    width: 10,
    height: 100,
    update: function() {
        const blockElem = document.getElementById("leftBlock")
        blockElem.style.top = this.posY + "px"
    }
}

let blockRight = { 
    posY: 0, 
    speedY: 5, 
    width: 10,
    height: 100,
    update: function() {
        const blockElem = document.getElementById("rightBlock")
        blockElem.style.top = this.posY + "px"
    }
}

let area = {
    width: 500,
    height: 300
}

let timerId = null

function start() {
    ball.angleSpeed()
    if (timerId) {
        clearInterval(timerId)
    }
    timerId = setInterval(tick, 10)
}
let counterFirst = 0
let counterSecond = 0
const count = document.getElementById("count")

function tick() {
    ball.posX += ball.speedX
    if (ball.posX + ball.width/2 > area.width) {
        ball.speedX = -ball.speedX
        ball.posX = area.width - ball.width/2
        counterSecond++
        count.innerText = `Счёт: ${counterFirst}:${counterSecond}`
    }
    if (ball.posX - ball.width/2 < 0) {
        ball.speedX = -ball.speedX
        ball.posX = ball.width/2
        counterFirst++
        count.innerText = `Счёт: ${counterFirst}:${counterSecond}`
    }
    if (ball.posX - ball.width/2 < blockLeft.width && 
        ball.posY + ball.height/2 > blockLeft.posY &&  
        ball.posY - ball.height/2 < blockLeft.posY + blockLeft.height) {
        ball.speedX = -ball.speedX
        ball.posX = ball.width/2 + blockLeft.width
    }
    if (ball.posX + ball.width/2 > area.width - blockRight.width && 
        ball.posY + ball.height/2 > blockRight.posY &&
        ball.posY - ball.height/2 < blockRight.posY + blockRight.height) {
        ball.speedX = -ball.speedX
        ball.posX = area.width - blockRight.width - ball.width/2
    }
    ball.posY += ball.speedY
    if (ball.posY +  ball.height/2 > area.height) {
        ball.speedY = -ball.speedY
        ball.posY = area.height - ball.height/2
    }
    if (ball.posY - ball.height/2 < 0) {
        ball.speedY = -ball.speedY
        ball.posY = ball.height/2
    }
    ball.update()

    
    if (keys.shift) {
        blockLeft.posY -= blockLeft.speedY
    }
    if (keys.control) {
        blockLeft.posY += blockLeft.speedY
    }

    if (blockLeft.posY + blockLeft.height > area.height) {
        blockLeft.posY = area.height - blockLeft.height
    }
    if (blockLeft.posY < 0) {
        blockLeft.posY = 0
    }
    blockLeft.update()

    if (keys.arrowUp) {
        blockRight.posY -= blockLeft.speedY
    }
    if (keys.arrowDown) {
        blockRight.posY += blockRight.speedY
    }

    if (blockRight.posY + blockRight.height > area.height) {
        blockRight.posY = area.height - blockRight.height
    }
    if (blockRight.posY < 0) {
        blockRight.posY = 0
    }
    blockRight.update()
}
ball.update()
blockLeft.update()

let keys = {
    shift: false,
    control: false,
    arrowUp: false,
    arrowDown: false
}

addEventListener("keydown",function moveBlock(event) {
    if (event.key == "Shift") {
        keys.shift = true
    }
    if (event.key == "Control") {
        keys.control = true
    }
})

addEventListener("keyup",function moveBlock(event) {
    if (event.key == "Shift") {
        keys.shift = false
    }
    if (event.key == "Control") {
        keys.control = false
    }
})

addEventListener("keydown",function moveBlock(event) {
    if (event.key == "ArrowUp") {
        keys.arrowUp = true
    }
    if (event.key == "ArrowDown") {
        keys.arrowDown = true
    }
})

addEventListener("keyup",function moveBlock(event) {
    if (event.key == "ArrowUp") {
        keys.arrowUp = false
    }
    if (event.key == "ArrowDown") {
        keys.arrowDown = false
    }
})