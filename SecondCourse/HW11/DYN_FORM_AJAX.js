const getForm = form => {
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
    document.body.appendChild(formDOM)
    return formDOM
}

$.ajax("https://fe.it-academy.by/Examples/dyn_form_ajax/formDef1.json", {type:"GET", 
    dataType:"json", 
    success: function(data) {
        getForm(data)
        $.ajax("https://fe.it-academy.by/Examples/dyn_form_ajax/formDef2.json", {type:"GET", 
        dataType:"json", 
        success: getForm, 
        error: errorHandler})
    }, 
    error: errorHandler})



function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}




