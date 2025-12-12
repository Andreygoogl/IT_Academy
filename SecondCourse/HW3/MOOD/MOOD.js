function randomDiap(n,m) {
    return Math.floor(Math.random()*(m-n+1))+n;
}

let usedColors = {}
function mood(colorsCount) {
    const colors=["",'красный','оранжевый','жёлтый','зеленый','голубой', 'синий', 'фиолетовый'];
    console.log('цветов: ' + colorsCount);
    for (let i = 1;i<=colorsCount;i++) {
        do {
            var n=randomDiap(1,7);
            var colorName=colors[n];
            if (!usedColors[colorName]) {
                usedColors[colorName] = true;
                break;
            }
        } while (true)
        
    
        console.log( colorName );
    }
}
mood(3)