let container = document.querySelector('.container');

let cartContainer = document.querySelector('.cart-container');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const renderCartItem = async () => {
    const response = await fetch('./data.json')
    const data = await response.json();

    if (cart.length !== 0) {
        cartContainer.innerHTML = cart.map(itemCart => {
            let search = data.find(itemData => itemData.id === itemCart.id) || {};
            return `
           <div class="cart-row ccart-item">
                <div><input type="checkbox"></div>
                <div class="product-info">
                    <img src="${search.image}" alt="${search.title}">
                    <div class="product-name">${search.title}</div>
                </div>
                <div>${search.money}</div>
                <div>
                    <input 
                        id="${search.id}" 
                        onchange="update('${search.id}')" 
                        type="number" 
                        class="quantity-input" 
                        value="${itemCart.count}" 
                        min="1" 
                        max="${search.stock}">
                </div>
                <div id="YYY">${search.money * itemCart.count}₫</div>
                <button class="btn btn-danger" onclick="remove('${search.id}')">Xóa</button>
            </div>
            `;
        }).join("");


        let total = cart.reduce((sum, itemCart) => {
            let search = data.find(itemData => itemData.id === itemCart.id) || {};
            return sum + (parseInt(search.money, 10) * itemCart.count || 0);
        }, 0);

        document.getElementById('2010').textContent = `Tổng cộng: ${total.toLocaleString()}₫`;
    } else {
        container.innerHTML = `<p>Your cart is empty</p>`;
        document.getElementById('2010').textContent = `Tổng cộng: 0₫`;
    }
}


let remove = (id) => {
    let searchIndex = cart.findIndex(itemCart => itemCart.id === id);
    if (searchIndex !== -1) {
        cart.splice(searchIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItem();
    }
}

let update = (id) => {
    if (cart.length !== 0) {
        let searchIndex = cart.findIndex(itemCart => itemCart.id === id);

        if (searchIndex !== -1) {
            let quantityElement = document.getElementById(id);

            if (quantityElement) {
                cart[searchIndex].count = parseInt(quantityElement.value, 10) || 0;

                localStorage.setItem('cart', JSON.stringify(cart));

                renderCartItem();
            }

        }
    }
}

renderCartItem();