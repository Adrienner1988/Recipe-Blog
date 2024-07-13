import RecipeList from "../components/RecipeList"
import { useEffect, useState } from "react"
import axios from "axios"

const RecipePage = () => {
    const[recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/recipes/')
            .then(response => setRecipes(response.data))
            .catch(error => console.error('Error fetching recipes:', error));
    }, []);
    
    return (
        <>
            <h2>Recipes</h2>
            <div>
               <RecipeList recipes={recipes} />
            </div>
        </>
    )
}

export default RecipePage