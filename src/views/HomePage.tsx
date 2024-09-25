import CategoryList from "../components/CategoryList";
import { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
  image: string;
}

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://recipe-db-0boe.onrender.com/api/categories/"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
        console.log(data, "Fetched categories:");
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <section>
        <div className="relative w-full h-screen">
          {/* Video Background */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover hidden sm:block"
            preload="metadata"
            autoPlay
            loop
            muted
          >
            <source src="/feast.mp4" type="video/mp4" />
            <source src="/feastResize.mp4" type="video/mp4" />
            <source src="/feastWebm.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-center">
            <h1 className="text-6xl font-bold underline m-0 p-8 max-w-80px text-center text-grayLight">
              Recipe Rainbow
            </h1>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-lightPlum p-8">
          <h2 className="text-3xl font-bold m-0 text-center text-green uppercase">
            About
          </h2>
          <p className="text-lg md:text-xl p-8 text-center text-grayLight">
            Recipe Rainbow is a vibrant and inclusive platform that celebrates
            the diversity of culinary traditions from around the world. It
            allows users to discover new recipes, share their own culinary
            creations, and connect with a community of food enthusiasts. The
            platform is designed to be a colorful and engaging space where every
            dish is a part of a beautiful culinary spectrum.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold p-4 text-lightPlum ">
          Recipe Categories
        </h2>
        <div>
          <CategoryList categories={categories} />
        </div>
      </section>
    </>
  );
};

export default HomePage;
