const Users = require('../models/users');

// Render sign-up form
exports.renderSignUp = (req, res) => {
    const cookie = req.session.isLoggedIn;
    res.render('sign-up', { isLoggedIn: cookie}); // Make sure 'sign-up.ejs' exists
};

// Process sign-up form data
exports.registerUser = (req, res) => {
    const { userName, password, confirmPassword } = req.body;

    // Validate input
    if (!userName || !password || !confirmPassword) {
        return res.status(400).send('Semua field harus diisi!');
    }

    if (password !== confirmPassword) {
        return res.status(400).send('Password tidak cocok!');
    }

    // Save user to the database
    const users = new Users(null, userName, password);
    users.insertUser()
        .then(() => {
            res.redirect('/'); // Redirect to the main page
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Terjadi kesalahan saat menyimpan data.');
        });
};

// Render login form
exports.renderLogin = (req, res) => {
    const cookie = req.session.isLoggedIn;
    res.render('login', { isLoggedIn: cookie });
};

// Validate login credentials
exports.validateLogin = (req, res) => {
    const { userName, password } = req.body;

    // Ensure userName and password are provided
    if (!userName || !password) {
        return res.status(400).send("Username and password are required.");
    }

    // Retrieve user data based on userName
    Users.fetchUsersbyUsername(userName)
        .then(([[userCredentials], tInfo]) => {
            if (!userCredentials) {
                // If user not found
                res.cookie("isLoggedIn", "false");
                return res.status(401).redirect("/login");
            }

            // Validate password
            if (userCredentials.password === password) {
                req.session.isLoggedIn = "true"; 
                // If password matches, set cookie isLoggedIn to "true" and redirect to home page
                res.cookie("isLoggedIn", "true");
                return res.redirect("/");
            } else {
                // If password doesn't match, set cookie isLoggedIn to "false" and redirect to login page
                req.session.isLoggedIn = "invalidUsername"; 
                res.cookie("isLoggedIn", "false");
                return res.status(401).redirect("/login");
            }
        })
        .catch((error) => {
            // Handle errors, such as if user not found or a query issue occurs
            console.error("Error during login validation:", error);
            return res.status(500).send("Internal Server Error");
        });
};

// Handle logout
exports.Logout = (req, res) => {
req.session.destroy(req.session.id) 
    res.redirect("/"); // Redirect to the home page after logout
};
