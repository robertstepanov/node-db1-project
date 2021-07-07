const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "failed to get list of accounts" });
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "failed to get account by ID" });
    });
});

router.post("/", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "failed to add account" });
    });
});
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db("accounts")
    .where({ id })
    .update(changes)
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "couldnt update account" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("accounts")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "couldnt delete account" });
    });
});

module.exports = router;

// function getById(id) {
//   return db("accounts")
//     .where({ id })
//     .first();
// }
