import { CategoryData } from "../types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ id, name, image }: CategoryData) => {
  const navigate = useNavigate();

  const handleClick = () => {
    toast.info(`Getting recipes for ${name}"...`, {
      autoClose: 1500,
    });

    setTimeout(() => {
      navigate(`/recipes?category=${id}`);
    }, 1200);
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-full overflow-hidden shadow-lg cursor-pointer"
    >
      <Link
        to={`/recipes?category=${id}`}
        className="group block h-36 w-36 rounded-full overflow-hidden relative transform transition-transform duration-300 hover:scale-105"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:opacity-80 transition duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
          <h3 className="text-white text-lg font-semibold text-center px-2">
            {name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
