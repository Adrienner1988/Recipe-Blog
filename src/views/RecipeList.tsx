import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  type Query,
  type DocumentData,
} from "firebase/firestore";
import SearchBar from "../components/SearchBar";
import { Recipe, CategoryData } from "../types";
import { motion } from "framer-motion";

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [queries, setQueries] = useState<{
    title?: string;
    ingredients?: string[];
    categoryId?: string;
  }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const location = useLocation();

  // Parse query parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const title = params.get("title") || undefined;
    const categoryId = params.get("category") || undefined;
    const ingredients = params.getAll("ingredients");

    setQueries({
      title,
      categoryId,
      ingredients: ingredients.length > 0 ? ingredients : undefined,
    });
  }, [location.search]);

  // Fetch recipes from Firestore and apply local filters
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let recipeQuery: Query<DocumentData> = collection(db, "recipe");

        if (queries.categoryId) {
          recipeQuery = query(recipeQuery, where("categoryId", "==", queries.categoryId));
        }

        const snapshot = await getDocs(recipeQuery);
        const data: Recipe[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Recipe, "id">),
        }));

        // Local filtering
        let filtered = data;

        if (queries.title) {
          filtered = filtered.filter((r) =>
            r.title.toLowerCase().includes(queries.title!.toLowerCase())
          );
        }

        if (queries.ingredients && queries.ingredients.length > 0) {
          filtered = filtered.filter((r) =>
            queries.ingredients!.some((searchIng) =>
              r.ingredients.some((i) =>
                i.toLowerCase().includes(searchIng.toLowerCase())
              )
            )
          );
        }

        setRecipes(filtered);
        setErrorMessage(
          filtered.length === 0
            ? "No recipes found matching your criteria."
            : null
        );
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setErrorMessage("An error occurred while fetching recipes.");
      }
    };

    fetchRecipes();
  }, [queries]);

  // Fetch categories for the SearchBar
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "categories"));
        const data: CategoryData[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<CategoryData, "id">),
        }));
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (criteria: {
    title?: string;
    ingredients?: string[];
    categoryId?: string;
  }) => {
    setQueries(criteria);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h2>Recipes</h2>
      </div>

      <div className="flex justify-center items-center py-8">
        <SearchBar onSearch={handleSearch} categories={categories} />
      </div>

      {errorMessage && (
        <div className="flex justify-center items-center py-8">
          <p className="text-primary">{errorMessage}</p>
        </div>
      )}

      <div className="card-container flex justify-center items-center flex-wrap gap-6 px-4 pb-24">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="card relative w-64 p-1 bg-secondary rounded-3xl cursor-pointer transition-all duration-500 hover:h-auto overflow-hidden"
          >
            <Link
              to={`/recipes/${recipe.id}`}
              className="flex flex-col h-full justify-center items-center"
            >
              <div className="relative w-full h-48 flex items-center justify-center p-2">
                <img
                  className="rounded-[15px] object-cover transition-transform duration-500 hover:scale-90 shadow-custom-light hover:shadow-custom-dark w-full h-full"
                  src={recipe.image}
                  alt={recipe.title}
                />
              </div>
              <p className="text-center text-sm font-semibold text-lightPlum hover:text-white mt-2 p-1 sm:text-xs md:text-sm lg:text-base min-h-[3rem]">
                {recipe.title}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default RecipeList;
