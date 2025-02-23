document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const loginInput = document.getElementById("loginInput").value.trim();
            const password = document.getElementById("password").value;
            const submitButton = document.getElementById("loginButton");

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

            clearError("loginInput");
            clearError("password");

            const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(loginInput);
            if (!isEmail && loginInput.length < 4) {
                showError("loginInput", "Enter a valid email or username (min 4 characters).");
                return;
            }

            if (password.length < 6) {
                showError("password", "Password must be at least 6 characters long.");
                return;
            }

            submitButton.disabled = true;
            submitButton.textContent = "Logging in...";

            try {
                const response = await fetch("https://your-railway-app-url/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ login: loginInput, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Login successful!");
                    window.location.href = "dashboard.html";
                } else {
                    showError("loginInput", data.message || "Invalid login credentials.");
                }
            } catch (error) {
                console.error("Login error:", error);
                showError("loginInput", "Something went wrong. Try again later.");
            }

            submitButton.disabled = false;
            submitButton.textContent = "Login";
        });
    }
});
