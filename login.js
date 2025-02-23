document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
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

            clearError("username");
            clearError("password");

            if (username.length < 4) {
                showError("username", "Username must be at least 4 characters long.");
                return;
            }

            if (password.length < 6) {
                showError("password", "Password must be at least 6 characters long.");
                return;
            }

            submitButton.disabled = true;
            submitButton.textContent = "Logging in...";

            try {
                const response = await fetch("https://yamanote.proxy.rlwy.net:43574/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Login successful!");
                    window.location.href = "dashboard.html";
                } else {
                    showError("username", data.message || "Invalid login credentials.");
                }
            } catch (error) {
                console.error("Login error:", error);
                showError("username", "Something went wrong. Try again later.");
            }

            submitButton.disabled = false;
            submitButton.textContent = "Login";
        });
    }
});
