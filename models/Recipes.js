const mongoose = require("mongoose");

const Recipe = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    complexity: {
      type: String,
      required: true,
      trim: true,
    },
    servingTemperature: {
      type: String,
      required: true,
      trim: true,
    },
    durationMs: {
      type: Number,
      required: true,
      trim: true,
    },
    isAccepted: {
      type: Boolean,
      required: true,
      trim: true,
    },
    ingredients: [
      {
        foodName: {
          type: String,
          trim: true,
        },
        quantity: {
          unit: {
            type: String,
            trim: true,
          },
          value: {
            type: Number,
          },
        },
      },
    ],
    steps: [
      {
        cookingAction: {
          type: String,
          required: true,
        },
        instructions: [
          {
            cuttingTechnique: {
              type: String,
            },
            intensity: {
              type: String,
            },
            mode: {
              type: String,
            },
            complete: {
              type: String,
            },
            details: {
              type: String,
            },
            OvenHeight: {
              type: String,
            },
          },
        ],
        ingredients: [
          {
            foodName: {
              type: String,
              trim: true,
            },
            quantity: {
              unit: {
                type: String,
                trim: true,
              },
              value: {
                type: Number,
              },
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", Recipe);
