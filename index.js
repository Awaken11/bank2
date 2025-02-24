document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ index.js Loaded");

    const loginButton = document.getElementById("loginButton");
    const userDetails = document.getElementById("userDetails");

    console.log("🔍 Checking localStorage...");
    const username = localStorage.getItem("username");
    const credit = parseFloat(localStorage.getItem("credit")) || 0; // Ensuring credit is a number

    if (username) {
        console.log(`✅ User logged in as: ${username}`);
        loginButton.style.display = "none";
        userDetails.style.display = "block";

        // Set userDetails to display as a button
        userDetails.innerHTML = `<button id="accountButton">${username} ₹${credit}</button>`;

        // Add event listener to redirect on click
        document.getElementById("accountButton").addEventListener("click", function () {
            window.location.href = "account.html";
        });
    } else {
        console.warn("❌ No user found. Showing login button.");
        loginButton.style.display = "block";
        userDetails.style.display = "none";
    }
});
