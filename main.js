const cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.paddingTop = '0';
            header.style.paddingBottom = '0';
            header.style.height = '60px';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.8)';
            header.style.paddingTop = '';
            header.style.paddingBottom = '';
            header.style.height = 'var(--header-height)';
        }
    });

    // Inject Cart Drawer
    const cartDrawerHTML = `
        <div id="cart-drawer" style="position: fixed; top: 0; right: -100%; width: 100%; max-width: 480px; height: 100vh; background: var(--bg-card); z-index: 200; transition: right 0.4s cubic-bezier(0.22, 1, 0.36, 1); border-left: 1px solid var(--border-subtle); display: flex; flex-direction: column;">
            <div style="padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle);">
                <h3 style="font-family: var(--font-serif); margin: 0;">Your Order</h3>
                <button id="close-cart" style="background: none; border: none; color: var(--text-primary); font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            <div id="cart-items" style="padding: 1.5rem; overflow-y: auto; flex: 1;">
                <p style="color: var(--text-secondary); text-align: center; margin-top: 2rem;">Your cart is empty.</p>
            </div>
            <div style="padding: 1.5rem; border-top: 1px solid var(--border-subtle); background: var(--bg-card);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span style="color: var(--text-secondary);">Total</span>
                    <span id="cart-total" style="color: var(--accent); font-weight: 600; font-size: 1.2rem;">₹0</span>
                </div>
                <button class="button-primary" style="width: 100%;">Checkout</button>
            </div>
        </div>
        <div id="cart-overlay" style="position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 150; opacity: 0; pointer-events: none; transition: opacity 0.3s ease;"></div>
    `;
    document.body.insertAdjacentHTML('beforeend', cartDrawerHTML);

    // Bind Cart Events
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const navCartBtn = document.querySelector('.nav-right a'); // Assuming "Cart (0)" button

    function toggleCart() {
        const drawer = document.getElementById('cart-drawer');
        const isOpen = drawer.style.right === '0px';

        drawer.style.right = isOpen ? '-100%' : '0px';
        cartOverlay.style.opacity = isOpen ? '0' : '1';
        cartOverlay.style.pointerEvents = isOpen ? 'none' : 'auto';
    }

    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);
    if (navCartBtn) {
        navCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCart();
        });
    }

    // Add to Cart Logic (delegated or specific)
    const drawerAddBtn = document.querySelector('#dish-drawer .button-primary');
    if (drawerAddBtn) {
        drawerAddBtn.addEventListener('click', () => {
            const title = document.getElementById('drawer-title').innerText;
            const priceStr = document.getElementById('drawer-price').innerText;
            const price = parseInt(priceStr.replace('₹', ''));

            addToCart({ title, price });
            closeDrawer(); // Defined in HTML script, accessed via window or scope
            toggleCart();
        });
    }
});

function addToCart(item) {
    cart.push(item);
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const navBtn = document.querySelector('.nav-right a');

    // Update Count
    if (navBtn) navBtn.innerText = `Cart (${cart.length})`;

    // Update List
    if (cart.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; margin-top: 2rem;">Your cart is empty.</p>';
        totalEl.innerText = '₹0';
        return;
    }

    let total = 0;
    let html = '';

    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-subtle);">
                <div>
                    <h4 style="font-family: var(--font-serif); margin-bottom: 0.2rem;">${item.title}</h4>
                    <span style="color: var(--accent); font-size: 0.9rem;">₹${item.price}</span>
                </div>
                <button onclick="removeFromCart(${index})" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 0.9rem;">Remove</button>
            </div>
        `;
    });

    container.innerHTML = html;
    totalEl.innerText = `₹${total}`;
}

window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCartUI();
}