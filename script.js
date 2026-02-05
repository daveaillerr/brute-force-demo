const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (CSS)
app.use(express.static(path.join(process.cwd(), 'public')));

const VALID_EMAIL = "admin@dns.com";
const VALID_PASSWORD = "password123";
const FLAG = "DNS{br00t3_f0rc3_succ3ss}";

// Serve login page
app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "index.html"));
});

// Handle login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Success</title>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <div id="login_container">
                    <div id="login_box">
                        <h1>Login Successful!</h1>
                        <p style="text-align: center; color: #4a5fc1; font-size: 1.5rem; margin-top: 1rem;">${FLAG}</p>
                        <p style="text-align: center; margin-top: 1rem;"><a href="/" style="color: aliceblue;">Back to Login</a></p>
                    </div>
                </div>
            </body>
            </html>
        `);
    } else {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Login Failed</title>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <div id="login_container">
                    <div id="login_box">
                        <h1>Login Failed</h1>
                        <p style="text-align: center; color: #ff6b6b; margin-top: 1rem;">Invalid credentials</p>
                        <p style="text-align: center; margin-top: 1rem;"><a href="/" style="color: aliceblue;">Try Again</a></p>
                    </div>
                </div>
            </body>
            </html>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});