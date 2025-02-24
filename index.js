document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ index.js Loaded");

    const loginButton = document.getElementById("loginButton");
    const userDetails = document.getElementById("userDetails");
    const usernameSpan = document.getElementById("username");
    const userCreditSpan = document.getElementById("userCredit");
    const logoutButton = document.getElementById("logoutButton");

    console.log("🔍 Checking localStorage...");
    const username = localStorage.getItem("username");
    const credit = parseFloat(localStorage.getItem("credit")) || 0; // Ensuring credit is a number

    if (username) {
        console.log(`✅ User logged in as: ${username}`);
        loginButton.style.display = "none";
        userDetails.style.display = "block";
        usernameSpan.textContent = username;
        userCreditSpan.textContent = credit;
    } else {
        console.warn("❌ No user found. Showing login button.");
        loginButton.style.display = "block";
        userDetails.style.display = "none";
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            console.log("🔹 Logging out...");
            localStorage.removeItem("username");
            localStorage.removeItem("credit");
            localStorage.removeItem("token");
            window.location.href = "index.html";
        });
    }
});
