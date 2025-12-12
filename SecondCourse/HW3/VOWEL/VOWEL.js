let line = prompt('Введите строку')
const vowels = {
    'а': true,
    'А': true,
    'е' :true,
    'Е' :true,
    'ё' :true,
    'Ё' :true,
    'и' :true,
    'И' :true,
    'о' :true,
    'О' :true,
    'У' :true,
    'у' :true,
    'Э' :true,
    'э' :true,
    'ю' :true,
    'Ю' :true,
    'Я' :true,
    'я' :true,
    'ы': true,
    'Ы': true
}
let count = 0
for (let i = 0;i<line.length;i++) {
    if (vowels[line[i]]) count++;
}
console.log('Всего гласных: ' + count)