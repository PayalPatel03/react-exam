import { configureStore }  from "@reduxjs/toolkit";
import recipeReducer from '../features/recipe/recipeSlice'

export const store=configureStore({
    reducer:{
        recipe:recipeReducer,
    }
})