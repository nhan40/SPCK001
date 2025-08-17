const login = (event) => {
    event.preventDefault();
    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value.trim();

    // Kiểm tra thông tin đăng nhập
    if (!email || !password) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : {};
    
    let storedUser = users[email];

    if (storedUser && storedUser.password === password) {
        alert("Đăng nhập thành công!");
        window.location.href = "./index.html";
    } else {
        alert("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
    }
}

document.getElementById("login-form").addEventListener("submit", login);
