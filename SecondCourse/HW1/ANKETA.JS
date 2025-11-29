let name
let surname 
let fatherName
let age
let ageNumb
do {
    name = prompt('Ваша фамилия')
} while(!name || name.trim() == "")
do {
    surname = prompt('Ваше имя')
} while(!surname || surname.trim() == "")
do {
    fatherName = prompt('Ваше отчество')
} while(!fatherName || fatherName.trim() == "")
do {
    age = prompt('Ваш возраст')
    ageNumb = Number(age)
} while (!age || isNaN(ageNumb))
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
alert(`Ваше ФИО: ${name} ${surname} ${fatherName}\nваш возраст в годах: ${ageNumb}\nваш возраст в днях: ${ageNumb * 365}\nчерез 5 лет вам будет: ${ageNumb + 5}\nваш пол: ${gender}\nвы на пенсии: ${retire}`)