const User = require("./model")
const { hashData, verifyHashedData } = require("./../../utils/hashData");
const createToken = require("./../../utils/createToken");


const authenticateUser = async (data) => {
    try {
        const { email, password } = data;

        const fetchedUser = await User.findOne({email});

        if (!fetchedUser) {
            throw Error("Invalid credentials entered!");
        }

        const hashedPassword = fetchedUser.password;
        const passwordMatch = await verifyHashedData(password, hashedPassword);

        if (!passwordMatch) {
            throw Error("Invalid password!");
        }

        // create user token
        const tokenData = { userId: fetchedUser._id, email };
        const token = await createToken(tokenData);

        // assign user token
        fetchedUser.token = token;
        return fetchedUser;

    } catch (error) {
        throw error;
    }
}

const createNewUser = async (data) => {
    try {
        const { firstName, lastName, email, password } = data;

        // Cheking if user already exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            throw Error ("User with the provided email already exists, please login")
        }

        // hash password
        const hashedPassword = await hashData(password);
        
        const newUser = new User({
            firstName, lastName, email, password: hashedPassword,
        });
        // save user
        const createdUser = await newUser.save();
        return createdUser;

    } catch (error) {
        throw error;
    }
};

module.exports = { createNewUser, authenticateUser };