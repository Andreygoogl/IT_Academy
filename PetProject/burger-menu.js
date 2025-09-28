let menuBtn = document.querySelector('.menuBtn')
let mobileMenu = document.querySelector('.mobileMenu')
let crossBtn = document.querySelector('.cross')
menuBtn.onclick = function() {
    mobileMenu.classList.add('open')
}
crossBtn.onclick = function(event) {
    mobileMenu.classList.remove('open')
}