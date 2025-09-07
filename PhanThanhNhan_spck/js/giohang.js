let container = document.querySelector('.container');

let cartContainer = document.querySelector('.cart-container');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const renderCartItem = async () => {
    const response = await fetch('./data.json')

    const data = await response.json();

    // console.log(data);
    // console.log(cart);

    if (cart.length !== 0) {
        return (cartContainer.innerHTML = cart.map(itemCart => {
            let search = data.find(itemData => itemData.id === itemCart.id) || [];
            console.log(search.money)
            return `
           <div class="cart-row cart-item">
                <div><input type="checkbox"></div>
                <div class="product-info">
                    <img src="${search.image}" alt="${search.title}">
                    <div class="product-name">${search.title}</div>
                </div>
                <div>${search.money}</div>
                <div><input onchange="update(${search.id})" type="number" id="quantity" class="quantity-input" value="${itemCart.count}" id="${search.id}" min="1"></div>
                <div>${search.money * itemCart.count}₫</div>
            </div>
            `;
        }).join("")
        )
    } else {
        return container.innerHTML = `<p>Your cart is empty</p>`
    }
}

let update = (id) => {
    if (cart.length !== 0) {
        let searchIndex = cart.findIndex(itemCart => itemCart.id === id);

        if (searchIndex !== -1) {
            let quantityElement = document.getElementById(id);

            if (quantityElement) {
                cart[searchIndex].count = parseInt(quantityElement, 10) || 0;

                localStorage.setItem('cart', JSON.stringify(cart));

                renderCartItem();
            }

        }
    }
}

renderCartItem();