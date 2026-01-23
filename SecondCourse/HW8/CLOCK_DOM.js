const circleMultiplier = 9 // Основной круг больше в 9 раз
const circleOffset = 0.8 // Отступ маленьких окружностей от края основной
const circleAngle = 30 // угол поворота 

const arrowSecMulti = 2.3 // Во сколько раз секундная меньше циферблата по длине
const arrowMinMulti = 2.5 // Во сколько раз минутная меньше циферблата по длине
const arrowHourMulti = 3.5 // Во сколько раз часовая меньше циферблата по длине

const arrowHeightHour = 30 // Во сколько раз часовая меньше циферблата по толщине
const arrowHeightMin = 47 // Во сколько раз минутная меньше циферблата по толщине
const arrowHeightSec = 166 // Во сколько раз секундная меньше циферблата по толщине

const arrowSecAngle = 6 // Угол поворота секундной стрелки
const arrowMinAngle = 6 // Угол поворота минутной стрелки
const arrowHourAngle = 30 // Угол поворота часовой стрелки


function createSmallCircle(index) {
    const bigCircle = document.getElementById("сircle")

    let div = document.createElement("div")
    const width = +document.getElementById("width").value
    const smallWidth = width/circleMultiplier
    const radius = width/2

    div.style.border = "solid 1px green" 
    div.style.borderRadius = "50%"
    div.style.width = smallWidth + "px"
    div.style.height = smallWidth + "px"
    div.style.backgroundColor = "green"

    div.style.position = "absolute"
    div.style.left = "50%"
    div.style.top = "50%"
    div.style.marginLeft = `-${smallWidth/2}px`
    div.style.marginTop = `-${smallWidth/2}px`
    
    const offsetRadius = radius * circleOffset
    const angle = (index) * circleAngle - 90 // 90 градусов, чтобы начать с 12
    
    const angleRad = (angle * Math.PI) / 180
    const x = offsetRadius * Math.cos(angleRad)
    const y = offsetRadius * Math.sin(angleRad)
    
    div.style.transform = `translate(${x}px, ${y}px)`
    
    bigCircle.appendChild(div)

    let number = document.createElement("div")
    number.innerText = index
    number.style.color = "white"
    number.style.display = "flex"
    number.style.marginTop = "25%"
    number.style.justifyContent = "center"
    number.style.alignItems = "center"
    number.style.fontSize = `${smallWidth * 0.5}px`
    div.appendChild(number)
}

function createArrow(width, height, index) {
    const bigCircle = document.getElementById("сircle")

    let arrow = document.createElement("div")
    arrow.style.width = height + "px"
    arrow.style.height = width + "px"
    arrow.style.marginTop = `-${width}px`
    arrow.style.transformOrigin = `center bottom`
    arrow.style.position = "absolute"
    arrow.style.left = "50%"
    arrow.style.marginLeft = `-${height/2}px`
    arrow.style.top = "50%" 
    arrow.style.backgroundColor = "black"
    arrow.style.borderRadius = `${height/2}px`
    arrow.style.zIndex = 1
    arrow.id = `${index}`
    bigCircle.appendChild(arrow)
}

function createCircle() {
    const circle = document.getElementById("сircle")
    if (circle) {
        circle.remove()
    }
    let div = document.createElement("div")
    const width = +document.getElementById("width").value
    div.style.border = "solid 1px Yellow" 
    div.style.borderRadius = "50%"
    div.style.width = width + "px"
    div.style.height = width + "px"
    div.style.backgroundColor = "Yellow"
    div.style.position = "relative"
    div.id = "сircle"
    div.style.margin = "0 auto"
    document.body.appendChild(div)
    createArrow(width/arrowHourMulti, width/arrowHeightHour, "hour")
    createArrow(width/arrowMinMulti, width/arrowHeightMin, "minutes")
    createArrow(width/arrowSecMulti, width/arrowHeightSec, "seconds")
    dateDisplay(width/2)
    for (let i = 1; i <= 12; i++) {
        createSmallCircle(i)

    }
}

function dateDisplay(width) {
    const circle = document.getElementById("сircle")
    let display = document.createElement("div")

    display.style.position = "absolute"
    display.style.width = width + "px"
    display.id = "display"
    display.style.top = "25%"
    display.style.left = "50%"
    display.style.fontSize = `${width/6}px`
    display.style.transform = "translateX(-25%)"
    circle.appendChild(display)
}

function updateTime() {
    let display = document.getElementById("display")
    if (display) {
        const time = new Date()
        currTimeStr = formatDateTime(time)
        console.log('Текущие дата и время - '+currTimeStr) 
        display.innerHTML = currTimeStr

        const hours=time.getHours();
        const minutes=time.getMinutes();
        const seconds=time.getSeconds();

        const angleHour = ((hours % 12) + minutes / 60) * arrowHourAngle
        const angleMin = (minutes + seconds / 60) * arrowMinAngle
        const angleSec = seconds * arrowSecAngle

        const arrowSeconds = document.getElementById("seconds")
        const arrowMin = document.getElementById("minutes")
        const arrowHour = document.getElementById("hour")

        arrowSeconds.style.transform = `rotate(${angleSec}deg)`
        arrowHour.style.transform = `rotate(${angleHour}deg)`
        arrowMin.style.transform = `rotate(${angleMin}deg)`
    }
}

setInterval(updateTime, 1000)


function formatDateTime(dt) {
        const hours=dt.getHours();
        const minutes=dt.getMinutes();
        const seconds=dt.getSeconds();

        return str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
}

function str0l(val,len) {
        let strVal=val.toString();
        while ( strVal.length < len )
            strVal='0'+strVal;
        return strVal;
}

