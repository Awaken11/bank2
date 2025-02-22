document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            let valid = true; // Flag to check if form is valid

            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Error message elements
            const usernameError = document.getElementById('usernameError');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');

            // Regex patterns for validation
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Clear previous error messages
            usernameError.textContent = "";
            emailError.textContent = "";
            passwordError.textContent = "";
            confirmPasswordError.textContent = "";

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

            // Prevent form submission if any validation fails
            if (!valid) {
                event.preventDefault();
            }
        });
    }
});
