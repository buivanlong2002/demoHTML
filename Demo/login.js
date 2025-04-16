async function login() {
    const phone_number = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    if (!phone_number || !password) {
        document.getElementById("message").innerText = "⚠️ Vui lòng nhập đầy đủ thông tin!";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/v1/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone_number: phone_number, password: password })
        });

        const result = await response.json(); // parse JSON

        if (result.code === "00") {
            document.getElementById("message").style.color = "green";
            document.getElementById("message").innerText = ` ${result.message}`;
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1);
        } else {
            document.getElementById("message").style.color = "red";
            document.getElementById("message").innerText = ` ${result.message}`;
        }
    } catch (error) {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerText = " Lỗi kết nối tới server!";
        console.error("Login error: ", error);
    }
}
