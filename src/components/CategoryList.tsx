import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  image: string;
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/categories/");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="category-container">
      {categories.map((category) => (
        <div key={category.id}>
          <Link to={`/categories/${category.id}/recipes/`}>
            <img src={category.image} alt={category.name} />
            <h2>{category.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
