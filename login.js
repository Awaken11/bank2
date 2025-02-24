document.addEventListener('DOMContentLoaded', function () {
    console.log("✅ login.js Loaded");

    const loginForm = document.getElementById('loginForm');

    if (!loginForm) {
        console.error("❌ loginForm not found!");
        return;
    }

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission
        console.log("✅ Form submitted!");

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        console.log("Email:", email, "Password:", password); // Debugging

        const successMessage = document.getElementById('successMessage');

        try {
            const response = await fetch("https://bank2-4wk0.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            console.log("✅ Fetch request sent!");

            const data = await response.json();
            console.log("🔹 Server Response:", data);

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);

                successMessage.textContent = "✅ Login successful! Redirecting...";
                successMessage.style.color = "green";

                setTimeout(() => {
                    window.location.href = "account.html"; // Change this to your dashboard
                }, 2000);
            } else {
                successMessage.textContent = `❌ ${data.message}`;
                successMessage.style.color = "red";
            }
        } catch (error) {
            console.error("❌ Fetch error:", error);
            successMessage.textContent = "❌ Login failed. Please try again.";
            successMessage.style.color = "red";
        }
    });
});
