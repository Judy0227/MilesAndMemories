require("dotenv").config();
const mongoose = require("mongoose");

// url
const { MONGODB_URL } = process.env;

const connectToDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");
    } catch (error) {
        console.log(error);
    }
};

connectToDB();