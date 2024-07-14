import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Recipe {
    id: number;
    title: string;
    ingredients: string[];
    steps: string[];
}

// interface RecipeDetailProps {
//     id: number;
// }

const RecipeDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);


    useEffect(() => {
        if (id) {
            fetch(`http://127.0.0.1:8000/api/recipes/${id}/`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                }) 
                .then(data => {
                    console.log('Fetched Recipe:', data);
                    setRecipe(data);
                })
                .catch(error => console.error('Error fetching data:', error));        }
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <h1>{recipe.title}</h1>
                <h3>Ingredients</h3>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <h3>Steps</h3>
                <ol>
                    {recipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
        </>
    )
}

export default RecipeDetail