import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  steps: string[];
  image?: string;
}

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [queries, setQueries] = useState<{
    title?: string;
    ingredient?: string;
  }>({});
  

  useEffect(() => {
    const getData = async () => {
      try {
        const queryString = Object.entries(queries)
          .filter(([_, value]) => value) // Only include non-empty values
          .map(([key, value]) => `${key}=${encodeURIComponent(value || "")}`)
          .join("&");

        const response = await fetch(
          `http://127.0.0.1:8000/api/recipes/search?${queryString}`
        );
        const data = await response.json();
        setRecipes(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [queries]);

  const handleSearch = (searchCriteria: {
    title?: string;
    ingredient?: string;
  }) => {
    setQueries(searchCriteria);
    console.log("Search Clicked", searchCriteria);
  };

  return (
    <>
      {/* Title of the page container */}
      <div className="flex justify-center items-center py-8">
        <h1 className="text-3xl font-bold p-8 text-lightPlum">Recipes</h1>
      </div>

      {/* Search bar container */}
      <div className="flex justify-center items-center py-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Card Container */}
      <div className="card-container flex justify-center items-center flex-wrap gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card relative w-96 h-64 bg-green rounded-3xl cursor-pointer transition-all duration-500 hover:h-[300px] overflow-hidden"
          >
            <Link
              to={`/recipes/${recipe.id}`}
              state={{ recipe }}
              className="flex flex-col h-full"
            >
              {" "}
              <p className="mt-2 mb-2 text-center  text-sm font-semibold text-grayDark hover:text-lightPlum">
                {recipe.title}
              </p>
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  className="rounded-[15px] object-cover transition-transform duration-500 hover:scale-90 shadow-custom-light hover:shadow-custom-dark"
                  src={`http://127.0.0.1:8000${recipe.image}`}
                  alt={recipe.title}
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipeList;
