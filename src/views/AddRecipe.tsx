import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [prep, setPrep] = useState("");
  const [cook, setCook] = useState("");
  const [servings, setServings] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    formData.append("prep", prep);
    formData.append("cook", cook);
    formData.append("servings", servings);
    if (selectedCategory)
      formData.append("categories", String(selectedCategory));
    if (image) formData.append("image", image);

    try {
      await fetch("http://127.0.0.1:8000/api/recipes/", {
        method: "POST",
        body: formData,
      });
      console.log("formData Submitted");
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      alert(`Recipe Submitted`);
      navigate("/recipes/");
    } catch (error) {
      console.error("Error submitting recipe", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories/");
        const data = await response.json();
        setCategories(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching Categories, error");
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <div className="bg-grayLight"></div>
      <div>
        <h2>Add Your Recipe</h2>
      </div>

      <div className="text-center m-4">
        <p className="text-darkPlum font-semibold">
          Thank you for contributing to our community! Your recipe helps make
          this place more delicious.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <form
            onSubmit={handleSubmit}
            className="bg-green p-6 rounded-lg shadow-custom-dark"
          >
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Title"
              required
            />
            <input
              type="text"
              value={prep}
              onChange={(event) => setPrep(event.target.value)}
              placeholder="Prep Time"
              required
            />
            <input
              type="text"
              value={cook}
              onChange={(event) => setCook(event.target.value)}
              placeholder="Cook Time"
              required
            />
            <input
              type="text"
              value={servings}
              onChange={(event) => setServings(event.target.value)}
              placeholder="Servings"
              required
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Ingredients, add each new ingredient to a new line."
              required
            />
            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              placeholder="Steps, add one empty line between each new step."
              required
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              required
            />
            <button
              type="submit"
              className="border-none bg-darkPlum rounded-xl p-2 uppercase text-green transition-all duration-500 hover:text-grayLight cursor-pointer"
            >
              Share the YUM!
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
