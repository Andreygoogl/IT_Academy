let name
let age
do {
    name = prompt('Ваше ФИО')
    if (name.trim() !== "" && name !== null && name !== undefined) {
        break;
    }
} while(true)
do {
    age = Number(prompt('Ваш возраст'))
    if (!isNaN(age) && age > 0 && age < 150) {
        break
    }
} while (true)
let gender = confirm('Ваш пол - мужской?')
if (gender) {
    gender = "мужской"
}
else {
    gender = "женский"
}   
let retire
if (gender == "мужской" && age > 65) {
    retire = "да"
} else if (gender == "женский" && age > 58) {
    retire = "да"
} else {
    retire = "нет"
}
alert(`Ваше ФИО: ${name}\nваш возраст в годах: ${age}\nваш возраст в днях: ${age * 365}\nчерез 5 лет вам будет: ${age + 5}\nваш пол: ${gender}\nвы на пенсии: ${retire}`)