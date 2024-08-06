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
      <div className="card-container flex justify-center items-center flex-wrap gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card relative w-80 h-64 bg-green rounded-3xl cursor-pointer transition-all duration-500 hover:h-[300px] overflow-hidden"
          >
            <Link
              to={`/recipes/${recipe.id}`}
              state={{ recipe }}
              className="flex flex-col h-full"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  className="rounded-[15px] object-cover transition-transform duration-500 hover:scale-90 shadow-custom-light hover:shadow-custom-dark"
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
              <p className="mt-2 mb-2 text-center text-grayDark hover:text-lightPlum">
                {recipe.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipeList;
