document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ index.js Loaded");

    const loginButton = document.getElementById("loginButton");
    const userDetails = document.getElementById("userDetails");
    const usernameSpan = document.getElementById("username");
    const userCreditSpan = document.getElementById("userCredit");
    const logoutButton = document.getElementById("logoutButton");

    console.log("🔍 Checking localStorage...");
    console.log("Stored Username:", localStorage.getItem("username"));
    console.log("Stored Credit:", localStorage.getItem("credit"));

    const username = localStorage.getItem("username");
    const credit = localStorage.getItem("credit");

    if (username) {
        loginButton.style.display = "none";
        userDetails.style.display = "block";
        usernameSpan.textContent = username;
        userCreditSpan.textContent = credit ? credit : "0";
    } else {
        console.warn("❌ No user found in localStorage!");
        loginButton.style.display = "block";
        userDetails.style.display = "none";
    }

    logoutButton.addEventListener("click", function () {
        console.log("🔹 Logging out...");
        localStorage.removeItem("username");
        localStorage.removeItem("credit");
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });
});
