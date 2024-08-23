import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface TimeOption {
  id: number;
  time: string;
}

interface Servings {
  id: number;
  serving: string;
}

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [prep, setPrep] = useState<number>(0);
  const [prepOptions, setPrepOptions] = useState<TimeOption[]>([]);
  const [cook, setCook] = useState<number>(0);
  const [cookOptions, setCookOptions] = useState<TimeOption[]>([]);
  const [servings, setServings] = useState<number>(0);
  const [servingOptions, setServingOptions] = useState<Servings[]>([]);
  const [category, setCategory] = useState<number>(0);
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Log the values before submission
    // console.log("Submitting the following values:");
    // console.log("Title:", title);
    // console.log("Ingredients:", ingredients);
    // console.log("Steps:", steps);
    // console.log("Prep ID:", prep);
    // console.log("Cook ID:", cook);
    // console.log("Servings ID:", servings);
    // console.log("Selected Category ID:", category);
    // console.log("Image:", image);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("prep", String(prep));
    formData.append("cook", String(cook));
    formData.append("servings", String(servings));
    formData.append("category", String(category));
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    if (image) {
      formData.append("image", image);

      
    }
    // Log the FormData object
    console.log("Form Data:", formData);
    
    try {
      const postDataResponse = await fetch(
        "http://127.0.0.1:8000/api/recipes/add/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!postDataResponse.ok) {
        throw new Error("Failed to submit form");
      }
      const result = await postDataResponse.json();
      console.log("Form submitted successfully:", result);
      alert(`Recipe Submitted`);
      navigate("/recipes");
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert(`Form not submitted`);
    }
  };

  // Fetching the catagories, prep, cook, and servings options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const catResponse = await fetch(
          "http://127.0.0.1:8000/api/categories/"
        );
        const catData = await catResponse.json();
        setCategoryOptions(catData);

        const prepResponse = await fetch(
          "http://127.0.0.1:8000/api/prep-options/"
        );
        const prepData = await prepResponse.json();
        setPrepOptions(prepData);

        const cookResponse = await fetch(
          "http://127.0.0.1:8000/api/cook-options/"
        );
        const cookData = await cookResponse.json();
        setCookOptions(cookData);

        const servResponse = await fetch(
          "http://127.0.0.1:8000/api/servings-options/"
        );
        const servData = await servResponse.json();
        setServingOptions(servData);

        console.log(catData, prepData, cookData, servData);
      } catch (error) {
        console.error("Error fetching options", error);
      }
    };

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
              onChange={(event) => setPrep(parseInt(event.target.value))}
              required
            >
              <option value="">Select Prep Time</option>
              {prepOptions.map((prepData) => (
                <option key={prepData.id} value={prepData.id}>
                  {prepData.time}
                </option>
              ))}
            </select>

            {/* Cook time select */}
            <select
              value={cook}
              onChange={(event) => setCook(parseInt(event.target.value))}
              required
            >
              <option value="">Select Cook Time</option>
              {cookOptions.map((cookData) => (
                <option key={cookData.id} value={cookData.id}>
                  {cookData.time}
                </option>
              ))}
            </select>

            {/* Servings select */}
            <select
              value={servings}
              onChange={(event) => setServings(parseInt(event.target.value))}
              required
            >
              <option value="">Select Servings</option>
              {servingOptions.map((servData) => (
                <option key={servData.id} value={servData.id}>
                  {servData.serving}
                </option>
              ))}
            </select>

            {/* Category select */}
            <select
              value={category}
              onChange={(event) => setCategory(parseInt(event.target.value))}
              required
            >
              <option value="">Select Category</option>
              {categoryOptions.map((catData) => (
                <option key={catData.id} value={catData.id}>
                  {catData.name}
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
              placeholder="Steps, add each new step to a new line."
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
