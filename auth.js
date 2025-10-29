// Authentication Backend Simulation
class AuthBackend {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('ws_users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('ws_currentUser')) || null;
    }

    register(userData) {
        if (this.users.find(u => u.email === userData.email)) {
            return { success: false, message: 'Email already registered' };
        }
        
        const user = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            mobile: userData.mobile,
            password: this.hashPassword(userData.password),
            createdAt: new Date().toISOString()
        };
        
        this.users.push(user);
        localStorage.setItem('ws_users', JSON.stringify(this.users));
        return { success: true, message: 'Registration successful' };
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email);
        
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        
        if (user.password !== this.hashPassword(password)) {
            return { success: false, message: 'Invalid password' };
        }
        
        const userSession = {
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile
        };
        
        this.currentUser = userSession;
        localStorage.setItem('ws_currentUser', JSON.stringify(userSession));
        return { success: true, message: 'Login successful', user: userSession };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('ws_currentUser');
        return { success: true, message: 'Logged out successfully' };
    }

    getCurrentUser() {
        return this.currentUser;
    }

    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }
}

const auth = new AuthBackend();

function showLoginSection() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('registerSection').style.display = 'none';
}

function showRegisterSection() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const result = auth.login(email, password);
    
    if (result.success) {
        alert(result.message + '! Welcome ' + result.user.name);
        window.location.href = 'index.html';
    } else {
        alert(result.message);
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const mobile = document.getElementById('regMobile').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (!name || !email || !mobile || !password || !confirmPassword) {
        alert('Please fill all fields');
        return;
    }
    
    if (mobile.length !== 10 || !/^[0-9]{10}$/.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    const result = auth.register({ name, email, mobile, password });
    
    if (result.success) {
        alert(result.message + '! Your account has been created. Please login with your credentials.');
        showLoginSection();
        document.getElementById('registerForm').reset();
    } else {
        alert(result.message);
    }
}

function handleLogout() {
    const result = auth.logout();
    alert(result.message);
    updateTopBar();
    window.location.href = 'index.html';
}

function updateTopBar() {
    const user = auth.getCurrentUser();
    const welcomeEl = document.getElementById('userWelcome');
    const loginBtn = document.getElementById('topLoginBtn');
    
    if (welcomeEl && loginBtn) {
        if (user) {
            welcomeEl.textContent = 'Welcome, ' + user.name;
            loginBtn.textContent = 'Logout';
            loginBtn.onclick = handleLogout;
            loginBtn.href = '#';
        } else {
            welcomeEl.textContent = '';
            loginBtn.textContent = 'Login / Register';
            loginBtn.onclick = null;
            loginBtn.href = 'login.html';
        }
    }
}

function checkAuth() {
    const user = auth.getCurrentUser();
    if (!user) {
        alert('Please login to access this feature');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

if (document.getElementById('userWelcome')) {
    updateTopBar();
}
