// Initialize cart
let cart = [];

// Fetch items from the server
async function fetchItems() {
    const response = await fetch('server.php');
    const items = await response.json();

    // Populate item list
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    items.forEach(item => {
        itemList.innerHTML += `
            <div class="card">
                <img src="${item.image_url}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">Add to Cart</button>
            </div>
        `;
    });
}

// Add item to cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    renderCart();
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

// Render cart items
function renderCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';
    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        cartList.innerHTML += `
            <div class="card">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });
}

// Initialize app
fetchItems();
