function LocStorage(keyName) {

    this.addValue = function(key, value) {
        this.storage[key] = value
        this.saveToLS()
    }

    this.getValue = function(key) {
        return this.storage[key]
    }

    this.deleteValue = function(key) {
        if (key in this.storage) {
            delete this.storage[key]
            this.saveToLS()
            return true
        }
        return false
    }

    this.getKeys = function() {
        return Object.keys(this.storage)
    }

    this.loadFromLS = function() {
        this.storage={}
        if (localStorage[keyName]) {
            try {
                this.storage = JSON.parse(localStorage[keyName])
            }
            catch (er) {
                alert("Ошибка! Начало с пустого хранилища")
            }
        }
        
    }

    this.saveToLS = function() {
        localStorage[keyName] = JSON.stringify(this.storage)
    }

        this.loadFromLS()
}


const drinkStorage = new LocStorage("drinks")
const mealStorage = new LocStorage("meals")

function saveDrink() {
    let name = prompt("Название напитка")
    let alco = confirm("Алкогольный - ОК, безалкогольный - Отмена")
    let recipe = prompt("Рецепт приготовления")
    drinkStorage.addValue(name, {a:alco, r:recipe})
}

function getDrink() {
    let name = prompt("Название напитка")
    let drink = drinkStorage.getValue(name)
    if (drink) {
       alert(`Напиток ${name}
        ${drink.a==true? "Содержит алкоголь": "Безалкогольный"}
        Рецепт приготовления: 
        ${drink.r}`)
    } else alert("Отсутствует такой напиток")
}

function deleteDrink() {
    let name = prompt("Какой напиток удалить?")
    if (drinkStorage.deleteValue(name)) {
        alert(`Удалён напиток ${name}`)
    } else alert("Нет такого напитка")
}

function getAllDrinks() {
    let allDrinks = drinkStorage.getKeys()
    if (allDrinks.length == 0) {
        alert("Нет сохранённых напитков")
    } else {
        alert("Сохранённые напитки:\n" + allDrinks.join("\n"))
    } 
}




function saveMeal() {
    let name = prompt("Название блюда")
    let recipe = prompt("Рецепт приготовления")
    mealStorage.addValue(name, recipe) 
}

function getMeal() {
    let name = prompt("Название блюда")
    let meal = mealStorage.getValue(name)
    if (meal) {
       alert(`Блюдо ${name}
        Рецепт приготовления: 
        ${meal}`)
    } else alert("Отсутствует такое блюдо")
}

function deleteMeal() {
    let name = prompt("Какое блюдо удалить?")
    if (mealStorage.deleteValue(name)) {
        alert(`Удалено блюдо ${name}`)
    } else alert("Нет такого блюда")
}

function getAllMeals() {
    let allMeals = mealStorage.getKeys()
    if (allMeals.length == 0) {
        alert("Нет сохранённых блюд")
    } else {
        alert("Сохранённые блюда:\n" + allMeals.join("\n"))
    } 
}