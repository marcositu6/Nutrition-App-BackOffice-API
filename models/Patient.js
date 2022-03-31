const mongoose = require("mongoose");
import Gender from "./enums/GenderEnum";
import MealType from "./enums/MealTypeEnum";
import NutritionalPreferences from "./enums/AllergenGroupsEnum";
import Objective from "./enums/ObjectiveEnum";

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
    PhysicalAttributes: {
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
    Objective: {
      type: String,
      required: true,
      enum: Objective,
    },
    nutritionalPreferences: {
      allergenGroups: {
        type: Array,
        required: true,
        enum: AllergenGroups,
      },
    },
    habits: {
      activityLevel: {
        type: String,
        required: true,
        enum: activityLevel,
      },
      dailyMeals: {
        type: Array,
        required: true,
        enum: MealType,
      },
    },
    isSubscribed: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Patient", Patient);
