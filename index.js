document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ index.js Loaded");

    const loginButton = document.getElementById("loginButton");
    const userDetails = document.getElementById("userDetails");
    const usernameSpan = document.getElementById("username");
    const userCreditSpan = document.getElementById("userCredit");
    const logoutButton = document.getElementById("logoutButton");

    function updateUserInfo() {
        const username = localStorage.getItem("username");
        const credit = localStorage.getItem("credit");

        if (username) {
            loginButton.style.display = "none"; 
            userDetails.style.display = "block"; 
            usernameSpan.textContent = username; 
            userCreditSpan.textContent = credit ? credit : "0"; 
        } else {
            loginButton.style.display = "inline-block";
            userDetails.style.display = "none";
        }
    }

    // Ensure user data is updated when the page loads
    updateUserInfo();

    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("username");
        localStorage.removeItem("credit");
        localStorage.removeItem("token");

        // Refresh the page to reflect logout
        window.location.href = "index.html";
    });
});
