import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav.tsx";
import './index.css';
import Footer from "./components/Footer.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense} from "react";
import LoadingSpinner from "./components/LoadingSpinner.tsx";
// Lazy-loaded views
const HomePage = lazy(() => import("./views/HomePage"));
const RecipeList = lazy(() => import("./views/RecipeList"));
const RecipeDetail = lazy(() => import("./views/RecipeDetail"));
const AddRecipe = lazy(() => import("./views/AddRecipe"));



function App() {

  return (
    <>
      <Nav />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipe />} />
      </Routes>
      </Suspense>
      <Footer />
      <ToastContainer position="top-center" autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss={false}
        />
    </>
  );
}

export default App;
