const canvasWidth = 800 // Высота и ширина canvas, чтобы помещались часы от 200 до 800
const circleOffset = 0.8 // Отступ маленьких окружностей от края основной
const circleAngle = 30 // угол поворота 

const arrowSecAngle = 6  // Секундная
const arrowMinAngle = 6  // Минутная
const arrowHourAngle = 30 // Часовая

// Во сколько раз каждая стрелка меньше радиуса циферблата по толщине
const arrowHeightHour = 30  // Часовая 
const arrowHeightMin = 47   // Минутная 
const arrowHeightSec = 166  // Секундная 


// Во сколько раз каждая стрелка меньше радиуса циферблата по длине
const arrowSecMulti = 2.3  // Секундная стрелка 
const arrowMinMulti = 2.5  // Минутная стрелка 
const arrowHourMulti = 3.5 // Часовая стрелка 

let clockInterval = null
let currentClockWidth = 0

function createCircle() {
    const width = +document.getElementById("width").value
    currentClockWidth = width
    const cvs = document.getElementById("mainCircle")
    if (cvs) {
        cvs.width = canvasWidth 
        cvs.height = canvasWidth
        const context = cvs.getContext("2d")
        context.strokeStyle = "yellow"
        context.beginPath()
        context.arc(canvasWidth/2,canvasWidth/2,width/2,0,Math.PI*2,false)
        context.fillStyle = "yellow"
        context.fill()
        context.stroke()
        const oldNumbers = document.querySelectorAll('.clock-number')
        oldNumbers.forEach(el => el.remove())
        const oldDisplay = document.getElementById("display")
        if (oldDisplay) {
            oldDisplay.remove()
        }
        dateDisplay()
        for (let i = 1; i <= 12;i++) {
            createSmallCircle(i, context)
            createNumber(i)
        }
        if (clockInterval) {
            clearInterval(clockInterval)
        }
        clockInterval = setInterval(updateTime, 1000)
        updateTime() 
    }   
}

function createSmallCircle(index, context) {
        const width = currentClockWidth
        const offsetRadius = width/2 * circleOffset
        const angle = (index) * circleAngle - 90 
        
        const angleRad = (angle * Math.PI) / 180
        const x = offsetRadius * Math.cos(angleRad) + canvasWidth/2
        const y = offsetRadius * Math.sin(angleRad) + canvasWidth/2
        context.strokeStyle = "green"
        context.beginPath()
        context.arc(x,y,width/15,0,Math.PI*2,false)
        context.fillStyle = "green"
        context.fill()
        context.stroke()
}

function createNumber(index) {
    const width = currentClockWidth
    const cvs = document.getElementById("mainCircle")
    const rect = cvs.getBoundingClientRect()
    const offsetRadius = width/2 * circleOffset
    const angle = (index) * circleAngle - 90 
        
    const angleRad = (angle * Math.PI) / 180
    const x = offsetRadius * Math.cos(angleRad) + canvasWidth/2
    const y = offsetRadius * Math.sin(angleRad) + canvasWidth/2

    const number = document.createElement("div")
    number.style.position = "absolute"
    number.style.top = (y + rect.top) + "px"
    number.style.left = (x + rect.left) +"px"
    number.style.color = "white"
    number.style.fontSize = `${width/15 * 0.7}px`
    number.style.transform = "translate(-50%, -50%)"
    number.textContent = `${index}`
    number.className = "clock-number"
    document.body.appendChild(number)
}

function createArrow(stroke, context, angle, length) {
    const x1 = canvasWidth/2
    const y1 = canvasWidth/2

    const angleRad = ((angle-90) * Math.PI)/180
    const x2 = length * Math.cos(angleRad) + canvasWidth/2
    const y2 = length * Math.sin(angleRad) + canvasWidth/2

    context.strokeStyle = "black"
    context.lineWidth = `${stroke}`
    context.lineCap = "round"
    
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineTo(x2,y2)
    context.stroke()
    context.lineWidth = 1
}

function dateDisplay() {
    const width = +document.getElementById("width").value

    const cvs = document.getElementById("mainCircle")
    const rect = cvs.getBoundingClientRect()
    
    let display = document.createElement("div")

    display.style.position = "absolute"                         
    display.id = "display"                                      
    display.style.top = (rect.top + canvasWidth/2) + "px"      
    display.style.left = (rect.left + canvasWidth/2) + "px"      
    display.style.fontSize = `${width/10}px`              
    display.style.transform = "translateX(-50%)"                                                             
    display.style.zIndex = "10"                                

    document.body.appendChild(display)
}

function updateTime() {
    const cvs = document.getElementById("mainCircle")
    const context = cvs.getContext("2d")
    const width = currentClockWidth

    context.clearRect(0, 0, canvasWidth, canvasWidth)

    context.strokeStyle = "yellow"
    context.beginPath()
    context.arc(canvasWidth/2, canvasWidth/2, width/2, 0, Math.PI*2, false)
    context.fillStyle = "yellow"
    context.fill()
    context.stroke()
    
    for (let i = 1; i <= 12; i++) {
        createSmallCircle(i, context)
    }

    let display = document.getElementById("display")
    
    if (display) {
        const time = new Date()
        
        currTimeStr = formatDateTime(time)
        console.log('Текущие дата и время - ' + currTimeStr) 
 
        display.innerHTML = currTimeStr

        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        const angleHour = ((hours % 12) + minutes / 60) * arrowHourAngle
        
        const angleMin = (minutes + seconds / 60) * arrowMinAngle
        
        const angleSec = seconds * arrowSecAngle 

        createArrow(width/arrowHeightHour, context, angleHour, width/arrowHourMulti)
        createArrow(width/arrowHeightMin, context, angleMin, width/arrowMinMulti)
        createArrow(width/arrowHeightSec, context, angleSec, width/arrowSecMulti)
    }
}

function formatDateTime(dt) {
    const hours = dt.getHours();    
    const minutes = dt.getMinutes(); 
    const seconds = dt.getSeconds(); 

    return str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
}

function str0l(val, len) {
    let strVal = val.toString(); 

    while (strVal.length < len)
        strVal = '0' + strVal;
        
    return strVal;
}