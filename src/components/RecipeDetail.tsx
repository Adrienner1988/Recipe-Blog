import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/recipe/${id}/`)
            .then(response => response.json())
            .then(data => setRecipe(data));
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <>
        <div>
            <h1>{recipe.title}</h1>
            <h3>Ingredients</h3>
            <p>{recipe.ingredients}</p>
            <h3>Steps</h3>
            <p>{recipe.steps}</p>
        </div>
        </>
    )
}

export default RecipeDetail