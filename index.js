
        document.addEventListener('DOMContentLoaded', function () {
            const apiKey = 'd92bf7ffcb8144cd8829f5d46435f6ea';
            const everythingUrl = 'https://newsapi.org/v2/everything?q=apple&from=2023-11-09&to=2023-11-09&sortBy=popularity&apiKey=' + apiKey;
            const topHeadlinesUrlTechCrunch = 'https://newsapi.org/v2/everything?q=tesla&from=2023-10-10&sortBy=publishedAt&apiKey=' + apiKey;
            const topHeadlinesUrlBusiness = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + apiKey;
            const newsContainer = document.getElementById('news-container');

            function fetchNews(apiUrl) {
                // Clear previous news
                newsContainer.innerHTML = '';

                // Fetch news data from the API
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.articles) {
                            data.articles.forEach(article => {
                                const title = article.title;
                                const description = article.description;
                                const url = article.url;
                                const imageUrl = article.urlToImage;
                                const publishedAt = new Date(article.publishedAt).toLocaleString();

                                const articleElement = document.createElement('div');
                                articleElement.classList.add('article');
                                articleElement.innerHTML = `
                                    <h2>${title}</h2>
                                    <p>${description}</p>
                                    <p>Published At: ${publishedAt}</p>
                                    <a href="${url}" target="_blank">Read more</a>
                                    <img src="${imageUrl}" alt="${title}">
                                    
                                `;
                                newsContainer.appendChild(articleElement);
                            });
                        } else {
                            newsContainer.innerHTML = '<p>Error loading news</p>';
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching news:', error);
                        newsContainer.innerHTML = '<p>Error loading news</p>';
                    });
            }

            // Fetch news on page load (you can change this to fit your needs)
            fetchNews(topHeadlinesUrlBusiness);

            // Add event listeners for navigation links
            document.getElementById('everything-link').addEventListener('click', function (event) {
                event.preventDefault();
                fetchNews(everythingUrl);
            });

            document.getElementById('techcrunch-link').addEventListener('click', function (event) {
                event.preventDefault();
                fetchNews(topHeadlinesUrlTechCrunch);
            });

            document.getElementById('business-us-link').addEventListener('click', function (event) {
                event.preventDefault();
                fetchNews(topHeadlinesUrlBusiness);
            });
        });
  