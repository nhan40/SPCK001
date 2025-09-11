const detailcontainer = document.querySelector(".detail-container");
const cartIcon = document.querySelector(".cart-item"); 

function updateCartIconCount(cartArr) {
  if (!cartIcon) return;
  try {
    const total = (cartArr || []).reduce((s, it) => s + (Number(it.count) || 0), 0);
    cartIcon.textContent = String(total);
  } catch {
  }
}

const getDetailProduct = async () => {
  if (!detailcontainer) return;

  const path = new URLSearchParams(window.location.search);
  const productId = path.get("id");

  const response = await fetch("data.json");
  const data = await response.json();

  const findProductId = data.find(
    (item) => String(item.id) === String(productId)
  );

  if (!findProductId) {
    detailcontainer.innerHTML = `<div class="container my-5"><p>Không tìm thấy sản phẩm.</p></div>`;
    return;
  }

  // Render chi tiết
  detailcontainer.innerHTML = `
    <div class="container my-5">
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
                </div>
              </div>
              <button id="addCart" class="btn btn-primary add-to-cart adm">Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const btnAddCart = detailcontainer.querySelector("#addCart");
  if (!btnAddCart) return;

  btnAddCart.addEventListener("click", () => {
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (!Array.isArray(cart)) cart = [];
    } catch {
      cart = [];
    }

    const idx = cart.findIndex(
      (it) => String(it.id) === String(findProductId.id)
    );

    if (idx !== -1) {
      cart[idx].count = (Number(cart[idx].count) || 0) + 1;
    } else {
      cart.push({ id: findProductId.id, count: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartIconCount(cart);

    alert("Đã thêm vào giỏ!");
  });

  try {
    const cartAtOpen = JSON.parse(localStorage.getItem("cart") || "[]");
    updateCartIconCount(cartAtOpen);
  } catch { /* ignore */ }

  
};
document.addEventListener('DOMContentLoaded', () => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    updateCartIconCount(cart); // đảm bảo .cart-item (nếu có) luôn hiển thị đúng
  } catch {}
});

getDetailProduct();