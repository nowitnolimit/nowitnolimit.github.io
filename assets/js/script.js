const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
let currentIndex = 0;

function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach(slide => slide.classList.remove('active'));
    if (index >= slides.length){
        currentIndex = 0;
    }
    else if (index < 0){
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    slides[currentIndex].classList.add('active');
}

if (nextBtn && prevBtn && slides.length > 0) {
    nextBtn.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    showSlide(currentIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('wb_logged_in') === 'true';
    const userName = localStorage.getItem('wb_user_name') || 'Kolektif';
    const authButtons = document.getElementById('auth-buttons');
    
    if (isLoggedIn && authButtons) {
        authButtons.innerHTML = `
            <div class="user-profile-menu">
                <button class="btn btn-secondary" id="user-menu-btn" style="border: 2px solid var(--wb-green); display: inline-flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-user"></i>
                    <span id="user-display-name">${userName}</span>
                </button>
                <ul class="user-dropdown" id="user-dropdown-menu">
                    <li><a href="dashboard.html" class="user-dropdown-link">Dashboard</a></li>
                    <li><a href="#" class="user-dropdown-link" id="btn-logout">Logout</a></li>
                </ul>
            </div>
            <a href="order.html" class="btn btn-primary" id="btn-order-online">Order Online</a>
        `;
        
        const menuBtn = document.getElementById('user-menu-btn');
        const dropdown = document.getElementById('user-dropdown-menu');
        const logoutBtn = document.getElementById('btn-logout');
        
        if (menuBtn && dropdown) {
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });
            
            document.addEventListener('click', () => {
                dropdown.classList.remove('active');
            });
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('wb_logged_in');
                localStorage.removeItem('wb_user_name');
                window.location.href = 'index.html';
            });
        }
    }
    
    updateCartBadge();
});

function updateCartBadge() {
    const orderOnlineBtn = document.getElementById('btn-order-online') || document.querySelector('.nav-buttons .btn-primary');
    if (!orderOnlineBtn) return;
    
    const cartStr = localStorage.getItem('wb_cart');
    let cart = [];
    try {
        if (cartStr) cart = JSON.parse(cartStr);
    } catch(e) {}
    
    let totalQty = 0;
    cart.forEach(item => {
        totalQty += parseInt(item.quantity) || 0;
    });
    
    const existingBadge = orderOnlineBtn.querySelector('.cart-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    if (totalQty > 0) {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = totalQty;
        orderOnlineBtn.appendChild(badge);
    }
}