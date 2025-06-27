import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import SearchBar from "../components/SearchBar";
import About from "../components/About";
import CategoryListContainer from "../components/CategoryListContainer";
import { CategoryData } from "../types";

const HomePage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryData[]>([]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catSnap = await getDocs(collection(db, "categories"));
        const catData = catSnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<CategoryData, "id">),
        }));
        setCategories(catData);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Search handler receives values from <SearchBar />
  const handleSearch = (queries: {
    title?: string;
    ingredients?: string[];
    category?: string;
  }) => {
    const params = new URLSearchParams();

    if (queries.title) params.append("title", queries.title);
    if (queries.category) params.append("category", queries.category);
    if (queries.ingredients) {
      queries.ingredients.forEach((ing) => params.append("ingredients", ing));
    }

    navigate(`/recipes?${params.toString()}`);
  };

  return (
    <>
      {/* HERO Section */}
      <section className="container mx-auto grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
        <div className="text-center lg:text-left space-y-6">
          <main className="text-5xl md:text-6xl font-bold font-serif">
            <h1 className="inline">
              <span className="inline text-secondary text-transparent bg-clip-text">
                Discover
              </span>{" "}
              a world of flavors
            </h1>
          </main>
          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Explore thousands of recipes from around the globe. Your next
            favorite dish is just a search away.
          </p>

          <div className="relative flex flex-col sm:flex-row sm:space-x-4 justify-center lg:justify-start">
            <div className="relative w-full sm:w-auto">
              <SearchBar onSearch={handleSearch} categories={categories} />
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2960&auto=format&fit=crop"
            alt="A vibrant salad in a bowl"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* About & Categories */}
      <section>
        <About />
        <CategoryListContainer />
      </section>
    </>
  );
};

export default HomePage;
