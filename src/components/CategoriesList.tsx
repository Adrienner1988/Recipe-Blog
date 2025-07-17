import { CategoryData } from "../types";
import CategoryCard from "./CategoryCard";
import { motion } from "framer-motion";

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
    <motion.section
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl font-bold text-center text-primary mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Browse by Category
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8 px-2 sm:px-6 md:px-10 place-items-center"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.1 }}
        viewport={{ once: true }}
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default CategoriesList;
