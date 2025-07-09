import { Route, Routes } from "react-router-dom";
import HomePage from "./views/HomePage.tsx";
import RecipeList from "./views/RecipeList.tsx";
import RecipeDetail from "./views/RecipeDetail.tsx";
import Nav from "./components/Nav.tsx";
import './index.css';
import AddRecipe from "./views/AddRecipe.tsx";
import Footer from "./components/Footer.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
    <>
      <Nav />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipe />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
