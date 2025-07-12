import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createrecipe } from "../features/recipe/thunk";
import { IoFastFood } from "react-icons/io5";

function Form() {
  const [recipes, setRecipes] = useState({
    rname: "",
    ingridents: "",
    time: "",
    instructions: ""
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipes({ ...recipes, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createrecipe(recipes));
    setRecipes({ rname: "", ingridents: "", time: "", instructions: "" });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body">
              <h3 className="card-title text-center text-primary mb-4"><IoFastFood /> Add a New Recipe</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="rname" className="form-label">Recipe Name</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={recipes.rname}
                    name="rname"
                    className="form-control"
                    id="rname"
                    placeholder="E.g., Paneer Butter Masala"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ingridents" className="form-label">Ingredients</label>
                  <input
                    onChange={handleChange}
                    name="ingridents"
                    value={recipes.ingridents}
                    type="text"
                    className="form-control"
                    id="ingridents"
                    placeholder="E.g., Paneer, butter, spices..."
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">Time Taken (in mins)</label>
                  <input
                    onChange={handleChange}
                    name="time"
                    value={recipes.time}
                    type="number"
                    className="form-control"
                    id="time"
                    min="1"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="instructions" className="form-label">Instructions</label>
                  <textarea
                    onChange={handleChange}
                    name="instructions"
                    value={recipes.instructions}
                    className="form-control"
                    id="instructions"
                    rows="3"
                    placeholder="Step-by-step instructions..."
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-info w-100">Add Recipe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
