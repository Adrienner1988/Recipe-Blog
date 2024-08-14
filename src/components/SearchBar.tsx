import { useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface SearchBarProps {
  onSearch: (queries: {
    title?: string;
    ingredient?: string;
    category?: string;
  }) => void;
  categories: Category[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, categories }) => {
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    const queries = { title, ingredient, category };
    onSearch(queries);
    console.log("Search Clicked");
  };

  return (
    <div className="mb-8 cursor-text">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Search by title..."
        className="border-2 border-solid border-darkPlum transition-all duration-500 hover:border-green rounded-xl p-2 mr-2"
      />
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="Search by ingredient..."
        className="border-2 border-solid border-darkPlum transition-all duration-500 hover:border-green rounded-xl p-2 mr-2"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border-2 border-solid border-darkPlum transition-all duration-500 hover:border-green rounded-xl p-2 mr-2"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
