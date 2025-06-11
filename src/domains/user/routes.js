const express = require("express");
const router = express.Router();
const { createNewUser } = require("./controller");

// Sign up
router.post("/signup", async (req, res) => {
    try {
        let { fullname, email, password } = req.body;
        fullname = fullname.trim();
        email = email.trim();
        password = password.trim();

        // some validations
        if (!(fullname && email && password)) {
            throw Error("Empty input fields");
        } else if (!/^[a-zA-Z ]*$/.test(fullname)) {
            throw Error("Invalid name entered");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw Error ("Invalid email entered")
        }else if ( password.length < 6) {
            throw Error ("password must be 6 characters")
        }else {
            // good credentials? create user
            const newUser = await createNewUser({
                fullname, email, password
            });
            res.status(200).json(newUser);
        }
    }catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;