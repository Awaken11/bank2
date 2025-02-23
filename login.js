document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim(); // Changed 'username' to 'email'
            const password = document.getElementById("password").value;
            const submitButton = document.querySelector("button[type='submit']");

            function clearError(inputId) {
                const errorElement = document.getElementById(inputId + "Error");
                if (errorElement) errorElement.textContent = "";
            }

            function showError(inputId, message) {
                let errorElement = document.getElementById(inputId + "Error");
                if (!errorElement) {
                    errorElement = document.createElement("span");
                    errorElement.className = "error-message";
                    errorElement.id = inputId + "Error";
                    document.getElementById(inputId).insertAdjacentElement("afterend", errorElement);
                }
                errorElement.textContent = message;
            }

            clearError("email");
            clearError("password");

            if (!email.includes("@")) {
                showError("email", "Please enter a valid email.");
                return;
            }

            if (password.length < 6) {
                showError("password", "Password must be at least 6 characters long.");
                return;
            }

            submitButton.disabled = true;
            submitButton.textContent = "Logging in...";

            try {
                const response = await fetch("https://bank2-4wk0.onrender.com/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert("✅ Login successful!");
                    localStorage.setItem("authToken", data.token); // Store JWT token
                    window.location.href = "dashboard.html"; // Redirect to dashboard
                } else {
                    showError("email", data.message || "❌ Invalid login credentials.");
                }
            } catch (error) {
                console.error("Login error:", error);
                showError("email", "⚠️ Something went wrong. Try again later.");
            }

            submitButton.disabled = false;
            submitButton.textContent = "Login";
        });
    }
});
