var movies = JSON.parse(localStorage.getItem('movies')) || [];
var nextId = 1; 

$(document).ready(function() {
  
    // Add a movie
    function addMovie(movie) {
      movie.id = nextId++;

      var genreHTML = '';
      
      if (Array.isArray(movie.genres)) {
        movie.genres.forEach(function(genre) {
          genreHTML += `<span class="badge bg-secondary">${genre}</span> `;
        });
      } else {
        console.error('Genres not found or not an array:', movie);
      }

      var movieCard = `
        <div class="col-md-3 mb-4 movie-card">
          <div class="card">
            <div class="card-overlay"></div>
            <img src="${movie.imageUrl}" class="card-img-top" alt="...">
            <div class="movie-info-top">
              <button type="button" class="btn btn-danger delete-btn" data-movieid="${movie.id}">X</button>
              <p class="movie-year">${movie.year}</p>
            </div>
            <div class="movie-info-bottom">
              <h5 class="movie-title">${movie.title}</h5>
              <p class="movie-categories">${genreHTML}</p>
            </div>
          </div>
        </div>
      `;
      $('#moviesList').append(movieCard);
    }
  
    // Form for adding a movie
    $('#addMovieForm').submit(function(event) {
      event.preventDefault();
      var imageUrl = $('#imageUrl').val();
      var title = $('#title').val();
      var year = $('#year').val();
      var description = $('#description').val();
      var genres = $('#genres').val();
  
      // Validate title
      if (title.length > 250) {
        alert('Title should be maximum 250 characters.');
        return;
      }
  
      // Validate year
      if (!/^\d{4}$/.test(year)) {
        alert('Please enter a valid year.');
        return;
      }
  
      // Validate description
      if (description.length > 500) {
        alert('Description should be maximum 500 characters.');
        return;
      }
  
      // Add movie data
      var movie = {
        imageUrl: imageUrl,
        title: title,
        year: year,
        description: description,
        genres: genres
      };
      movies.push(movie);
  
      addMovie(movie);

      saveMovies();
  
      // Close and reset form
      $('#addMovieModal').modal('hide');
      $('#addMovieForm')[0].reset();

    });

    movies.forEach(function(movie) {
      addMovie(movie);
    });

    // Category chooser
    $(document).on('click', '.filter-btn', function() {
      var selectedGenre = $(this).data('genre');
      $('.filter-btn').removeClass('active');
      $(this).addClass('active');
      if (selectedGenre === 'all') {
        $('#moviesList .movie-card').show();
      } else {
        $('#moviesList .movie-card').hide();
        $('#moviesList .movie-card').each(function() {
          if ($(this).find('.movie-categories').text().includes(selectedGenre)) {
            $(this).show();
          }
        });
      }
    });
});
  
// Delete button
$(document).on('click', '.delete-btn', function() {
  var movieId = $(this).data('movieid');

  movies = movies.filter(function(movie) {
    return movie.id !== movieId;
  });

  $(this).closest('.movie-card').remove();

  saveMovies();
});

// Save movies to local storage
function saveMovies() {
  localStorage.setItem('movies', JSON.stringify(movies));
}

// Movie details
$(document).on('click', '.movie-card', function() {
  var movieId = $(this).find('.delete-btn').data('movieid');
  var movie = movies.find(function(movie) {
    return movie.id === movieId;
  });

  $('#movieDetailsModal .modal-body').html(`
    <img src="${movie.imageUrl}" class="img-fluid" alt="Movie Image">
    <h5>${movie.title}</h5>
    <p>Year: ${movie.year}</p>
    <p>Description: ${movie.description}</p>
    <p>Genres: ${movie.genres.join(', ')}</p>
  `);

  $('#movieDetailsModal').modal('show');
});
