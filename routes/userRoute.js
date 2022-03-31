const router = require("express").Router();
const User = require("../models/User");

// GET all inventories
router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.json({
        confirmation: "success",
        data: users,
      });
    })
    .catch((err) => {
      res.status(404).send("Users not found.");
    });
});

//middleware function to get ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

// GET inventory by ID
router.get("/:id", getUser, (req, res) => {
  res.status(200).json(res.user);
});

// EDIT inventory by ID
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// create a new User
// route -> POST /api/v1/users
/* INCOMING DATA FORMAT
    {
      "email": "jhonnymaster@testing.com",
      "password": "very secure password"
    },
 */
router.post("/", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  await user.save(function (err) {
    if (err) {
      console.log(err);
    }
    // saved!
  });
  res.status(201).json(user);
});

// delete an inventory item
// route -> delete /api/v1/users/:id
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
