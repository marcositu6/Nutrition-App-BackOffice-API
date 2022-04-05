const mongoose = require("mongoose");
const Gender = require("./enums/GenderEnum");
const MealType = require("./enums/MealTypeEnum");
const AllergenGroups = require("./enums/AllergenGroupsEnum");
const Objective = require("./enums/ObjectiveEnum");
const ActivityLevel = require("./enums/ActivityLevelEnum");

const Patient = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    address: {
      city: {
        type: String,
        required: true,
        trim: true,
      },
      country: {
        type: String,
        required: true,
        trim: true,
      },
    },
    physicalAttributes: {
      heightCm: {
        type: Number,
        required: true,
      },
      weightKg: {
        type: Number,
        required: true,
      },
      gender: {
        type: String,
        required: true,
        enum: Gender,
      },
    },
    objective: {
      type: String,
      required: true,
      enum: Object.values(Objective),
    },
    nutritionalPreferences: {
      allergenGroups: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
            enum: Object.values(AllergenGroups),
          },
          boolean: {
            type: Boolean,
            required: true,
            default: false,
          },
        },
      ],
    },
    habits: {
      activityLevel: {
        type: String,
        required: true,
        enum: Object.values(ActivityLevel),
      },
      dailyMeals: {
        type: [String],
        required: true,
        enum: Object.values(MealType),
      },
    },
    isSubscribed: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

Object.assign(Patient.statics, {
  Gender,
  Objective,
  AllergenGroups,
  ActivityLevel,
  MealType,
});

module.exports = mongoose.model("Patient", Patient);
