function ObjStorageFunc() {
    this.storage = {};
    this.addValue = (key,value) => {
        this.storage[key] = value
    }
    this.getValue = (key) => {
        return this.storage[key];
    }
    this.deleteValue = (key) => {
        if (key in this.storage) {
            delete this.storage[key]
            return true
        } else return false
        
    }
    this.getKeys = () => {
        return Object.keys(this.storage)
    }
}

const drinkStorage = new ObjStorageFunc;

function save() {
    let name = prompt("Название напитка")
    let alco = confirm("Алкогольный - ОК, безалкогольный - Отмена")
    let recipe = prompt("Рецепт приготовления")
    drinkStorage.addValue(name, {a:alco, r:recipe})
}
function get () {
    let name = prompt("Название напитка")
    if (drinkStorage.getValue(name)) {
       let drink = drinkStorage.getValue(name)
       alert(`Напиток ${name}
        ${drink.a==true? "Содержит алкоголь": "Безалкогольный"}
        Рецепт приготовления: 
        ${drink.r}`)
    } else alert("Отсутствует такой напиток")
}
function deleteDrink () {
    let name = prompt("Какой напиток удалить?")
    if (drinkStorage.getValue(name)) {
        drinkStorage.deleteValue(name)
        alert(`Удалён напиток ${name}`)
    } else alert("Нет такого напитка")
}
function getAll() {
    let allDrinks = drinkStorage.getKeys()
    if (allDrinks.length == 0) {
        alert("Нет сохранённых напитков")
    } else {
        alert("Сохранённые напитки:\n" + allDrinks.join("\n"))
    } 
}