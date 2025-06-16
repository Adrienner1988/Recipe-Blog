import { CategoryData } from "../types";
import CategoryCard from "./CategoryCard";

interface CategoriesListProps {
  categories: CategoryData[];
}

const CategoriesList: React.FC<CategoriesListProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center m-4">
        <p className="text-darkPlum font-semibold">
          No categories available at the moment. Please check back later!
        </p>
      </div>
    );
  }

  return (
    <section id="categories" className="container py-20">
      <h2 className="text-3xl font-bold text-center mb-4 font-serif">Recipe Categories</h2>
      <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            image={category.image}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoriesList;
