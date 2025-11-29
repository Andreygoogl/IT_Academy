let books = [
    {
        title: "Война и мир",
        author: "Лев Толстой",
        isRussianAuthor: true,
        isModernLiterature: false,
        genre: 1,
        year: '1863 - 1869',
        ratings: [
            { userId: 1, rating: 4 },
            { userId: 2, rating: 4 },
            { userId: 3, rating: 4 },
            { userId: 4, rating: 5 }
        ],
    },
    {
        title: "Ночной дозор",
        author: "Сергей Лукьяненко",
        isRussianAuthor: true,
        isModernLiterature: true,
        genre: 3,
        year: '1998',
        ratings: [
            { userId: 1, rating: 4 },
            { userId: 2, rating: 5 },
            { userId: 3, rating: 3 },
            { userId: 4, rating: 5 }
        ],
    },
    {
        title: "Гарри Поттер",
        author: "Дж. К. Роулинг",
        isRussianAuthor: false,
        isModernLiterature: true,
        genre: 3,
        year: '1997 - 2007',
        ratings: [
            { userId: 1, rating: 4 },
            { userId: 2, rating: 5 },
            { userId: 3, rating: 4 },
            { userId: 4, rating: 4 },
            { userId: 5, rating: 5 },
            { userId: 6, rating: 5 },
            { userId: 7, rating: 5 }
        ],
    },
    {
        title: "Шерлок Холмс",
        author: "Артур Конан Дойл",
        isRussianAuthor: false,
        isModernLiterature: false,
        genre: 2,
        year: '1887',
        ratings: [
            { userId: 1, rating: 4 },
            { userId: 2, rating: 5 },
            { userId: 3, rating: 3 },
            { userId: 4, rating: 5 }
        ],
    },
    {
        title: "Девушка в поезде",
        author: "Пола Хокинс",
        isRussianAuthor: true,
        isModernLiterature: true,
        genre: 2,
        year: '2015',
        ratings: [
            { userId: 1, rating: 4 },
            { userId: 2, rating: 5 },
            { userId: 3, rating: 3 },
            { userId: 4, rating: 5 },
            { userId: 5, rating: 2 }
        ],
    },
]
let btn = document.querySelector('.button')
btn.onclick = searchBook = () => {
    document.querySelector('.result').innerHTML = "";
    let genre = document.getElementById('genre').value
    let modern = document.querySelector('.modern')
    let rus = document.querySelector('.russian')
    let result = document.querySelector('.result')
    let found = false;
    for (let i = 0; i < books.length; i++)
    {
        let book = books[i];
        let coincidence = 0;
        if (book.genre == genre) coincidence++;
        if (book.isModernLiterature == modern.checked) coincidence++;
        if (book.isRussianAuthor == rus.checked) coincidence++;
        if (coincidence == 3) {
            result.innerHTML = `Вам подойдёт ${book.title}`;
            found = true; 
            break; 
        } 
    }
    if (!found) result.innerHTML = "Ничего не найдено";
}