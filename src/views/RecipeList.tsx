import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  steps: string[];
  image?: string;
  category: Category;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [queries, setQueries] = useState<{
    title?: string;
    ingredient?: string;
    category?: string;
  }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Fetching recipes based on queries
    const getData = async () => {
      try {
        const queryString = Object.entries(queries)
          .filter(([_, value]) => value) // Only include non-empty values
          .map(([key, value]) => `${key}=${encodeURIComponent(value || "")}`)
          .join("&");

        const response = await fetch(
          `https://recipe-db-0boe.onrender.com/api/recipes/search?${queryString}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data);
        console.log(data, "Recipe ingredient fetch:");
        // Check if the returned data is empty and set an error message if it is
        if (data.length === 0) {
          setErrorMessage("No recipes found matching your criteria.");
        } else {
          setErrorMessage(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("An error occurred while fetching recipes.");
      }
    };

    getData();
  }, [queries]);

  // Fetching recipes based on categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://recipe-db-0boe.onrender.com/api/categories/"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
        console.log(data, "Recipe category fetch:");
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Update queries when location changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    setQueries((prevQueries) => ({
      ...prevQueries,
      category: category || undefined,
    }));
  }, [location.search]);

  // Handle Search logic
  const handleSearch = (searchCriteria: {
    title?: string;
    ingredient?: string;
    category?: string;
  }) => {
    setQueries(searchCriteria);
  };

  return (
    <>
      {/* Title of the page container */}
      <div className="flex justify-center items-center">
        <h2>Recipes</h2>
      </div>

      {/* Search bar container */}
      <div className="flex justify-center items-center py-8">
        <SearchBar onSearch={handleSearch} categories={categories} />
      </div>

      {/* Error message container */}
      {errorMessage && (
        <div className="flex justify-center items-center py-8">
          <p className="text-grayDark">{errorMessage}</p>
          <div className="recipes-container">
            {recipes.map((recipe) => (
              <div key={recipe.id}>
                <img src={recipe.image} alt={recipe.title} />
                <h2>{recipe.title}</h2>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Card Container */}
      <div className="card-container flex justify-center items-center flex-wrap gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card relative w-64 h-auto p-1 bg-green rounded-3xl cursor-pointer transition-all duration-500 hover:h-auto overflow-hidden"
          >
            <Link
              to={`/recipes/${recipe.id}`}
              state={{ recipe }}
              className="flex flex-col h-full justify-center items-center"
            >
              {/* Recipe Image */}
              <div className="relative w-full h-48 flex items-center justify-center p-2">
                <img
                  className="rounded-[15px] object-cover transition-transform duration-500 hover:scale-90 shadow-custom-light hover:shadow-custom-dark w-full h-full"
                  src={`https://recipe-db-0boe.onrender.com${recipe.image}`}
                  alt={recipe.title}
                />
              </div>

              {/* Recipe Title */}
              <p className="text-center text-sm font-semibold text-grayDark hover:text-lightPlum mt-2 p-1 sm:text-xs md:text-sm lg:text-base">
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
