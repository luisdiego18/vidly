const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// HTTP GET
router.get("/", async (req, res) => {
  // throw new Error("Could not get the genres.");
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// HTTP GET/:id
router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");
  res.send(genre);
});

// HTTP POST
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Add item
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  //return item
  res.send(genre);
});

// HTTP PUT
router.put("/:id", auth, async (req, res) => {
  //validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update fist approach
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  //Return item
  res.send(genre);
});

// HTTP DELETE
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");
  // Return item
  res.send(genre);
});

module.exports = router;