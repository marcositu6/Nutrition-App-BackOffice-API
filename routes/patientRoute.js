const router = require("express").Router();
const Patient = require("../models/Patient");

// GET all inventories
router.get("/", (req, res) => {
  Patient.find({})
    .then((patients) => {
      res.json({
        confirmation: "success",
        data: patients,
      });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

//middleware function to get ID
async function getPatient(req, res, next) {
  let patient;
  try {
    patient = await Patient.findById(req.params.id);
    if (patient == null) {
      return res.status(404).json({ message: "Cannot find patient" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.patient = patient;
  next();
}

// GET inventory by ID
router.get("/:id", getPatient, (req, res) => {
  res.status(200).json(res.patient);
});

// EDIT inventory by ID
router.patch("/:id", getPatient, async (req, res) => {
  if (req.body.firstName != null) {
    res.patient.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.patient.lastName = req.body.lastName;
  }
  if (req.body.birthDate != null) {
    res.patient.birthDate = req.body.birthDate;
  }
  if (req.body.address != null) {
    res.patient.address = req.body.address;
  }
  if (req.body.physicalAttributes != null) {
    res.patient.physicalAttributes = req.body.physicalAttributes;
  }
  if (req.body.objective != null) {
    res.patient.objective = req.body.objective;
  }
  if (req.body.nutritionalPreferences != null) {
    res.patient.nutritionalPreferences = req.body.nutritionalPreferences;
  }
  if (req.body.habits != null) {
    res.patient.habits = req.body.habits;
  }
  if (req.body.isSubscribed != null) {
    res.patient.isSubscribed = req.body.isSubscribed;
  }
  try {
    const updatedPatient = await res.patient.save();
    res.json(updatedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// create a new User
// route -> POST /api/v1/users
/* INCOMING DATA FORMAT
    {
      "firstName": "Jhonny",
      "lastName": "Master",
      "birthDate": "22/08/1995",
      "address": {
        "city": "Van",  
        "country": "Canada",
        },
      "PhysicalAttributes": {
        "heightCm": "186",  
        "weightKg": "78",
        "gender": "MALE",
        },
      "Objective": "GAIN_WEIGHT",
      "nutritionalPreferences": {
          AllergenGroups: [ {"name": "GLUTEN", "boolean": "TRUE"}, {"CRUSTACEANS", "FALSE"}, {"EGGS", "FALSE"}, {"FISH", "FALSE"}, {"PEANUTS", "TRUE"}... ],
      },
      "habits": {
        "activityLevel": "MODERATE",  
        "dailyMeals": { "BREAKFAST", "LUNCH", "DINNER" },
        },
      "isSubscribed": "TRUE",

    },
 */
router.post("/", async (req, res) => {
  const patient = new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    address: req.body.address,
    physicalAttributes: req.body.physicalAttributes,
    objective: req.body.objective,
    nutritionalPreferences: req.body.nutritionalPreferences,
    habits: req.body.habits,
    isSubscribed: req.body.isSubscribed,
    user: req.body.user,
  });

  await patient.save(function (err) {
    if (err) {
      console.log(err);
    }
    // saved!
  });
  res.status(201).json(patient);
});

// delete an inventory item
// route -> delete /api/v1/users/:id
router.delete("/:id", getPatient, async (req, res) => {
  try {
    await res.patient.remove();
    res.json({ message: "Deleted Patient" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
