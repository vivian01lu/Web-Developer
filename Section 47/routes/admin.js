const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    }
    res.send("Sorry not an admin")
})

router.get('/topsecret', (req, res) => {
    res.send("topsecret")
})

router.get('/deleteEverything', (req, res) => {
    res.send("deleteEverything")
})



module.exports = router;