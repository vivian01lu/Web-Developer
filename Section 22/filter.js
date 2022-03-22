const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

numbers.filter(
    n => {
        return n < 4
    }
)

const movies = [
    {
        title: 'Amadeus',
        score: 99
    },
    {
        title: 'Stand By me',
        score: 85
    },
    {
        title: 'Alien',
        score: 95
    }
]

const goodMovies = movies.filter(movie => {
    return movie.score > 80
})

const goodTitles = goodMovies.map(m => m.title)

movies.filter(m => m.score > 80).map(m => m.score < 70)