const products = document.querySelector('.products');

const getData = async () => {
    const response = await fetch('data.json');
    const data = await response.json();

    if (data) {
        let html = '';
        for (let i = 0; i < data.length; i += 4) {
            html += `<div class="px row g-4">`;
            for (let j = i; j < i + 4 && j < data.length; j++) {
                const item = data[j];
                html += `
                <div class="col-md-6 col-lg-3">
                    <div class="card h-100 shadow-sm">
                        <a href="./detail.html?id=${item.id}">
                            <img src="${item.image}" class="card-img-top" alt="${item.title}">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.content}</p>
                        </div>
                    </div>
                </div>
                `;
            }
            html += `</div>`;
        }
        products.innerHTML = html;
    }


    

document.getElementById('timkiem').addEventListener('submit', async function(e) {
    e.preventDefault();
    const keyword = document.querySelector('.search-input').value.trim().toLowerCase();
    const response = await fetch('data.json');
    const data = await response.json();
    const filtered = data.filter(item => item.title && item.title.toLowerCase().includes(keyword));
    let html = '';
    if (filtered.length > 0) {
        html += `<div class="px row g-4">`;
        filtered.forEach(item => {
            html += `
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm">
                    <a href="./detail.html?id=${item.id}">
                        <img src="${item.image}" class="card-img-top" alt="${item.title}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.content}</p>
                    </div>
                </div>
            </div>
            `;
        });
        html += `</div>`;
    } else {
        html = '<p>Không tìm thấy sản phẩm phù hợp.</p>';
    }
    document.querySelector('.products').innerHTML = html;
});


};

getData();