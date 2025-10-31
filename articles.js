// Load auth if not loaded (optional for posting only)
if (typeof auth === 'undefined' && typeof AuthBackend !== 'undefined') {
    const auth = new AuthBackend();
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
    },
    {
        id: 4,
        title: "Mycorrhizal Fungi: The Hidden Heroes of Soil",
        author: "Dr. James Peterson",
        date: "2024-01-20",
        content: "Mycorrhizal fungi form symbiotic relationships with plant roots, creating an underground network that benefits both organisms. These fungi extend far beyond the root zone, effectively increasing the plant's absorptive surface area by up to 1000 times. In exchange for sugars from the plant, mycorrhizae provide enhanced water and nutrient uptake, particularly phosphorus, nitrogen, and micronutrients. They also improve soil structure by producing glomalin, a sticky protein that binds soil particles together. Studies show that plants with mycorrhizal associations are more drought-resistant, disease-resistant, and produce higher yields. To encourage these beneficial fungi, minimize soil disturbance, reduce chemical fertilizer use, and maintain diverse plant communities.",
        excerpt: "Mycorrhizal fungi form symbiotic relationships with plant roots, creating an underground network..."
    },
    {
        id: 5,
        title: "Cover Cropping: Building Soil Health Between Seasons",
        author: "Maria Santos",
        date: "2024-01-18",
        content: "Cover crops are plants grown primarily to benefit the soil rather than for harvest. They protect bare soil from erosion, suppress weeds, and add organic matter when incorporated. Legume cover crops like clover and vetch fix atmospheric nitrogen, reducing fertilizer needs for subsequent crops. Grasses like rye and oats have extensive root systems that prevent erosion and improve soil structure. Brassicas such as radishes can break up compacted soil layers with their deep taproots. The key to successful cover cropping is selecting the right species for your climate, soil type, and rotation schedule. Plant cover crops immediately after harvest, allow them to grow through fall and winter, then terminate them 2-3 weeks before planting your main crop.",
        excerpt: "Cover crops are plants grown primarily to benefit the soil rather than for harvest..."
    },
    {
        id: 6,
        title: "Soil Erosion: Prevention and Restoration Strategies",
        author: "Dr. Robert Williams",
        date: "2024-01-12",
        content: "Soil erosion is the loss of topsoil due to wind, water, or tillage, and it's one of the most serious threats to agricultural productivity. In the United States alone, erosion removes approximately 1.7 billion tons of topsoil annually. Prevention strategies include maintaining vegetative cover, using contour plowing on slopes, establishing terraces, and implementing no-till or reduced-till farming. Windbreaks and shelterbelts protect against wind erosion, while grassed waterways and buffer strips prevent water erosion. For already eroded land, restoration involves adding organic matter, planting deep-rooted perennials, and using erosion control fabrics. Remember that it takes nature 500-1000 years to form one inch of topsoil, but erosion can remove it in just a few years of poor management.",
        excerpt: "Soil erosion is the loss of topsoil due to wind, water, or tillage..."
    },
    {
        id: 7,
        title: "The Carbon Cycle: Soil's Role in Climate Change",
        author: "Dr. Lisa Anderson",
        date: "2024-01-08",
        content: "Soil is the largest terrestrial carbon reservoir, storing more carbon than the atmosphere and all plant life combined. Through photosynthesis, plants capture atmospheric CO2 and transfer it to soil via roots and decomposing plant material. Soil microorganisms break down this organic matter, releasing some carbon back to the atmosphere while storing the rest as stable soil organic carbon. Healthy soils with high organic matter content act as carbon sinks, helping mitigate climate change. However, poor land management practices like excessive tillage, overgrazing, and deforestation release stored carbon. Regenerative practices such as no-till farming, cover cropping, and rotational grazing can increase soil carbon sequestration by 0.5-1 ton per acre annually, making agriculture part of the climate solution.",
        excerpt: "Soil is the largest terrestrial carbon reservoir, storing more carbon than the atmosphere..."
    },
    {
        id: 8,
        title: "Soil Microbiomes: The Invisible Workforce",
        author: "Prof. David Kumar",
        date: "2024-01-03",
        content: "A single teaspoon of healthy soil contains more microorganisms than there are people on Earth - billions of bacteria, fungi, protozoa, and nematodes working together in complex food webs. These microorganisms perform essential functions: decomposing organic matter, cycling nutrients, suppressing diseases, and improving soil structure. Bacteria and fungi break down complex organic compounds into plant-available nutrients. Protozoa and nematodes feed on bacteria, releasing nitrogen in forms plants can use. This microbial activity is influenced by soil pH, moisture, temperature, and organic matter content. To support a healthy soil microbiome, add compost regularly, minimize chemical inputs, maintain diverse crop rotations, and keep soil covered with living plants or mulch as much as possible.",
        excerpt: "A single teaspoon of healthy soil contains more microorganisms than there are people on Earth..."
    },
    {
        id: 9,
        title: "No-Till Farming: Revolutionizing Modern Agriculture",
        author: "John Mitchell",
        date: "2024-01-01",
        content: "No-till farming is an agricultural practice that grows crops without disturbing the soil through tillage. Instead of plowing, farmers plant directly into the residue of previous crops using specialized equipment. This practice offers numerous benefits: it reduces erosion by up to 90%, improves water infiltration, increases soil organic matter, enhances biodiversity, and reduces fuel and labor costs. No-till systems also sequester more carbon, helping combat climate change. The transition to no-till requires patience, as soil biology needs 3-5 years to fully adapt. Initial challenges may include increased weed pressure and the need for different equipment. However, long-term benefits include improved soil health, higher water-holding capacity, and often increased yields. Many farmers combine no-till with cover crops and diverse rotations for maximum benefit.",
        excerpt: "No-till farming is an agricultural practice that grows crops without disturbing the soil..."
    }
];



function openPostArticle() {
    if (typeof auth !== 'undefined') {
        const user = auth.getCurrentUser();
        if (!user) {
            alert('Please login to post an article');
            window.location.href = 'login.html';
            return;
        }
    } else {
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
