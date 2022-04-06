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
      res.status(404).send("Admin not found.");
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
  if (req.body.role != null) {
    res.admin.role = req.body.role;
  }
  if (req.body.permissions != null) {
    res.admin.permissions = req.body.permissions;
  }
  if (req.body.name != null) {
    res.admin.name = req.body.name;
  }
  if (req.body.logs != null) {
    res.admin.logs = req.body.logs;
  }
  try {
    const updatedAdmin = await res.admin.save();
    res.json(updatedAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// create a new User
// route -> POST /api/v1/users
/* INCOMING DATA FORMAT
    {
      "role": "ADMIN",
      "permissions": [ {"name": "DELETEUSER", "boolean": "TRUE"}, {"name": "MODIFYUSER", "boolean": "TRUE"}, {"name": "MODIFYALLERGIES", "boolean": "FALSE"}, {"name": "MODIFYPATIENTINFO", "boolean": "FALSE"}, {"name": "RECIPEREVIEW", "boolean": "TRUE"} ],
      "user": :id,
    },
    "role": "ADMIN",
     "permissions": [ {"name": "DELETE_USER", "boolean": "true"}, {"name": "MODIFY_USER", "boolean": "true"}, {"name": "MODIFY_ALLERGIES", "boolean": "false"}, {"name": "MODIFY_PATIENT_INFO", "boolean": "false"}, {"name": "RECIPE_REVIEW", "boolean": "true"} ],
    "user": "6247657674d581470ce1cc6c",
    "name": "MarcosItu6"

 */
router.post("/", async (req, res) => {
  const admin = new Admin({
    role: req.body.role,
    permissions: req.body.permissions,
    user: req.body.user,
    name: req.body.name,
    logs: req.body.logs,
  });

  await admin.save(function (err) {
    if (err) {
      console.log(err);
    }
    // saved!
  });
  res.status(201).json(admin);
});

// delete an inventory item
// route -> delete /api/v1/users/:id
router.delete("/:id", getAdmin, async (req, res) => {
  try {
    await res.admin.remove();
    res.json({ message: "Deleted Admin" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
