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
    <>
      <div className="text-center m-4">
        <p className="text-darkPlum font-semibold">
          Explore your next culinary adventure! Click a category to discover
          mouth-watering recipes.
        </p>
      </div>

      <div className=" flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4 px-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/recipes?category=${category.id}`}
              className="relative w-32 h-32 rounded-full overflow-hidden shadow-custom-light transition-transform duration-300 hover:scale-105 group hover:shadow-custom-dark"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-gray text-lg font-semibold group-hover:text-lightPlum transition-colors duration-300 uppercase">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesList;
