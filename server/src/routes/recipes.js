import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await RecipeModel.find({});
    res.json(recipes);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.get("/:id", async (req, res) => {
    try {
      const recipe = await RecipeModel.findById(req.params.id);
      if (!recipe) {
        // if recipe is not found, return a 404 error
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(recipe);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  });

router.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});



export { router as recipeRouter };
