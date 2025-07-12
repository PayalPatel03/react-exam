import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleterecipe, editrecipe, fetchrecipe } from "../features/recipe/thunk";
import "./Table.css";  
import { FaBook, FaPen } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";

function Table() {
  const { recipe } = useSelector((state) => state.recipe);
  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState("asc");
  const [filterText, setFilterText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    rname: "", ingridents: "", time: "", instructions: "",
  });

  useEffect(() => {
    dispatch(fetchrecipe());
  }, [dispatch]);

  const handleEditClick = (rec) => {
    setEditingId(rec.id);
    setEditData({
      rname: rec.rname,
      ingridents: rec.ingridents,
      time: rec.time,
      instructions: rec.instructions,
    });
  };

  const handleSave = () => {
    dispatch(editrecipe({ id: editingId, ...editData }));
    setEditingId(null);
    setEditData({ rname: "", ingridents: "", time: "", instructions: "" });
  };

  const sortedFilteredRecipes = [...recipe]
 .filter((r) => {
  const text = filterText.toLowerCase();
  return (
    r.rname.toLowerCase().includes(text) ||
    r.ingridents?.toLowerCase().includes(text)
  );
})
    .sort((a, b) => {
      const nameA = a.rname.toLowerCase();
      const nameB = b.rname.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  return (
    <div className="container table-container mt-5">
      <h2 className="table-heading text-center mb-4"><FaBook />Recipe Management</h2>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <input
          type="text"
          placeholder="Filter by ingredient..."
          className="form-control w-50"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button
          className="btn btn-outline-primary"
          onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
        >
          Sort by Name: {sortOrder === "asc" ? "A-Z 🔼" : "Z-A 🔽"}
        </button>
      </div>

      <div className="table-responsive shadow-lg rounded-3 overflow-hidden">
        <table className="table table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Recipe Name</th>
              <th>Ingredients</th>
              <th>Time (min)</th>
              <th>Instructions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedFilteredRecipes.map((rec, index) => (
              <tr key={rec.id}>
                <td>{index + 1}</td>
                <td>
                  {editingId === rec.id ? (
                    <input
                      value={editData.rname}
                      onChange={(e) =>
                        setEditData({ ...editData, rname: e.target.value })
                      }
                      className="form-control"
                    />
                  ) : (
                    rec.rname
                  )}
                </td>
                <td>
                  {editingId === rec.id ? (
                    <input
                      value={editData.ingridents}
                      onChange={(e) =>
                        setEditData({ ...editData, ingridents: e.target.value })
                      }
                      className="form-control"
                    />
                  ) : (
                    rec.ingridents
                  )}
                </td>
                <td>
                  {editingId === rec.id ? (
                    <input
                      value={editData.time}
                      onChange={(e) =>
                        setEditData({ ...editData, time: e.target.value })
                      }
                      className="form-control"
                    />
                  ) : (
                    rec.time
                  )}
                </td>
                <td>
                  {editingId === rec.id ? (
                    <input
                      value={editData.instructions}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          instructions: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  ) : (
                    rec.instructions
                  )}
                </td>
                <td>
                  {editingId === rec.id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="btn btn-success btn-sm me-1"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn btn-secondary btn-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => dispatch(deleterecipe(rec.id))}
                        className="btn btn-danger btn-sm me-1"
                      >
                      <IoTrashBinSharp />
                      </button>
                      <button
                        onClick={() => handleEditClick(rec)}
                        className="btn btn-warning btn-sm"
                      >
                        <FaPen />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {sortedFilteredRecipes.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No recipes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
