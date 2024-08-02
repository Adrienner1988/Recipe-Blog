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
    <>
      <div className="flex justify-center items-center py-8">
        <h1 className="text-3xl font-bold p-8 text-lightPlum">Recipes</h1>
      </div>

      {/* Card Container */}
      <div className=" card-container flex justify-center items-center flex-wrap gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card flex justify-center items-center flex-col w-80 h-64 bg-green rounded-3xl cursor-pointer transition duration-500 text-grayDark hover:text-darkPlum hover:h-350px"
          >
            <Link to={`/recipes/${recipe.id}`} state={{ recipe }}>
              <img
                className="img rounded-[15px] object-cover mb-2"
                src={recipe.image}
                alt={recipe.title}
                style={{ width: "200px", height: "200px" }}
              />
              <p>{recipe.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipeList;
