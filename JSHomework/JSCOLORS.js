"use strict"
let color = prompt("Какой цвет хотите?");
switch (color) {
    case "red":
    case "#ff0000":
    case "#FF0000":
    case "#f00":
        alert("Красный");
        break;
    case "orange":
    case "#FFA500":
    case "#ffa500":
        alert("Оранжевый");
        break;
    case "yellow":
    case "#FFFF00":
    case "#ffff00":
    case "#ff0":
        alert("Желтый");
        break;
    case "green":
    case "#008000":
        alert("Зеленый");
        break;
    case "aqua":
    case "#00FFFF":
    case "#00ffff":
    case "#0ff": 
        alert("Аква");
        break;
    case "blue":
    case "#0000FF":
    case "#0000ff":
    case "#00f":
        alert("Голубой");
        break;
    case "purple":
    case "#800080":
        alert("Фиолетовый");
        break;
    default: 
        alert("Нет такого цвета в радуге")
        break;
    
}