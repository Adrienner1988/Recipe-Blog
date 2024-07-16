import { useLocation } from "react-router-dom";


const RecipeDetail = () => {
  const location = useLocation();
  const { recipe } = location.state || {};

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient: string[], index:any) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Steps</h3>
      <ol>
        {recipe.steps.map((step: string[], index:any) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
