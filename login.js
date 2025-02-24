document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
        loginButton.textContent = username;
        loginButton.href = "account.html";
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();  // ✅ Prevent form from submitting to frontend

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const successMessage = document.getElementById('successMessage');

            try {
                const response = await fetch("https://bank2-4wk0.onrender.com/login", {  // ✅ Correct backend URL
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log("Server Response:", data);

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.username);

                    successMessage.textContent = "✅ Login successful! Redirecting...";
                    successMessage.style.color = "green";

                    setTimeout(() => {
                        window.location.href = "account.html";
                    }, 2000);
                } else {
                    successMessage.textContent = `❌ ${data.message}`;
                    successMessage.style.color = "red";
                }
            } catch (error) {
                console.error("Error:", error);
                successMessage.textContent = "❌ Login failed. Please try again.";
                successMessage.style.color = "red";
            }
        });
    }
});
