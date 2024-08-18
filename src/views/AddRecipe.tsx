import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface TimeOption {
  id: number;
  value: string;
}

interface Servings {
  id: number;
  size: string;
}

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [prep, setPrep] = useState<number>(0);
  const [prepOptions, setPrepOptions] = useState<TimeOption[]>([]);
  const [cook, setCook] = useState<number>(0);
  const [cookOptions, setCookOptions] = useState<TimeOption[]>([]);
  const [servings, setServings] = useState<number>(0);
  const [servingOptions, setServingOptions] = useState<Servings[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    formData.append("prep", String(prep));
    formData.append("cook", String(cook));
    formData.append("servings", String(servings));
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

  // Fetching the catagories, pre, cook, and servings options
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories/");
        const data = await response.json();
        setCategories(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching Categories", error);
      }
    };

    const fetchOptions = async () => {
      try {
        const prepResponse = await fetch(
          "http://127.0.0.1:8000/api/prep-options/"
        );
        const prepData = await prepResponse.json();
        setPrepOptions(prepData);

        const cookResponse = await fetch(
          "http://127.0.0.1:8000/api/cook-options/"
        );
        const cookData = await cookResponse.json();
        setCookOptions(prepData);

        const servingResponse = await fetch(
          "http://127.0.0.1:8000/api/servings-options/"
        );
        const servingData = await servingResponse.json();
        setServingOptions(servingData);

        console.log(prepData, cookData, servingData);
      } catch (error) {
        console.error("Error fetching options", error);
      }
    };

    fetchCategories();
    fetchOptions();
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
            {/* Enter recipe title */}
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Title"
              required
            />

            {/* Pre time select */}
            <select
              value={prep}
              onChange={(event) => setPrep(Number(event.target.value))}
              required
            >
              <option value="">Select Prep Time</option>
              {prepOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              ))}
            </select>

            {/* Cook time select */}
            <select
              value={cook}
              onChange={(event) => setCook(Number(event.target.value))}
              required
            >
              <option value="">Select Cook Time</option>
              {cookOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              ))}
            </select>

            {/* Servings select */}
            <select
              value={servings}
              onChange={(event) => setServings(Number(event.target.value))}
              required
            >
              <option>Select Servings</option>
              {servingOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.size}
                </option>
              ))}
            </select>

            {/* Category select */}
            <select
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(parseInt(event.target.value))
              }
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Enter ingredients */}
            <textarea
              value={ingredients}
              onChange={(event) => setIngredients(event.target.value)}
              placeholder="Ingredients, add each new ingredient to a new line."
              required
            />

            {/* Enter steps */}
            <textarea
              value={steps}
              onChange={(event) => setSteps(event.target.value)}
              placeholder="Steps, add one empty line between each new step."
              required
            />

            {/* Upload image */}
            <input
              type="file"
              onChange={(event) => setImage(event.target.files?.[0] || null)}
              required
            />

            {/* Submit button */}
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
