import { Link } from 'react-router-dom';

const RecipeList = ({ recipes }) => {
    return (
        <div>
            <h2>Recipes</h2>
            <h2>Recipes</h2>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;