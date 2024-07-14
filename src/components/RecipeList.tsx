import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Recipe {
   id: number;
    title: string;
    ingredients: string[];
    steps: string[];
}

const RecipeList = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/recipes/')
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
      <>
            <div>
                <h1>Recipes</h1>
                <ul>
                    {recipes.map(recipe => (
                        <li key={recipe.id}>
                            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
      </>
    )
}

export default RecipeList