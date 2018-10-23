const express = require('express');
const authMiddleware = require('../middleware/auth')

const router = express.Router();

router.use(authMiddleware)

router.get('/', (req, res) => {
    res.send({ok: true, id: req.userId})
})

module.exports = (app) => app.use('/project', router)