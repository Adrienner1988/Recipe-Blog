import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Comment {
  id: number;
  text: string;
  created_at: string;
  recipe: number;
}

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  steps: string;
  image: string;
  comments: Comment[];
  prep: string;
  cook: string;
  servings: string;
  category: any;
}

const RecipeDetail = () => {
  const { pk } = useParams<{ pk: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/recipes/${pk}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();
        console.log("Fetched Recipe:", data);
        setRecipe(data);
      } catch (error) {
        setError("Error fetching data");
      }
    };
    fetchRecipe();
  }, [pk]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  // Split the ingredients and steps by commas and new lines to convert them into arrays
  const ingredientsArray = recipe.ingredients
    .split(/\r?\n/)
    .map((item) => item.trim());
  const stepsArray = recipe.steps
  .split(/\r?\n/).map((item) => item.trim());

  return (
    <>
      <h2 className="text-3xl font-bold m-4 text-center text-green uppercase">
        {recipe.title}
      </h2>

      <div className="text-center mt-4">
        <p className="text-lightPlum font-semibold mb-2">
          Ready to cook up something amazing? Let’s dive into the delicious
          details!
        </p>
      </div>

      {/* Add prep time, cook time, servings, and category */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <div className="text-white p-4 rounded-lg shadow-md">
          <p>
            <strong>Prep Time:</strong> {recipe.prep}
          </p>
          <p>
            <strong>Cook Time:</strong> {recipe.cook}
          </p>
          <p>
            <strong>Servings:</strong> {recipe.servings}
          </p>
          <p>
            <strong>Category:</strong> {recipe.category.name}
          </p>
        </div>
      </div>

      <div
        id="flexbox-container"
        className="flex flex-col md:flex-row items-start gap-4 p-4"
      >
        {/* Image Div- thinking to the left of the page */}
        <div className="w-1/3 md:w-2/5 flex-shrink-0">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full shadow-custom-light"
          />
        </div>

        {/* Ingredients Div- thinking to the right of the page */}
        <div className="flex-grow">
          <h2 className="font-bold text-lg text-lightPlum mb-2">Ingredients</h2>
          <ul className="list-none p-0">
            {ingredientsArray.map((ingredient, index) => (
              <li key={index} className="ingredients mb-2 font-medium">
                {ingredient}
              </li>
            ))}
          </ul>
          <h2 className="font-bold text-lg mt-4 mb-2 text-lightPlum">Steps</h2>
          <ol className="list-decimal list-inside font-bold">
            {stepsArray.map((step, index) => (
              <li key={index} className="steps mb-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Commend Div- thinking across the bottom of the page */}
      <div>
        <h2 className="font-bold text-lg mt-4 mb-2 text-lightPlum text-center">
          Comments
        </h2>
        <div>
          {recipe.comments.map((comment) => (
            <div
              key={comment.id}
              className="border-4 border-double border-green m-8 p-6 shadow-custom-light"
            >
              {comment.text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
