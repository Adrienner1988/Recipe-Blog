import { useEffect, useState } from 'react'
import axios from 'axios'

const RecipeDetail = ({ match }) => {
    const [recipe, setRecipe] = useState(null);
    const { id } = match.params;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipes/${id}/`)
            .then(response => setRecipe(response.data))
            .catch(error => console.error('Error fetching recipe', error));
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <>
            <div>
                <h2>{recipe}</h2>
                <h3>Ingredients</h3>
                <p>{recipe}</p>
            </div>
        </>
    )
}

export default RecipeDetail