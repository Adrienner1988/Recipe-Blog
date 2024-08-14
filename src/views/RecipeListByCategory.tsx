// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// interface Recipe {
//   id: number;
//   title: string;
//   image: string;
// }

const RecipeListByCategory = () => {
//   const { category_id } = useParams<{ category_id: string }>();
//   const [recipes, setRecipes] = useState<Recipe[]>([]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/categories/${category_id}/recipes/`
//       );
//       const data = await response.json();
//       setRecipes(data);
//     };
//     fetchRecipes();
//   }, [category_id]);

//   return (
//     <div className="recipe-container">
//       {recipes.map((recipe) => (
//         <div key={recipe.id}>
//           <img src={recipe.image} alt={recipe.title} />
//           <h2>{recipe.title}</h2>
//         </div>
//       ))}
//     </div>
//   );
};

export default RecipeListByCategory;
