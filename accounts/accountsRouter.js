const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  db.select('*')
  .from('accounts')
  .then(accounts => {
    res.status(200).json(accounts)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ error: 'failed to get list of posts'})
  })
})

module.exports = router;