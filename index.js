document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const userDetails = document.getElementById("userDetails");
    const usernameSpan = document.getElementById("username");
    const userCreditSpan = document.getElementById("userCredit");
    const logoutButton = document.getElementById("logoutButton");

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
        // User is logged in, update UI
        loginButton.style.display = "none";
        userDetails.style.display = "block";
        usernameSpan.textContent = user.name; // Set username
        userCreditSpan.textContent = user.credit; // Set user credit
    }

    // Logout functionality
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("user");
        location.reload(); // Reload page to reflect changes
    });
});
