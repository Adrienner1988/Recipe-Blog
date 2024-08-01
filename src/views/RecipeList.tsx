import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  steps: string[];
  image: string;
}

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/recipes/");
        const data = await response.json();
        setRecipes(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} className="recipes-list">
            <Link to={`/recipes/${recipe.id}`} state={{ recipe }}>
              <div>
                <img src={recipe.image} alt={recipe.title} style={{ width: "100px", height: "100px" }} />
                <p>{recipe.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
