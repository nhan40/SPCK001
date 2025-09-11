const register = (event) => {
    event.preventDefault();
    let email = document.getElementById("signup-email").value.trim();
    let password = document.getElementById("signup-password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    //biểu thức chính quy
   const lowerCaseletter = /[a-z]/g;
   const upperCaseletter = /[A-Z]/g;
   const number = /[0-9]/g;

    // Kiểm tra thông tin đăng ký
    if (!email || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp.");
        return;
    }

    if (password.length < 8) {
        alert("Mật khẩu phải có ít nhất 8 ký tự.");
        return;
    }


    if (!password.match(lowerCaseletter)) {
        alert("Mật khẩu phải chứa ít nhất một chữ cái viết thường.");
        return;
    }

    if (!password.match(upperCaseletter)) {
        alert("Mật khẩu phải chứa ít nhất một chữ cái viết hoa.");
        return;
    }

    if (!password.match(number)) {
        alert("Mật khẩu phải chứa ít nhất một chữ số.");
        return;
    }
  
     let user = {
        email: email,
        password: password
    }
    let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : {};

    if (users[email]){
         alert("Email đã được sử dụng. Vui lòng chọn email khác.");
    }else{
        users[email] = user;
        localStorage.setItem('users', JSON.stringify(users));
        alert("Đăng ký thành công!");
        window.location.href = 'index.html'; // Chuyển về trang index
    }

}

document.getElementById("signup-form").addEventListener("submit", register);

