import { CategoryData } from '../types';
import { Link } from 'react-router-dom';

const CategoryCard = ({ id, name, image }: CategoryData) => (
    <Link
        to={`/recipes?category=${id}`}
        className="group mx-auto h-36 w-36 rounded-full overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 bg-white"
    >
        <img
            src={image}
            alt={name}
            className="w-full h-40 object-cover group-hover:opacity-80 transition duration-300"
        />
        <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-darkPlum group-hover:text-primary transition">
                {name}
            </h3>
        </div>
    </Link>
);

export default CategoryCard;
  