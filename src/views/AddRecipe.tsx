import { ChangeEvent, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

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
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    prep: 0,
    cook: 0,
    category: 0,
    servings: 0,
    image: "",
  });

  const [prepOptions, setPrepOptions] = useState<TimeOption[]>([]);
  const [servingOptions, setServingOptions] = useState<Servings[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [cookOptions, setCookOptions] = useState<TimeOption[]>([]);

  // Handling the submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log(formData);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/recipes/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target as { name: string; value: string };
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleChange2 = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target as { name: string; value: string };
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: reader.result as string, // Set the Base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  // Fetching the categories, prep, cook, and servings options
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
              name="title"
              id="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />

            {/* Prep time select */}
            <select
              name="prep"
              id="prep-time"
              value={formData.prep}
              onChange={handleChange}
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
              name="cook"
              id="cook-time"
              value={formData.cook}
              onChange={handleChange}
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
              name="servings"
              id="servings"
              value={formData.servings}
              onChange={handleChange}
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
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
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
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange2}
              placeholder="Ingredients, add each new ingredient to a new line."
              required
            />

            {/* Enter steps */}
            <textarea
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={handleChange2}
              placeholder="Steps, add each new step to a new line."
              required
            />

            {/* Upload image */}
            <input
              name="image"
              id="upload"
              type="file"
              onChange={handleImageChange}
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
