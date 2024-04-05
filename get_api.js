const apiUrl = 'https://api.breakingbadquotes.xyz/v1/quotes';

document.getElementById('fetchQuoteBtn').addEventListener('click', function () {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const quote = data[0];
            const quoteContainer = document.getElementById('quoteContainer');
            const quoteHTML = `
          <blockquote class="blockquote">
            <p class="mb-20">${quote.quote}</p>
            <p class="blockquote-footer">${quote.author}</p>
          </blockquote>
        `;
            quoteContainer.innerHTML = quoteHTML;
        })
        .catch(error => console.error('Error:', error));
});
