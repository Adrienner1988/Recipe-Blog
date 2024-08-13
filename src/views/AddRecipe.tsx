import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    if (image) formData.append("image", image);

    try {
      await fetch("http://127.0.0.1:8000/api/recipes/", {
        method: "POST",
        body: formData,
      });
      console.log("formData Submitted");
      alert(`Recipe Submitted`);
      navigate("/recipes/");
    } catch (error) {
      console.error("Error submitting recipe", error);
    }
  };

  return (
    <>
      <div>
        <h2>Add Recipe</h2>
      </div>

      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            required
            className="border-2 border-solid border-darkPlum transition-all duration-500 hover:border-green rounded-xl w-full p-2 mb-2"
          />
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ingredients"
            required
            className="border-2 border-solid border-darkPlum transition-all duration-500 hover:border-green rounded-xl w-full p-2 mb-2"
          />
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Steps"
            required
            className="border-2 border-solid border-darkPlum transition-all duration-500 hover:border-green rounded-xl w-full p-2 mb-2"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
            className="border-2 border-solid border-darkPlum transition-all duration-500 hover:border-green rounded-xl w-full p-2 mb-2"
          />
          <button
            type="submit"
            className="border-none bg-darkPlum rounded-xl p-2 uppercase text-green transition-all duration-500 hover:text-grayLight cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
