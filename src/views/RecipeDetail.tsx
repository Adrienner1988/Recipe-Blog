import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddComment from "../components/AddComment";

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
  prep: any;
  cook: any;
  serving: any;
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
          `https://recipe-db-0boe.onrender.com/api/recipes/${pk}/`
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
  const ingredientsArray =
    recipe.ingredients.split(/\r?\n/).map((item) => item.trim()) || [];
  const stepsArray =
    recipe.steps.split(/\r?\n/).map((item) => item.trim()) || [];

  return (
    <>
      <h2 className="text-3xl font-bold m-4 text-center text-green uppercase">
        {recipe.title}
      </h2>

      <div className="text-center mt-4">
        <p className="text-lightPlum font-semibold mb-2 sm: p-2">
          Ready to cook up something amazing? Let’s dive into the delicious
          details!
        </p>
      </div>

      {/* Add prep time, cook time, servings, and category across top of the page */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 m-6">
        <div className="text-white p-4 rounded-lg shadow-md text-grayDark">
          <p>
            <strong>Prep Time:</strong> {recipe.prep.time}
          </p>
          <p>
            <strong>Cook Time:</strong> {recipe.cook.time}
          </p>
          <p>
            <strong>Servings:</strong> {recipe.serving.serving}
          </p>
          <p>
            <strong>Category:</strong> {recipe.category.name}
          </p>
        </div>
      </div>

      <div
        id="flexbox-container"
        className="flex flex-col md:flex-row items-center md:items-start gap-8 p-4 m-4"
      >
        {/* Image Div- thinking to the left of the page */}
        <div className="w-full md:w-2/5 h-144 flex-shrink-0 flex md:justify-start md:items-center mt-12 border border-solid">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover shadow-custom-light"
          />
        </div>

        {/* Ingredients and steps- thinking to the right of the page */}
        <div className="flex-grow">
          <h2 className="font-bold text-lg text-lightPlum mb-2">Ingredients</h2>
          <ul className="list-disc p-10 bg-green bg-opacity-10 text-grayDark shadow-custom-light">
            {ingredientsArray
              .filter((ingredient) => ingredient.trim() !== "")
              .map((ingredient, index) => (
                <li key={index} className="ingredients mb-4 font-medium">
                  {ingredient}
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Steps- Full size of page */}
      <div className=" mx-12">
        <h2 className="font-bold text-lg mt-4 mb-2 text-lightPlum">Steps</h2>
        <ol className="list-decimal list-inside font-bold text-grayDark ">
          {stepsArray
            .filter((step) => step.trim() !== "")
            .map((step, index) => (
              <li key={index} className="steps mb-4">
                {step}
              </li>
            ))}
        </ol>
      </div>

      {/* Comment Div- thinking split with the comment form at the bottom of the page*/}
      <div>
        <h2 className="font-bold text-lg mt-4 mb-2 text-lightPlum text-center">
          Comments
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4 p-4">
          <div className="w-full md:w-2/5 flex-shrink-0">
            {recipe.comments && recipe.comments.length > 0 ? (
              recipe.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-4 border-double border-green m-4 p-4 shadow-custom-light overflow-hidden"
                >
                  {comment.text}
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-grayDark">
                No comments yet, be the first to share your thoughts.
              </p>
            )}
          </div>

          {/* Add comment form */}
          <div>
            <AddComment pk={pk} setRecipe={setRecipe} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
