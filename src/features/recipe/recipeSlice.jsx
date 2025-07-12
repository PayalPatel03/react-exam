import { createSlice } from "@reduxjs/toolkit";
import { createrecipe, deleterecipe, editrecipe, fetchrecipe } from "./thunk";
const initialState = {
  recipe: [],
  loading: false,
  error: null,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  extraReducers: (builder) => {
    //creating Recipies
    builder.addCase(createrecipe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createrecipe.fulfilled, (state, action) => {
      state.loading = false;
      state.recipe.push(action.payload);
    });
    builder.addCase(createrecipe.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });

    //fetch recipe data
    builder.addCase(fetchrecipe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchrecipe.fulfilled, (state, action) => {
      state.recipe = action.payload;
    });
    builder.addCase(fetchrecipe.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });

    //delete recipe
    builder.addCase(deleterecipe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleterecipe.fulfilled, (state, action) => {
      state.loading = false;
      state.recipe = state.recipe.filter(
        (recipes) => recipes.id !== action.payload
      ); 
    });

    builder.addCase(deleterecipe.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });

    
    // edit recipe
builder.addCase(editrecipe.pending, (state) => {
  state.loading = true;
});
builder.addCase(editrecipe.fulfilled, (state, action) => {
  state.loading = false;
  const index = state.recipe.findIndex(r => r.id === action.payload.id);
  if (index !== -1) {
    state.recipe[index] = action.payload;
  }
});
builder.addCase(editrecipe.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
});

    
  },
});

export default recipeSlice.reducer;
