const detailcontainer = document.querySelector('.detail-container');

const btnAddcart = document.getElementById('addCart');

const cartIcon = document.querySelector('.cart');

const getDetailProduct = async () => {
    const path = new URLSearchParams(window.location.search);

    const productId = path.get('id');

    const response = await fetch('data.json');

    const data = await response.json();

    const findProductId = data.find(item => item.id.toString() === productId.toString());

    detailcontainer.innerHTML = `    <div class= " detail-container container my-5">
        <div class="row g-4">
            <div class="col-md-5">
                <div class="cards-img-container shadow">
                    <img src="${findProductId.image}" class="cards-img" alt="${findProductId.title}">
                </div>
            </div>
            <div class="col-md-7">
                <div class="cards shadow product-details">
                    <div class="card-body">
                        <h1 class="product-title">${findProductId.title}</h1>
                        <p class="product-description">${findProductId.content}</p>
                        <div class="cards card-info">
                            <div class="card-body">
                                <p><strong>VND:</strong> ${findProductId.money}đ</p>
                                <p><strong>Tình trạng sản phẩm:</strong> ${findProductId.condition}</p>
                                <p><strong>Sản phẩm có sẵn:</strong> ${findProductId.stock}</p>
                                <p><strong>Số lượng đã bán:</strong> ${findProductId.sold}</p>
                                <div><input type="number" class="quantity-input" value="1" min="1"></div>
                            </div>
                        </div>
                        <button id="addCart" class="btn btn-primary add-to-cart adm"><i
                                class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    btnAddcart.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart'));

        if(cart){
            const item = cart.findIndex(item => item.id === findProductId.id);
            if(item !== -1){
                cart[item].count += 1;
            } else {
                cart.push({id: findProductId.id, count: 1});
            }
            localStorage.setItem('cart', JSON.stringify (cart));
        }else {
            const cart = [
                {
                    id: findProductId.id,
                    count: 1
                }
            ]
            localStorage.setItem('cart', JSON.stringify (cart));

        }



    });
}
    getDetailProduct();

