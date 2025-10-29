// This file documents the updates needed for all pages
// All pages need:
// 1. Top bar with login
// 2. Whispering Soil branding
// 3. Auth.js script inclusion

const topBarHTML = `    <div class="top-bar">
        <div class="container">
            <div class="top-bar-content">
                <span id="userWelcome"></span>
                <a href="login.html" class="top-login-btn" id="topLoginBtn">Login / Register</a>
            </div>
        </div>
    </div>`;

const brandingUpdate = {
    old: 'Soil Science Hub',
    new: 'Whispering Soil'
};

const scriptAddition = '<script src="auth.js"></script>';

// Pages to update:
// - soil-types.html
// - soil-composition.html  
// - soil-health.html
// - agriculture.html
// - conservation.html
// - resources.html
// - article-detail.html
