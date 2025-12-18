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
const countForEach = (line) => {
    let counter = 0
    const count = (v) => {
        if (vowels[v]) counter++
    }
    line.split("").forEach(count)
    return counter
}
const countFilter = (line) => {
    return line.split("").filter( (v) => vowels[v]).length
}
const countReduce = (line) => {
    const count = (r,v) => {
        if (vowels[v]) r++
        return r
    }
    
    return line.split("").reduce(count,0)
}
let line = prompt('Введите строку')

console.log('Всего гласных: ' + countForEach(line))
console.log('Всего гласных: ' + countFilter(line))
console.log('Всего гласных: ' + countReduce(line))

