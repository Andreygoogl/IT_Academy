"use strict"
let surname = prompt("Введите фамилию");
let name = prompt("Введите имя");
let fatherName = prompt("Введите отчество");
let age = prompt("Введите возраст");
let gender = confirm("Ваш пол - мужской?");
alert(`Ваше ФИО: ${surname} ${name} ${fatherName}\n ваш возраст в годах: ${age}\n ваш взораст в днях ${age * 365}\n через 5 лет вам будет: ${Number(age) + 5}\n ваш пол: ${gender ? "мужской" : "женский"}\n вы на пенсии: ${(age > 60 ? "да" : "нет")}`);