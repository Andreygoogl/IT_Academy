const getForm = (form) => {
    const formDOM = document.createElement("form")
    for (let i = 0;i < form.length;i++) {
        const divContainer = document.createElement("div")
        const br = document.createElement("br")
        if (form[i].kind != "submit") {
            const label = document.createElement("label")
            label.textContent = form[i].label
            label.style.display = "inline-block"
            label.style.width = "150px"
            divContainer.appendChild(label)
        }
        switch(form[i].kind) {
            case "longtext":
            case "shorttext":
                const inputText = document.createElement("input")
                inputText.type = "text"
                inputText.name = form[i].name
                divContainer.appendChild(inputText)
                break;
            case "number":
                const inputNumber = document.createElement("input")
                inputNumber.type = "number"
                inputNumber.name = form[i].name
                divContainer.appendChild(inputNumber)
                break
            case "dropdown":
                const select = document.createElement("select")
                select.name = form[i].name
                for (let j = 0;j<form[i].variants.length;j++)
                    {
                        const option = document.createElement("option")
                        option.textContent = form[i].variants[j].text
                        option.value = form[i].variants[j].value
                        select.appendChild(option)
                    }
                divContainer.appendChild(select)
                break;
            case "check":
                const inputCheck = document.createElement("input")
                inputCheck.type = "checkbox"
                inputCheck.name = form[i].name
                divContainer.appendChild(inputCheck)
                break;
            case "radio":
                for (let j = 0;j < form[i].variants.length;j++) {
                    const inputRadio = document.createElement("input")
                    inputRadio.type = "radio"
                    inputRadio.name = form[i].name
                    const labelRadio = document.createElement("label")
                    labelRadio.textContent = form[i].variants[j].text
                    inputRadio.value = form[i].variants[j].value
                    divContainer.appendChild(inputRadio)
                    divContainer.appendChild(labelRadio)
                }
                break;
            case "memo":
                const textArea = document.createElement("textarea")
                textArea.name = form[i].name
                divContainer.appendChild(br)
                divContainer.appendChild(textArea)
                break;
            case "submit":
                const button = document.createElement("button")
                button.type = "submit"
                button.textContent = form[i].caption
                divContainer.appendChild(button)
                break;
            }
            formDOM.appendChild(divContainer)
    }
    const hrLine = document.createElement("hr")
    document.body.appendChild(hrLine)
    return formDOM
}

const formDef1=
[
{label:'Название сайта:',kind:'longtext',name:'sitename'},
{label:'URL сайта:',kind:'longtext',name:'siteurl'},
{label:'Посетителей в сутки:',kind:'number',name:'visitors'},
{label:'E-mail для связи:',kind:'shorttext',name:'email'},
{label:'Рубрика каталога:',kind:'dropdown',name:'division',
variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
{label:'Размещение:',kind:'radio',name:'payment',
variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
{label:'Разрешить отзывы:',kind:'check',name:'votes'},
{label:'Описание сайта:',kind:'memo',name:'description'},
{caption:'Опубликовать',kind:'submit'},
];
const formDef2=
[
{label:'Фамилия:',kind:'longtext',name:'lastname'},
{label:'Имя:',kind:'longtext',name:'firstname'},
{label:'Отчество:',kind:'longtext',name:'secondname'},
{label:'Возраст:',kind:'number',name:'age'},
{caption:'Зарегистрироваться',kind:'submit'},
];
document.body.appendChild(getForm(formDef1))
document.body.appendChild(getForm(formDef2))


