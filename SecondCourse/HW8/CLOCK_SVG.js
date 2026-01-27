const circleMultiplier = 15 // Во сколько раз основной круг больше маленьких кружков с цифрами


const circleOffset = 0.8 // Коэффициент отступа маленьких кружков от края основного круга 

const circleAngle = 30 // Угол между маленькими кружками в градусах 

// Во сколько раз каждая стрелка меньше радиуса циферблата по длине
const arrowSecMulti = 2.3  // Секундная стрелка 
const arrowMinMulti = 2.5  // Минутная стрелка 
const arrowHourMulti = 3.5 // Часовая стрелка 

// Во сколько раз каждая стрелка меньше радиуса циферблата по толщине
const arrowHeightHour = 30  // Часовая 
const arrowHeightMin = 47   // Минутная 
const arrowHeightSec = 166  // Секундная 

// Углы поворота стрелок за единицу времени
const arrowSecAngle = 6  // Секундная
const arrowMinAngle = 6  // Минутная
const arrowHourAngle = 30 // Часовая

let currentClockWidth = 0 // Для хранения текущего размера часов

function createSmallCircle(index, width) {

    const bigCircle = document.getElementById("circle")
    const svg = bigCircle

    const rect = svg.getBoundingClientRect()
    
    const smallWidth = width / circleMultiplier
    const radius = width / 2                      

    const offsetRadius = radius * circleOffset    
    const angle = (index) * circleAngle - 90      
    const angleRad = (angle * Math.PI) / 180      

    const x = radius + offsetRadius * Math.cos(angleRad)
    const y = radius + offsetRadius * Math.sin(angleRad)

    const smallCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    smallCircle.setAttribute("cx", x)              
    smallCircle.setAttribute("cy", y)              
    smallCircle.setAttribute("r", smallWidth)      
    smallCircle.setAttribute("fill", "green")      
    
    bigCircle.appendChild(smallCircle)

    let number = document.createElement("div")
    number.innerText = index                                    
    number.style.color = "white"                                
    number.style.position = "absolute"                          
    number.style.left = (rect.left + x) + "px"                 
    number.style.top = (rect.top + y) + "px"                   
    number.style.transform = "translate(-50%, -50%)"                                 
    number.style.fontSize = `${smallWidth * 0.7}px`                                   
    number.style.zIndex = "10"                                  
    number.className = "clock-number"                           

    document.body.appendChild(number)
}

function createArrow(arrowLength, strokeWidth, id) {

    const bigCircle = document.getElementById("circle")
    
    const width = +document.getElementById("width").value

    const arrow = document.createElementNS("http://www.w3.org/2000/svg", "line")
    
    arrow.setAttribute("x1", width/2)
    arrow.setAttribute("y1", width/2)
    
    arrow.setAttribute("x2", width/2)              
    arrow.setAttribute("y2", width/2 - arrowLength)
    
    arrow.setAttribute("stroke", "black")           
    arrow.setAttribute("stroke-width", strokeWidth) 
    arrow.setAttribute("stroke-linecap", "round")   
    arrow.setAttribute("id", id)                   

    bigCircle.appendChild(arrow)
}

function createCircle() {
    
    const circle = document.getElementById("circle")
    if (circle) {
        circle.remove()
    }
    
    const oldDisplay = document.getElementById("display")
    if (oldDisplay) {
        oldDisplay.remove()
    }
    
    const oldNumbers = document.querySelectorAll('.clock-number')
    oldNumbers.forEach(el => el.remove())

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    
    const width = +document.getElementById("width").value
    currentClockWidth = width

    svg.setAttribute("width", width)                        
    svg.setAttribute("height", width)                       
    svg.setAttribute("viewBox", `0 0 ${width} ${width}`)   
    svg.setAttribute("id", "circle")                       

    const circleSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circleSVG.setAttribute("cx", width/2)  
    circleSVG.setAttribute("cy", width/2) 
    circleSVG.setAttribute("r", width/2)  
    circleSVG.setAttribute("fill", "yellow") 

    svg.appendChild(circleSVG)
    
    const clockArea = document.getElementById("clock-area")
    
    clockArea.appendChild(svg)

    setTimeout(() => {
        dateDisplay(width)

        for (let i = 1; i <= 12; i++) {
            createSmallCircle(i, width)
        }

        createArrow(width/arrowHourMulti, width/arrowHeightHour, "hour")      
        createArrow(width/arrowMinMulti, width/arrowHeightMin, "minutes")    
        createArrow(width/arrowSecMulti, width/arrowHeightSec, "seconds")    
        
        updateTime()
    }, 0)
}


function dateDisplay(width) {
    
    const svg = document.getElementById("circle")
    const rect = svg.getBoundingClientRect()
    
    let display = document.createElement("div")

    display.style.position = "absolute"                         
    display.id = "display"                                      
    display.style.top = (rect.top + width * 0.25) + "px"      
    display.style.left = (rect.left + width / 2) + "px"      
    display.style.fontSize = `${width/10}px`              
    display.style.transform = "translateX(-50%)"                                                             
    display.style.zIndex = "10"                                

    document.body.appendChild(display)
}


function updateTime() {
    
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

        const arrowSeconds = document.getElementById("seconds")
        const arrowMin = document.getElementById("minutes")
        const arrowHour = document.getElementById("hour")

        const centerX = currentClockWidth / 2  
        const centerY = currentClockWidth / 2  

        if (arrowSeconds) {
            arrowSeconds.setAttribute("transform", `rotate(${angleSec} ${centerX} ${centerY})`)
        }
        if (arrowHour) {
            arrowHour.setAttribute("transform", `rotate(${angleHour} ${centerX} ${centerY})`)
        }
        if (arrowMin) {
            arrowMin.setAttribute("transform", `rotate(${angleMin} ${centerX} ${centerY})`)
        }
    }
}

setInterval(updateTime, 1000)

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