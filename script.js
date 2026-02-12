// Seletores
const addMovieBtn = document.getElementById('addMovieBtn');
const library = document.getElementById('library');

// Array para armazenar os filmes (carrega do localStorage se já existir)
let movies = JSON.parse(localStorage.getItem('myCineLog')) || [];

// Função para salvar no localStorage
function saveToLocalStorage() {
    localStorage.setItem('myCineLog', JSON.stringify(movies));
}

// Função para renderizar os filmes na tela
function renderMovies() {
    library.innerHTML = ''; // Limpa a tela
    movies.forEach((movie, index) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        
        // Gera as pipocas baseadas na nota
        const popcornRating = '🍿'.repeat(movie.rating) + '⚪'.repeat(5 - movie.rating);

        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Status: ${movie.status}</p>
            <p>T${movie.season} - E${movie.episode}</p>
            <div class="rating">${popcornRating}</div>
            <p><em>"${movie.comment}"</em></p>
            <button class="delete-btn" onclick="deleteMovie(${index})">Excluir</button>
        `;
        library.appendChild(movieCard);
    });
}

// Função para adicionar um filme (simples via prompt para começar)
addMovieBtn.addEventListener('click', () => {
    const title = prompt('Nome do Filme/Série:');
    if (!title) return;
    
    const movie = {
        title: title,
        poster: 'https://via.placeholder.com/150', // Imagem padrão
        status: 'Assistindo',
        season: 1,
        episode: 1,
        rating: 5,
        comment: 'Muito bom!'
    };
    
    movies.push(movie);
    saveToLocalStorage();
    renderMovies();
});

// Função para excluir
function deleteMovie(index) {
    if (confirm('Tem certeza que deseja excluir?')) {
        movies.splice(index, 1);
        saveToLocalStorage();
        renderMovies();
    }
}

// Inicializa a página
renderMovies();
