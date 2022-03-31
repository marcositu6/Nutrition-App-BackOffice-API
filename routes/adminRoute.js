const router = require("express").Router();
const Admin = require("../models/Admin");

// GET all inventories
router.get("/", (req, res) => {
  Admin.find()
    .then((admin) => {
      res.json({
        confirmation: "success",
        data: admin,
      });
    })
    .catch((err) => {
      res.status(404).send("Users not found.");
    });
});

//middleware function to get ID
async function getAdmin(req, res, next) {
  let admin;
  try {
    admin = await Admin.findById(req.params.id);
    if (admin == null) {
      return res.status(404).json({ message: "Cannot find admin" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.admin = admin;
  next();
}

// GET inventory by ID
router.get("/:id", getAdmin, (req, res) => {
  res.status(200).json(res.admin);
});

// EDIT inventory by ID
router.patch("/:id", getAdmin, async (req, res) => {
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
router.delete("/:id", getAdmin, async (req, res) => {
  try {
    await res.Admin.remove();
    res.json({ message: "Deleted Admin" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
