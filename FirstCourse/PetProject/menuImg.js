let images = document.querySelectorAll('.menuImg img')
let cards = document.querySelectorAll('.dishCard')
for (let image of images) {
    image.addEventListener('click', function(event) {
        let id = this.parentElement.dataset.id
        for (let i = 0; i < cards.length; i++) {
            if (i == id) {
                images[i].classList.toggle('active')
                cards[i].classList.toggle('active')
            } else {
                images[i].classList.remove('active')
                cards[i].classList.remove('active')
            }
        }
    })
}