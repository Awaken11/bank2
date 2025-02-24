document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ scripts.js Loaded");

    const loginButton = document.getElementById("loginButton");
    const userDetails = document.getElementById("userDetails");
    const usernameSpan = document.getElementById("username");
    const userCreditSpan = document.getElementById("userCredit");
    const logoutButton = document.getElementById("logoutButton");

    // Retrieve stored user details from localStorage
    const username = localStorage.getItem("username");
    const credit = localStorage.getItem("credit");

    if (username) {
        // ✅ User is logged in - show details
        loginButton.style.display = "none"; // Hide login button
        userDetails.style.display = "block"; // Show user details
        usernameSpan.textContent = username; // Display username
        userCreditSpan.textContent = credit ? credit : "0"; // Display credit or default to 0
    } else {
        // ❌ No user found - show login button
        loginButton.style.display = "block";
        userDetails.style.display = "none";
    }

    // 🔹 Logout functionality
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("username");
        localStorage.removeItem("credit");
        localStorage.removeItem("token");

        // Redirect to login page or refresh the homepage
        window.location.href = "https://awaken11.github.io/bank2/index.html";
    });
});
