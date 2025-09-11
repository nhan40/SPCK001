document.addEventListener('DOMContentLoaded', async function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const response = await fetch('data.json');
    const data = await response.json();

    const productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = cart.map(item => {
            const product = data.find(p => p.id === item.id);
            if (!product) return '';
            return `
                <div class="product-item d-flex align-items-center mb-2">
                    <img src="${product.image}" alt="${product.title}" style="width:60px;height:60px;object-fit:cover;margin-right:10px;">
                    <div class="product-details">
                        <div class="product-name">${product.title}</div>
                        <div class="product-qty">Số lượng: ${item.count}</div>
                        <div class="product-price">Đơn giá: ${parseInt(product.money,10).toLocaleString()}₫</div>
                        <div class="product-total">Thành tiền: ${(parseInt(product.money,10)*item.count).toLocaleString()}₫</div>
                    </div>
                </div>
            `;
        }).join('');
    }


    const totalOrders = cart.reduce((sum, item) => sum + (item.count || 0), 0);

    const totalMoney = cart.reduce((sum, item) => {
        const product = data.find(p => p.id === item.id);
        return sum + ((product ? parseInt(product.money, 10) : 0) * (item.count || 0));
    }, 0);

    const totalDiv = document.getElementById('SSS');
    if (totalDiv) {
        totalDiv.textContent = `Tổng cộng: ${totalMoney.toLocaleString()}₫`;
    }
});