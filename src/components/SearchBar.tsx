import { useState } from "react";

const SearchBar = ({
  onSearch,
}: {
  onSearch: (queries: Record<string, string>) => void;
}) => {
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  //   const [category, setCategory] = useState("");

  const handleSearch = () => {
    const queries = { title, ingredient };
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
      {/* <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Search by category..."
      /> */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
