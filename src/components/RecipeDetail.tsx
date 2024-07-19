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
  comments: Comment[];
}

const RecipeDetail = () => {
  const { pk } = useParams<{ pk: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `http://3.129.64.184:8000/api/recipes/${pk}/`
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
    <div>
      <h1>{recipe.title}</h1>
      <h2>Ingredients</h2>
      <ul>
        {ingredientsArray.map((ingredient, index) => (
          <li key={index} className="ingredients">{ingredient}</li>
        ))}
      </ul>
      <h2>Steps</h2>
      <ol>
        {stepsArray.map((step, index) => (
          <li key={index} className="steps">{step}</li>
        ))}
      </ol>
      <h2>Comments</h2>
      <div>
        {recipe.comments.map((comment) => (
          <div key={comment.id}>{comment.text}</div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetail;
