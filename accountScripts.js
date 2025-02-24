<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account - Black Bank</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="logo">Black Bank</div>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="about.html">About Us</a></li>
            </ul>
        </nav>
        <a href="#" id="usernameDisplay"></a>
    </header>

    <main>
        <h2>Welcome, <span id="username"></span></h2>
        <p>Account Number: <span id="accountNumber"></span></p>
        <h3>Transaction History</h3>
        <ul id="transactions"></ul>
    </main>

    <script src="accountScripts.js"></script>
</body>
</html>
