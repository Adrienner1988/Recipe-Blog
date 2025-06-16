import { Route, Routes } from "react-router-dom";
import HomePage from "./views/HomePage.tsx";
import RecipeList from "./views/RecipeList.tsx";
import RecipeDetail from "./views/RecipeDetail.tsx";
import Nav from "./components/Nav.tsx";
import './index.css';
import AddRecipe from "./views/AddRecipe.tsx";
import Footer from "./components/Footer.tsx";


import { useEffect } from "react";
// import { seedCategories, seedRecipes } from "./data/seedFirestore";


function App() {

  useEffect(() => {
    // Run these ONCE then comment them out
    // seedCategories();
    // seedRecipes();
  }, []);

  return (
    <>
      <Nav />
      <p>Seeding categories and recipes... check Firestore!</p>;
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:pk" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipe />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
