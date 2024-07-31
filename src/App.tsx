import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./views/HomePage.tsx";
import RecipeList from "./views/RecipeList.tsx";
import RecipeDetail from "./views/RecipeDetail.tsx";
import Nav from "./components/Nav.tsx";
import './index.css';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:pk" element={<RecipeDetail />} />
      </Routes>
    </>
  );
}

export default App;
