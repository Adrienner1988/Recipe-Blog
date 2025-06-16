import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import AddComment from "../components/AddComment";
import { Recipe, Comment } from "../types";

const RecipeDetail = () => {
  const { pk } = useParams<{ pk: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!pk) return;

        const docRef = doc(db, "recipes", pk);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("Recipe not found");
          return;
        }

        const recipeData = docSnap.data();

        const commentsSnap = await getDocs(collection(docRef, "comments"));
        const comments: Comment[] = commentsSnap.docs.map((commentDoc) => ({
          id: commentDoc.id,
          ...(commentDoc.data() as Omit<Comment, "id">),
        }));

        setRecipe({
          id: docSnap.id,
          title: recipeData.title,
          image: recipeData.image,
          ingredients: recipeData.ingredients,
          steps: recipeData.steps,
          prep: recipeData.prep,
          cook: recipeData.cook,
          serving: recipeData.serving,
          category: recipeData.category,
          comments,
        });
        
      } catch (err) {
        console.error(err);
        setError("Error fetching recipe");
      }
    };

    fetchRecipe();
  }, [pk]);

  if (error) return <div>{error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <>
      <h2 className="text-3xl font-bold m-4 text-center text-green uppercase">
        {recipe.title}
      </h2>

      <div className="text-center mt-4">
        <p className="text-lightPlum font-semibold mb-2 sm:p-2">
          Ready to cook up something amazing? Let’s dive into the delicious details!
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 m-6">
        <div className="text-white p-4 rounded-lg shadow-md text-grayDark">
          <p><strong>Prep Time:</strong> {recipe.prep?.time}</p>
          <p><strong>Cook Time:</strong> {recipe.cook?.time}</p>
          <p><strong>Servings:</strong> {recipe.serving?.serving}</p>
          <p><strong>Category:</strong> {recipe.category?.name}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-4 m-4">
        <div className="w-full md:w-2/5 h-144 flex-shrink-0 mt-12 border">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover shadow-custom-light"
          />
        </div>

        <div className="flex-grow">
          <h2 className="font-bold text-lg text-lightPlum mb-2">Ingredients</h2>
          <ul className="list-disc p-10 bg-green bg-opacity-10 text-grayDark shadow-custom-light">
            {recipe.ingredients.map((item, idx) =>
              item.trim() ? (
                <li key={idx} className="mb-4 font-medium">{item}</li>
              ) : null
            )}
          </ul>
        </div>
      </div>

      <div className="mx-12">
        <h2 className="font-bold text-lg mt-4 mb-2 text-lightPlum">Steps</h2>
        <ol className="list-decimal list-inside font-bold text-grayDark">
          {recipe.steps.map((step, idx) =>
            step.trim() ? <li key={idx} className="mb-4">{step}</li> : null
          )}
        </ol>
      </div>

      <div>
        <h2 className="font-bold text-lg mt-4 mb-2 text-lightPlum text-center">
          Comments
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4 p-4">
          <div className="w-full md:w-2/5">
            {recipe.comments.length > 0 ? (
              recipe.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-4 border-double border-green m-4 p-4 shadow-custom-light"
                >
                  {comment.text}
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-grayDark">
                No comments yet, be the first to share your thoughts.
              </p>
            )}
          </div>

          <div>
            <AddComment id={recipe.id} setRecipe={setRecipe} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
