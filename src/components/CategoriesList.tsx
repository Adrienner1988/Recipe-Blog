import { CategoryData } from "../types";
import CategoryCard from "./CategoryCard";

interface CategoriesListProps {
  categories: CategoryData[];
}

const CategoriesList: React.FC<CategoriesListProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center m-4">
        <p className="text-muted-foreground font-semibold">
          No categories available at the moment. Please check back later!
        </p>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Browse by Category
      </h2>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 place-items-center">
        {categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesList;
