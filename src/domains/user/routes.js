const express = require("express");
const router = express.Router();
const { createNewUser, authenticateUser } = require("./controller");

// signin
router.post("/", async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        if (!(email && password )) {
            throw Error("Please provide credentials!");
        }

        const authenticatedUser = await authenticateUser({ email, password});

        res.status(200).json(authenticatedUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// Sign up
router.post("/signup", async (req, res) => {
    try {
        let { firstName, lastName, email, password } = req.body;
        firstName = firstName.trim();
        lastName = lastName.trim();
        email = email.trim();
        password = password.trim();

        // some validations
        if (!(firstName && lastName && email && password)) {
            throw Error("Empty input fields");
        } else if (!/^[a-zA-Z ]*$/.test(firstName)) {
            throw Error("Invalid name entered");
        } else if (!/^[a-zA-Z ]*$/.test(lastName)) {
            throw Error("Invalid name entered");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw Error ("Invalid email entered")
        }else if ( password.length < 6) {
            throw Error ("password must be 6 characters")
        }else {
            // good credentials? create user
            const newUser = await createNewUser({
                firstName, lastName, email, password
            });
            res.status(200).json(newUser);
        }
    }catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;