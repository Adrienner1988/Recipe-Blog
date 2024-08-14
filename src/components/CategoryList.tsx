import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategoriesListProps {
  categories: Category[];
}

const CategoriesList: React.FC<CategoriesListProps> = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category: any) => (
        <Link
          key={category.id}
          to={`/recipes?category=${category.id}`}
          className="category-card"
        >
          <img src={category.image} alt={category.name} />
          <h3>{category.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesList;
