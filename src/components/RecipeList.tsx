import { useEffect, useState } from 'react';

const RecipeList = () => {
    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/recipe')
            .then(response => response.json())
            .then(data => setRecipe(data));
    }, []);

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipe.map(recipe => (
                    <li key={recipe.id}>{recipe.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;