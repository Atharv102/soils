// Load auth if not loaded
if (typeof auth === 'undefined') {
    window.location.href = 'login.html';
}
let articles = JSON.parse(localStorage.getItem('articles')) || [
    {
        id: 1,
        title: "Understanding Soil pH and Its Impact on Plant Growth",
        author: "Dr. Sarah Johnson",
        date: "2024-01-15",
        content: "Soil pH is one of the most important factors affecting plant growth and nutrient availability. The pH scale ranges from 0 to 14, with 7 being neutral. Most plants prefer a slightly acidic to neutral pH range of 6.0 to 7.5. When soil pH is too low (acidic) or too high (alkaline), certain nutrients become unavailable to plants, even if they are present in the soil. For example, in highly acidic soils (pH below 5.5), aluminum and manganese can become toxic to plants, while phosphorus availability decreases. In alkaline soils (pH above 7.5), iron, manganese, and zinc become less available. Regular soil testing and appropriate amendments can help maintain optimal pH levels for healthy plant growth.",
        excerpt: "Soil pH is one of the most important factors affecting plant growth and nutrient availability..."
    },
    {
        id: 2,
        title: "The Role of Earthworms in Soil Health",
        author: "Prof. Michael Chen",
        date: "2024-01-10",
        content: "Earthworms are often called 'ecosystem engineers' due to their profound impact on soil structure and fertility. These remarkable creatures consume organic matter and soil, processing it through their digestive systems and excreting nutrient-rich castings. Earthworm castings contain 5 times more nitrogen, 7 times more phosphorus, and 11 times more potassium than the surrounding soil. As earthworms burrow through the soil, they create channels that improve water infiltration and aeration, allowing plant roots to penetrate deeper. A healthy population of earthworms can process 10-20 tons of soil per acre annually. Their presence indicates good soil health and biological activity.",
        excerpt: "Earthworms are often called 'ecosystem engineers' due to their profound impact on soil structure..."
    },
    {
        id: 3,
        title: "Composting: Turning Waste into Black Gold",
        author: "Emma Rodriguez",
        date: "2024-01-05",
        content: "Composting is nature's way of recycling organic materials into a valuable soil amendment. The composting process involves the decomposition of organic matter by microorganisms under controlled conditions. A successful compost pile requires four key ingredients: carbon-rich materials (browns), nitrogen-rich materials (greens), water, and oxygen. The ideal carbon to nitrogen ratio is about 30:1. Browns include dried leaves, straw, and wood chips, while greens include grass clippings, food scraps, and fresh plant material. Proper moisture (like a wrung-out sponge) and regular turning to provide oxygen are essential. In 2-6 months, you'll have finished compost that improves soil structure, water retention, and provides slow-release nutrients to plants.",
        excerpt: "Composting is nature's way of recycling organic materials into a valuable soil amendment..."
    }
];



function openPostArticle() {
    const user = auth.getCurrentUser();
    if (!user) {
        alert('Please login to post an article');
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('postModal').style.display = 'block';
}

function closePostModal() {
    document.getElementById('postModal').style.display = 'none';
}

function submitArticle() {
    const title = document.getElementById('articleTitle').value;
    const author = document.getElementById('articleAuthor').value;
    const content = document.getElementById('articleContent').value;

    if (!title || !author || !content) {
        alert('Please fill all fields');
        return;
    }

    const article = {
        id: Date.now(),
        title,
        author,
        content,
        date: new Date().toISOString().split('T')[0],
        excerpt: content.substring(0, 150) + '...'
    };

    articles.unshift(article);
    localStorage.setItem('articles', JSON.stringify(articles));
    
    alert('Article published successfully!');
    closePostModal();
    displayArticles();
    
    document.getElementById('articleTitle').value = '';
    document.getElementById('articleAuthor').value = '';
    document.getElementById('articleContent').value = '';
}

function displayArticles() {
    const container = document.getElementById('articlesContainer');
    if (!container) return;

    container.innerHTML = articles.map(article => `
        <div class="article-card">
            <h3>${article.title}</h3>
            <p class="article-meta">By ${article.author} | ${article.date}</p>
            <p>${article.excerpt}</p>
            <a href="article-detail.html?id=${article.id}" class="btn btn-secondary">Read More</a>
        </div>
    `).join('');
}

function displayArticleDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get('id'));
    const article = articles.find(a => a.id === articleId);
    
    const container = document.getElementById('articleDetail');
    if (!container || !article) return;

    container.innerHTML = `
        <h1>${article.title}</h1>
        <p class="article-meta" style="color: #666; margin-bottom: 2rem;">By ${article.author} | ${article.date}</p>
        <div style="line-height: 1.8; font-size: 1.1rem;">${article.content}</div>
    `;
}

window.onclick = function(event) {
    const postModal = document.getElementById('postModal');
    if (event.target == postModal) {
        closePostModal();
    }
}

if (window.location.pathname.includes('articles.html')) {
    displayArticles();
}

if (window.location.pathname.includes('article-detail.html')) {
    displayArticleDetail();
}
