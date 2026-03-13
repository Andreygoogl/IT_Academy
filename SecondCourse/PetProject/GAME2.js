class Game {
    constructor() {
        this.rows = 10
        this.columns = 10
        this.score = 0
        this.floor = 0
        this.record = localStorage.getItem("record") || 0
        this.blockArray = []
        this.pos = {
            left: 0
        }
        this.widthMovingBlock = 4
        this.moveDirection = true
        this.gameStarted = false
        this.speed = 0.1
        this.cubeHeight = 0
        this.cubeWidth = 0
        this.updatePassword
        this.playerName = localStorage.getItem("playerName") || ""
    }
    gameStart() {
        this.resetGame()
        this.isRunning = true
        bestValue.innerHTML = this.record
        this.gameStarted = true
        startScreen.style.display = "none"
        endScreen.style.display = "none"
        history.pushState("playing","","")
        requestAnimationFrame(()=> renderer.draw())
    }
        resetGame() {
            this.score = 0
            this.floor = 0
            this.pos = {
                left: 0
            }
            this.blockArray = []
            this.widthMovingBlock = 4
            this.moveDirection = true
            this.speed = 0.1
            floorValue.innerHTML = this.floor
            scoreValue.innerHTML = this.score
            bestValue.innerHTML = this.record
        }
    drop() {
    if (this.blockArray.length == 0) {
        this.blockArray.push({left: Math.round(this.pos.left),width: this.widthMovingBlock})
        this.floor++
        floorValue.innerText = this.floor
        this.score+=100
        scoreValue.innerText = this.score
        this.speed+=0.02
        if (this.blockArray.length > this.rows) {
                this.blockArray.shift()
        }
    } else {
        let newLeft = Math.round(this.pos.left)
        let newRight = newLeft + this.widthMovingBlock  
        let prevLeft = this.blockArray[this.blockArray.length - 1].left
        let prevRight = prevLeft + this.blockArray[this.blockArray.length - 1].width
        let overRight = Math.min(newRight,prevRight)
        let overLeft = Math.max(newLeft,prevLeft)
        let newWidth = overRight - overLeft
        let prevWidth = prevRight-prevLeft

        if(newWidth <= 0) { 
            navigator.vibrate([200, 100, 200])
            soundGameOver()
            endScreen.style.display = "flex"
            this.isRunning = false
            this.record = Math.max(this.score,this.record)
            window.localStorage.setItem("record", this.record)
            bestValue.innerHTML = this.record
            this.speed = 0.1
            document.querySelector("#end-screen h2").innerText = `Score: ${this.score}`
            history.pushState("gameOver","","")
            this.setTableRecords().then(() => {
                console.log("Рекорд сохранен")
            })
        } else {
            navigator.vibrate(50)
            if (newWidth === prevWidth) {
                soundPerfect()
                flashScreen.style.display = "flex"
                flashScreen.style.backgroundColor = "white"
                flashScreen.style.opacity = 0.5
                flashScreen.style.transition = "opacity 0.5s ease"
                setTimeout(() => {
                    flashScreen.style.opacity = "0"
                    setTimeout(() => {
                        flashScreen.style.display = "none"
                        flashScreen.style.backgroundColor = ""
                        flashScreen.style.opacity = ""
                        flashScreen.style.transition = ""
                    }, 200)
                }, 100)
            }
            this.blockArray.push({left:overLeft,width: newWidth})
            this.floor++
            floorValue.innerText = this.floor
            this.score+=100
            scoreValue.innerText = this.score
            if (this.record < this.score) bestValue.innerHTML = this.score
            this.speed+=0.02
            if (this.blockArray.length >= this.rows) {
                this.blockArray.shift()
            }
            this.widthMovingBlock = newWidth
            this.pos.left = overLeft
        }
    } 
    
    }
    setTableRecords() {
    if (!this.playerName) {
        console.error("Имя игрока не установлено");
        return;
    }
    
    this.updatePassword = Math.random();
    return fetch(ajaxHandlerScript, {
        method: "POST",
        headers: {'Content-Type': "application/x-www-form-urlencoded"},
        body: `f=LOCKGET&n=NOVIKOV_TOWER_RECORDS&p=${this.updatePassword}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.result) {
            let records = JSON.parse(data.result) || []
            
            const existingPlayerIndex = records.findIndex(r => r.name === this.playerName);
            
            if (existingPlayerIndex !== -1) {

                if (records[existingPlayerIndex].score < this.record) {
                    records[existingPlayerIndex].score = this.record
                } else {
                    console.log("Рекорд не побит")
                    return fetch(ajaxHandlerScript, {
                        method: "POST",
                        headers: {'Content-Type': "application/x-www-form-urlencoded"},
                        body: `f=UPDATE&n=NOVIKOV_TOWER_RECORDS&p=${this.updatePassword}&v=${encodeURIComponent(JSON.stringify(records))}`
                    })
                    .then(r=>r.json())
                    .then(d=> console.log("Разблокировка:", d))
                }
            } else {

                records.push({name: this.playerName, score: this.record})
            }
            

            records.sort((a, b) => b.score - a.score)
            

            return fetch(ajaxHandlerScript, {
                method: "POST",
                headers: {'Content-Type': "application/x-www-form-urlencoded"},
                body: `f=UPDATE&n=NOVIKOV_TOWER_RECORDS&p=${this.updatePassword}&v=${encodeURIComponent(JSON.stringify(records))}`
            })
            .then(r => r.json())
            .then(d=> console.log("Update ответ ", d ))
        }
    })
    .then(() => {
        this.getTableRecords()
    })
    .catch(error => {
        console.error("Ошибка сохранения рекорда:", error)
    })
}
getTableRecords() {
    const progressContainer = document.getElementById("progress-container")
    const progressBar = document.getElementById("progress-bar")

    progressContainer.style.display = "block"
    progressBar.style.width = "0%"

    let progress = 0
    const interval = setInterval(()=> {
        if (progress < 80) {
            progress +=2
            progressBar.style.width = progress + "%"
        }
    }, 50)
    fetch(ajaxHandlerScript, {
        method: "POST",
        headers: {'Content-Type':"application/x-www-form-urlencoded"},
        body: "f=READ&n=NOVIKOV_TOWER_RECORDS"
    })
    .then((response) => response.json())
    .then((data) => {
        clearInterval(interval)
        progressBar.style.width = "100%"

        setTimeout(() => {
            progressContainer.style.display = "none"
            progressBar.style.width = "0%"

        if (data.result) {
            const records = JSON.parse(data.result)
            records.sort((a,b) => b.score-a.score)
            recordTable.innerHTML = "Table Of Records"
            records.forEach((record,i) => {
                let tableRecord = document.createElement("div")
                tableRecord.innerHTML = `${i+1}. ${record.name} ${record.score}`
                recordTable.appendChild(tableRecord)
        });
        recordTable.style.display = "flex"
        }
                }, 300)
    })
}
async setName() {
    if (this.playerName) {
        console.log("Имя из localStorage")
        return this.playerName
    }

    while (true) {
        let name = prompt("Введите ваше имя");
        
        if (name === null) {
            this.playerName = "Player" + Math.floor(Math.random() * 1000);
            localStorage.setItem("playerName", this.playerName)
            return this.playerName;
        }
        
        name = name.trim();
        if (name === "") {
            alert("Имя не может быть пустым");
            continue;
        }
        
        try {
            const response = await fetch(ajaxHandlerScript, {
                method: "POST",
                headers: {'Content-Type': "application/x-www-form-urlencoded"},
                body: "f=READ&n=NOVIKOV_TOWER_RECORDS"
            });
            
            const data = await response.json();
            
            if (data.result) {
                const records = JSON.parse(data.result);
                const nameExists = records.some(record => record.name === name);
                
                if (!nameExists) {
                    this.playerName = name;
                    localStorage.setItem("playerName", this.playerName)
                    return this.playerName;
                } else {
                    alert("Имя занято");
                }
            } else {
                this.playerName = name
                localStorage.setItem("playerName", this.playerName)
                return this.playerName;
            }
        } catch (error) {
            console.error("Ошибка:", error);
            this.playerName = name;
            localStorage.setItem("playerName", this.playerName)
            return this.playerName;
        }
    }
}

}

class Renderer {
    constructor(game) {
        this.game = game
        this.canvas = document.getElementById("canv")
        this.ctx = this.canvas.getContext("2d")
    }
    getBlock() {
    const width = mainField.clientWidth
    const height = mainField.clientHeight
    this.game.cubeHeight = height/this.game.rows
    this.game.cubeWidth = width/this.game.columns
    this.canvas.setAttribute("height", height)
    this.canvas.setAttribute("width", width)
    }
    fieldDraw() {
    for (let i = 0;i < this.game.rows;i++) {
        for (let j = 0;j < this.game.columns;j++) {
            this.ctx.beginPath()
            this.ctx.rect(j * this.game.cubeWidth,(this.game.rows - 1 - i) * this.game.cubeHeight,this.game.cubeWidth,this.game.cubeHeight)
            this.ctx.fillStyle = '#030810'
            this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)'
            this.ctx.globalAlpha = 1
            this.ctx.lineWidth = "2"
            this.ctx.shadowColor = "transparent"
            this.ctx.shadowBlur = 0
            this.ctx.stroke()
            this.ctx.fill()
        }
    }
    }
    getSetBlocks() {
    for(let i = 0;i<this.game.blockArray.length;i++) {
        for(let j = this.game.blockArray[i].left; j < this.game.blockArray[i].left + this.game.blockArray[i].width;j++) {
            this.ctx.beginPath()
            this.ctx.rect(j * this.game.cubeWidth,(this.game.rows - 1 - i) * this.game.cubeHeight,this.game.cubeWidth,this.game.cubeHeight)
            this.ctx.fillStyle = 'cyan'
            this.ctx.strokeStyle = '#030810'
            this.ctx.globalAlpha = 1
            this.ctx.lineWidth = "2"
            this.ctx.shadowColor = "#00ffff"
            this.ctx.shadowBlur = 10
            this.ctx.stroke()
            this.ctx.fill()
        }
    }    
    }
    getMovingBlock() {
    let left = Math.round(this.game.pos.left)
    for (let i = left;i<left + this.game.widthMovingBlock;i++) {
        this.ctx.beginPath()
        this.ctx.shadowColor = "#00ffff"
        this.ctx.shadowBlur = 15
        this.ctx.fillStyle = "cyan"
        this.ctx.strokeStyle = "#030810"
        this.ctx.lineWidth = "2"
        this.ctx.rect(i*this.game.cubeWidth,(this.game.rows - 1 - this.game.blockArray.length) * this.game.cubeHeight,this.game.cubeWidth,this.game.cubeHeight)
        this.ctx.stroke()
        this.ctx.fill()
    }
    }
    draw() {
    if (this.game.isRunning) {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.fieldDraw()
        if (this.game.pos.left + this.game.widthMovingBlock >= this.game.columns) {
            this.game.moveDirection = false
            this.game.pos.left = this.game.columns - this.game.widthMovingBlock
        } else if (this.game.pos.left < 0) {
            this.game.moveDirection = true
            this.game.pos.left = 0
        }
        if (this.game.moveDirection) {
            this.game.pos.left+=this.game.speed
        } else if (!this.game.moveDirection){
            this.game.pos.left-=this.game.speed
        }
        this.getSetBlocks()
        this.getMovingBlock()
        requestAnimationFrame(()=>this.draw())
    }
    }
}

const mainField = document.getElementById("main-field")
const scoreValue = document.getElementById("score-value")
const floorValue = document.getElementById("floor-value")
const bestValue = document.getElementById("best-value")
const startButton = document.getElementById("start-button")
const restartButton = document.getElementById("restart-button")
const endScreen = document.getElementById("end-screen")
const flashScreen = document.getElementById("flash")
const startScreen = document.getElementById("start-screen")
const recordTable = document.getElementById("table-records")

const audioCtx = new(window.AudioContext || window.webkitAudioContext)()
const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";

const game = new Game()
const renderer = new Renderer(game)

function playSound(frequency, type, duration, volume = 0.3) {
    const oscillator = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration)

    oscillator.start(audioCtx.currentTime)
    oscillator.stop(audioCtx.currentTime + duration)
}

function soundPerfect() {
    playSound(523, "sine", 0.2)
    playSound(659, "sine", 0.2)
}

function soundGameOver() {
    playSound(300, "sawtooth", 0.2)
    setTimeout(() => playSound(200, "sawtooth", 0.2), 200)
    setTimeout(() => playSound(100, "sawtooth", 0.3), 400)
}

document.addEventListener("keydown",(event) => {
    if (event.code == "Space") {
        if (game.isRunning) game.drop()
        else game.gameStart()
    }   
})
const isMobile = () => window.matchMedia("(max-width: 600px)").matches

mainField.addEventListener("mousedown", () => {
    if (game.isRunning && !isMobile()) game.drop()
})

window.addEventListener("touchstart", (event) => {
    if (!game.isRunning) return
    if (event.target === startButton || event.target === restartButton) return
    event.preventDefault()
    game.drop()
}, { passive: false })

startButton.addEventListener("click", () => game.gameStart())
restartButton.addEventListener("click", () =>game.gameStart())
startButton.addEventListener("touchstart", (event)=> {
    event.stopPropagation()
    game.gameStart()
})
restartButton.addEventListener("touchstart", (event)=> {
    event.stopPropagation()
    game.gameStart()
})
document.addEventListener("DOMContentLoaded", () => {
    renderer.getBlock()
})
window.addEventListener("resize", () => {
    renderer.getBlock()
    if (!game.isRunning && game.gameStarted) {
        renderer.ctx.clearRect(0,0,renderer.canvas.width,renderer.canvas.height)
        renderer.fieldDraw()
        renderer.getSetBlocks()
        renderer.getMovingBlock()
    } else if (!game.gameStarted) {
        renderer.ctx.clearRect(0,0,renderer.canvas.width,renderer.canvas.height)
    }
})
window.addEventListener("beforeunload", (event) => {
    if (game.isRunning) {
        event.preventDefault()
    }
})
window.addEventListener("popstate", (event)=> {
    switch (event.state) {
        case "gameOver": 
            game.isRunning = false
            endScreen.style.display = "none"
            startScreen.style.display = "flex"
            game.resetGame()
            game.gameStarted = false
            break;
        case "playing":
            renderer.ctx.clearRect(0, 0, renderer.canvas.width, renderer.canvas.height)
            endScreen.style.display = "none"
            startScreen.style.display = "flex"
            game.isRunning = false
            game.resetGame()
            game.gameStarted = false
            break;
        case null:
            renderer.ctx.clearRect(0, 0, renderer.canvas.width, renderer.canvas.height)
            renderer.fieldDraw()
            game.isRunning = false
            startScreen.style.display = "flex"
            endScreen.style.display = "none"
            game.resetGame()
            game.gameStarted = false
            break;
    }
})


if (!game.playerName) {
    game.setName().then(name => {
        console.log("Имя получено:", name);
    })
} else {
    console.log("Имя загружено из localStorage:", game.playerName)
}
game.getTableRecords()
if (isMobile()) {
    document.getElementById("hint").innerText = "Tap anywhere -> Drop block"
    document.querySelector("#start-screen > h3").innerText = "Press start to drop"
}