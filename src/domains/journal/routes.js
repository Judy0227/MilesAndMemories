const express = require("express");
const router = express.Router();

// post journal
router.post("/postjournal", async (req, res) => {
    try {
        let { title, content, createdAt, user } = req.body;
        title = title.trim();
        content = content.triim();

        if (title || title.length < 3) {
            throw Error ("Title your journal, characters more than 3")
        }else if (content || content.length < 10) {
            throw Error ("caapture beautiful story for your journey");
        
        }else if (!(title && content)) {
            throw Error ("write tile and beautiful story for your journey")
        }

        // title, content filled
        

    } catch (error) {

    }
})