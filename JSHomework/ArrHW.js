"use strict"
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
const getBookInfo = (book) => {
    return alert(`Название: ${book.title}\nАвтор: ${book.author}\nГод: ${book.year}`);
}
const addRating = (book, userId, rating) => {
    book.ratings[book.ratings.length] = {userId, rating};
    console.log(book)
}
const getAverageRating = (book) => {
    let sum = 0;
    let i = 0;
    for (let key of book.ratings) {
        sum += key.rating;  
        i++; 
    }
    return sum / i; 
}
getBookInfo(books[0]);
addRating(books[0], 5, 5);
console.log(getAverageRating(books[0]))
const searchBook = () => {
let genre;
let modern;
let rus;

do {
    genre = +prompt("Какой жанр предпочитаете?\n1 - Роман\n2 - Детектив\n3 - Фэнтези")
} while (genre > 3 || genre < 1 || isNaN(genre))
modern = confirm("Предпочитаете современную литературу?")
rus = confirm("Хотели бы книгу русского автора?")
let found = false;
for (let i = 0; i < books.length; i++)
{
    let book = books[i];
    let coincidence = 0;
    if (book.genre == genre) coincidence++;
    if (book.isModernLiterature == modern) coincidence++;
    if (book.isRussianAuthor == rus) coincidence++;
    if (coincidence == 3) {
        alert(`Вам подойдет ${book.title}`);
        found = true; 
        break; 
    } 
}
if (!found) alert("Ничего не подошло")
}
searchBook();
