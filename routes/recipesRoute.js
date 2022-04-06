const router = require("express").Router();
const Recipes = require("../models/Recipes");

// GET all inventories
router.get("/", (req, res) => {
  Recipes.find({})
    .then((recipe) => {
      res.json({
        confirmation: "success",
        data: recipe,
      });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

//middleware function to get ID
async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipes.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: "Cannot find recipe" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.recipe = recipe;
  next();
}

// GET inventory by ID
router.get("/:id", getRecipe, (req, res) => {
  res.status(200).json(res.recipe);
});

// EDIT inventory by ID
router.patch("/:id", getRecipe, async (req, res) => {
  if (req.body.name != null) {
    res.recipe.name = req.body.name;
  }
  if (req.body.complexity != null) {
    res.recipe.complexity = req.body.complexity;
  }
  if (req.body.servingTemperature != null) {
    res.recipe.servingTemperature = req.body.servingTemperature;
  }
  if (req.body.durationMs != null) {
    res.recipe.durationMs = req.body.durationMs;
  }
  if (req.body.isAccepted != null) {
    res.recipe.isAccepted = req.body.isAccepted;
  }
  if (req.body.ingredients != null) {
    res.recipe.ingredients = req.body.ingredients;
  }
  if (req.body.steps != null) {
    res.recipe.steps = req.body.steps;
  }
  try {
    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// create a new User
// route -> POST /api/v1/users
/* INCOMING DATA FORMAT
   {
    "complexity": "EASY",
    "servingTemperature": "COLD",
    "name": "Strawberry Kiwi Yogurt bowl",
    "durationMs": "5000000",
    "isAccepted": "false",
    "ingredients": [
        {
            "foodName": "KIWI",
            "quantity": {
                "unit": "UNIT",
                "value": 1
            }
        },
        {
            "foodName": "STRAWBERRY",
            "quantity": {
                "unit": "UNIT",
                "value": 2
            }
        },
        {
            "foodName": "YOGURT",
            "quantity": {
                "unit": "UNIT",
                "value": 1
            }
        }
    ],
    "steps": [
         {
            "cookingAction": "CUT",
            "instructions": {
                "cuttingTechnique": "SLICE"
            },
            "ingredients": [
                {
                    "foodName": "KIWI",
                    "quantity": {
                        "unit": "UNIT",
                        "value": 1
                    }
                }
            ]
        },
        {
            "cookingAction": "CUT",
            "instructions": {
                "cuttingTechnique": "SLICE"
            },
            "ingredients": [
                {
                    "foodName": "STRAWBERRY",
                    "quantity": {
                        "unit": "UNIT",
                        "value": 2
                    }
                },
            ]
        },
        {
            "cookingAction": "ADD_INGREDIENTS",
            "instructions": {
                "details": "Pour yogurt into a bowl and add sliced kiwi and sliced strawberry"
            },
            "ingredients": [
                {
                    "foodName": "STRAWBERRY",
                    "quantity": {
                        "unit": "UNIT",
                        "value": 2
                    }
                },
            ]
        },
    ]
},
 */
router.post("/", async (req, res) => {
  const recipe = new Recipes({
    name: req.body.name,
    complexity: req.body.complexity,
    servingTemperature: req.body.servingTemperature,
    durationMs: req.body.durationMs,
    isAccepted: req.body.isAccepted,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
  });

  await recipe.save(function (err) {
    if (err) {
      console.log(err);
    }
    // saved!
  });
  res.status(201).json(recipe);
});

// delete an inventory item
// route -> delete /api/v1/users/:id
router.delete("/:id", getRecipe, async (req, res) => {
  try {
    await res.recipe.remove();
    res.json({ message: "Deleted Recipe" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
