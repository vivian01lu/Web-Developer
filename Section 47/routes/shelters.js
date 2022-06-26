const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("All shelters")
})

router.post('/', (req, res) => {
    res.send("Creating shelters")
})

router.get('/:id', (req, res) => {
    res.send("view one shelter")
})
router.get('/:id/eidt', (req, res) => {
    res.send("Editing one shelter")
})

module.exports = router;
/**
 * 在这里export 在index里在require
 */