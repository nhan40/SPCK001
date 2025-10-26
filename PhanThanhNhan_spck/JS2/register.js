import { auth, db } from `./firebase-configs.js`
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { Collection, addDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";



const InpUserName = document.querySelector('.inp-username')
const InpEmail = document.querySelector('.inp-email')
const InpPassword = document.querySelector('.inp-password')
const InpConfirmPassword = document.querySelector('.inp-confirm-password')
const registerBtn = document.querySelector('.register-btn')

const HandleRegister = (event) => {
    event.preventDefault();
    const username = InpUserName.value;
    const email = InpEmail.value;
    const password = InpPassword.value;
    const confirmPassword = InpConfirmPassword.value;
    let role_id = 2;// mặc định user là 2, admin là 1

    if (!username || !email || !password || !confirmPassword) {
        alert('Vui lòng nhập đầy đủ thông tin')
        return;
    }
    if (password !== confirmPassword) {
        alert('Mật khẩu không khớp')
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                username,
                email,
                password,
                role_id,
                balance: 0
            };
            return addDoc(Collection(db, 'users'), userData);
        })
        .then(()=>{
            alert('Đăng ký thành công');
            window.location.href = 'login.html';
        })
        .catch((error) => {
            alert("lỗi:" + error.message);
        });
}

registerBtn.addEventListener('submit', HandleRegister)