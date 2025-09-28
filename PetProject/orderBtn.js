let orderBtn = document.querySelector('.orderBtn')
let orderMenu = document.querySelector('.order')
orderBtn.onclick = function() {
    orderMenu.classList.add('active');
}
orderMenu.onclick = function(event) {
    if (event.target == orderMenu) orderMenu.classList.remove('active')
}