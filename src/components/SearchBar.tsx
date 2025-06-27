import { useState } from "react";
import { CategoryData } from "../types"; 
import Button from "./Button";

interface SearchBarProps {
  onSearch: (queries: {
    title?: string;
    ingredients?: string[];
    category?: string;
  }) => void;
  categories: CategoryData[];
}


const SearchBar: React.FC<SearchBarProps> = ({ onSearch, categories }) => {
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    const ingredientsArray = ingredient
      .split(",")
      .map((ing) => ing.trim())
      .filter(Boolean); // remove empty strings

    onSearch({
      title,
      category,
      ingredients: ingredientsArray.length ? ingredientsArray : undefined,
    });
  };
  

  return (
    <div className="mb-8 sm: p-4 cursor-text">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Search by title..."
        className="border-2 border-solid border-accent transition-all duration-500 hover:border-muted rounded-xl p-2 mr-2"
      />
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="Search by ingredient(s), separate ingredients with commas"
        className="border-2 border-solid border-secondary transition-all duration-500 hover:border-muted rounded-xl p-2 mr-2"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border-2 border-solid border-primary transition-all duration-500 hover:border-muted rounded-xl p-2 mr-2"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <Button type="button" onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchBar;
