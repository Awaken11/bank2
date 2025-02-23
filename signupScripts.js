document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent default form submission

            let valid = true; // Validation flag

            // Input values
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Error message elements
            const usernameError = document.getElementById('usernameError');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            const successMessage = document.getElementById('successMessage');

            // Regex patterns for validation
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Clear previous error messages
            usernameError.textContent = "";
            emailError.textContent = "";
            passwordError.textContent = "";
            confirmPasswordError.textContent = "";
            successMessage.textContent = "";

            // Validate Username
            if (username.length < 4) {
                usernameError.textContent = "Username must be at least 4 characters long.";
                valid = false;
            }

            // Validate Email
            if (!emailPattern.test(email)) {
                emailError.textContent = "Please enter a valid email address.";
                valid = false;
            }

            // Validate Password Strength
            if (!passwordPattern.test(password)) {
                passwordError.textContent = "Password must be at least 8 characters, include a number, special character, uppercase, and lowercase letter.";
                valid = false;
            }

            // Validate Password Confirmation
            if (password !== confirmPassword) {
                confirmPasswordError.textContent = "Passwords do not match.";
                valid = false;
            }

            // If validation fails, stop submission
            if (!valid) {
                return;
            }

            // Send Data to Backend API
            try {
                const response = await fetch("https://bank2-4wk0.onrender.com/signup", { // Replace with your actual backend URL
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    successMessage.textContent = "✅ Signup successful! Redirecting...";
                    successMessage.style.color = "green";

                    setTimeout(() => {
                        window.location.href = "login.html"; // Redirect to login page
                    }, 2000);
                } else {
                    successMessage.textContent = `❌ ${data.message}`;
                    successMessage.style.color = "red";
                }
            } catch (error) {
                console.error("Error:", error);
                successMessage.textContent = "❌ Signup failed. Please try again.";
                successMessage.style.color = "red";
            }
        });
    }
});
