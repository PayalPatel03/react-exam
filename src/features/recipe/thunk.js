import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchrecipe = createAsyncThunk("recipe/fetchRecipe", async () => {
  const response = await axios.get("http://localhost:3000/recipe");
  return response.data;
});

export const createrecipe = createAsyncThunk(
  "recipe/createRecipe",
  async (recipe) => {
    const response = await axios.post("http://localhost:3000/recipe", recipe);
    return response.data;
  }
);

export const deleterecipe = createAsyncThunk(
  "recipe/deleteRecipe",
  async (id) => {
    await axios.delete(`http://localhost:3000/recipe/${id}`);
    return id;
  }
);
export const editrecipe = createAsyncThunk(
  "recipe/editRecipe",
  async (recipe, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/recipe/${recipe.id}`,
        recipe
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);



