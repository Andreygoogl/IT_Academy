const form = document.forms.Valid
let firstError = null
form.addEventListener("submit",validateFuncSubmit)
form.addEventListener("blur", validateFuncBlurChange, true)
form.addEventListener("change", validateFuncBlurChange, true)
function validateFuncSubmit(event) {
    event = event || window.event
    firstError = null
    try {
        const credits = form.elements.creditsSite
        const creditsValue = credits.value
        const creditsDiv = document.querySelector(".creditsErr")

        const name = form.elements.nameSite
        const nameValue = name.value
        const nameDiv = document.querySelector(".nameErr")

        const url = form.elements.urlSite
        const urlValue = url.value
        const urlDiv = document.querySelector(".urlErr")

        const date = form.elements.dateSite
        const dateValue = date.value
        const dateDiv = document.querySelector(".dateErr")

        const users = form.elements.usersSite
        const usersValue = parseInt(users.value)
        const usersDiv = document.querySelector(".numberErr")

        const mail = form.elements.emailSite
        const mailValue = mail.value 
        const mailDiv = document.querySelector(".mailErr")

        const comms = form.elements.comms
        const commsValue = comms.checked
        const commsDiv = document.querySelector(".commsErr")

        const catalogue = form.elements.catalogueSite
        const catalogueValue = catalogue.value
        const catalogueDiv = document.querySelector(".catalogueErr")

        const price = document.querySelectorAll("input[name='price']")
        let priceValue = null
        price.forEach(radio => {
            if (radio.checked) priceValue = radio.value
        })
        const priceDiv = document.querySelector(".radioErr")

        const descrip = form.elements.description
        const descripValue = descrip.value
        const descripDiv = document.querySelector(".descriptionErr")

        if (creditsValue.length > 30 || !creditsValue) {
            creditsDiv.style.display = "inline-block"
            credits.focus()
            event.preventDefault()
            if (!firstError) firstError = credits
        } else creditsDiv.style.display = "none"
        if (nameValue.length > 30 || !nameValue) {
            nameDiv.style.display = "inline-block"
            name.focus()
            event.preventDefault()
            if (!firstError) firstError = name
        } else nameDiv.style.display = "none"
        if (!urlValue) {
            urlDiv.style.display = "inline-block"
            url.focus()
            event.preventDefault()
            if (!firstError) firstError = url
        } else urlDiv.style.display = "none"
        if (!dateValue) {
            dateDiv.style.display = "inline-block"
            date.focus()
            event.preventDefault()
            if (!firstError) firstError = date
        } else dateDiv.style.display = "none"
        if (!usersValue) {
            usersDiv.style.display = "inline-block"
            users.focus()
            event.preventDefault()
            if (!firstError) firstError = users
        } else usersDiv.style.display = "none"
        if (!mailValue) {
            mailDiv.style.display = "inline-block"
            mail.focus()
            event.preventDefault()
            if (!firstError) firstError = mail
        } else mailDiv.style.display = "none"
        if (!catalogueValue || catalogueValue == "appliances") {
            catalogueDiv.style.display = "inline-block"
            mail.focus()
            event.preventDefault()
            if (!firstError) firstError = catalogue
        } else catalogueDiv.style.display = "none"
        if (!commsValue) {
            commsDiv.style.display = "inline-block"
            comms.focus()
            event.preventDefault()
            if (!firstError) firstError = comms
        } else commsDiv.style.display = "none"
        if (!priceValue) { 
            priceDiv.style.display = "inline-block"
            event.preventDefault()
            if (!firstError) firstError = price
        } else priceDiv.style.display = "none"
        if (!descripValue) {
            descripDiv.style.display = "inline-block"
            event.preventDefault()
            if (!firstError) firstError = descrip
        } else descripDiv.style.display = "none"
        if (firstError) {
            firstError.focus()
        }
    }
        catch ( ex ) {
            console.log(ex);
            alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
            event.preventDefault(); 
        }
}
function validateFuncBlurChange(event) {
    event = event || window.event
    try {
        switch (event.target.name) {
            case "creditsSite":
                const creditsValue = event.target.value.trim()
                const creditsDiv = document.querySelector(".creditsErr")
                if (!creditsValue || creditsValue.length > 30) {
                    creditsDiv.style.display = "inline-block";
                } else creditsDiv.style.display = "none"
                break;
            case "nameSite":
                const nameValue = event.target.value.trim()
                const nameDiv = document.querySelector(".nameErr")
                if (!nameValue || nameValue.length > 30) {
                    nameDiv.style.display = "inline-block"
                } else nameDiv.style.display = "none"
                break;
            case "urlSite":
                const urlValue = event.target.value.trim()
                const urlDiv = document.querySelector(".urlErr")
                if (!urlValue) {
                    urlDiv.style.display = "inline-block"
                } else urlDiv.style.display = "none"
                break;
            case "dateSite":
                const dateValue = event.target.value.trim()
                const dateDiv = document.querySelector(".dateErr")
                if (!dateValue || dateValue < "2000-01-01") {
                    dateDiv.style.display = "inline-block"
                } else dateDiv.style.display = "none"
                break;
            case "usersSite":
                const usersValue = event.target.value.trim()
                const usersDiv = document.querySelector(".numberErr")
                if (!usersValue || usersValue <= 0) {
                    usersDiv.style.display = "inline-block"
                } else usersDiv.style.display = "none"
                break;
            case "emailSite":
                const mailValue = event.target.value.trim()
                const mailDiv = document.querySelector(".mailErr")
                if (!mailValue) {
                    mailDiv.style.display = "inline-block"
                } else mailDiv.style.display = "none"
                break;
            case "catalogueSite":
                const catalogueValue = event.target.value
                const catalogueDiv = document.querySelector(".catalogueErr")
                if (!catalogueValue || catalogueValue == "appliances") {
                    catalogueDiv.style.display = "inline-block"
                } else catalogueDiv.style.display = "none"
                break;
            case "price":
                const price = document.querySelectorAll("input[name='price']")
                let priceValue = null
                price.forEach(radio => {
                    if (radio.checked) priceValue = radio.value
                })
                const priceDiv = document.querySelector(".radioErr")
                if (!priceValue) {
                    priceDiv.style.display = "inline-block"
                } else priceDiv.style.display = "none"
                break;
            case "comms":
                const commsValue = event.target.checked
                const commsDiv = document.querySelector(".commsErr")
                if (!commsValue) {
                    commsDiv.style.display = "inline-block"
                } else commsDiv.style.display = "none"
                break;
            case "description":
                const descripValue = event.target.value.trim()
                const descripDiv = document.querySelector(".descriptionErr")
                if (!descripValue || descripValue.length > 100) {
                    descripDiv.style.display = "inline-block"
                } else descripDiv.style.display = "none"
                break;
        }
    }
    catch ( ex ) {
            console.log(ex);
            alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
            event.preventDefault(); 
        }
}