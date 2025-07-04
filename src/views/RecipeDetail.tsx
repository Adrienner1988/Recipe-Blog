import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import AddComment from "../components/AddComment";
import { Recipe, Comment } from "../types";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<(Recipe & { comments: Comment[]; categoryName?: string }) | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!id) {
          console.warn("❌ No PK in route");
          return;
        }

        console.log("🔍 Fetching recipe for ID:", id);
        const docRef = doc(db, "recipe", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.warn("❌ Recipe not found in Firestore");
          setError("Recipe not found");
          return;
        }

        const recipeData = docSnap.data();
        console.log("📦 Recipe data:", recipeData);

        const commentsSnap = await getDocs(collection(docRef, "comments"));
        const comments: Comment[] = commentsSnap.docs.map((commentDoc) => ({
          id: commentDoc.id,
          ...(commentDoc.data() as Omit<Comment, "id">),
        }));

        let categoryName = "";
        if (recipeData.categoryId) {
          const categoryRef = doc(db, "categories", recipeData.categoryId);
          const categorySnap = await getDoc(categoryRef);
          if (categorySnap.exists()) {
            categoryName = categorySnap.data().name;
          }
        }

        setRecipe({
          id: docSnap.id,
          title: recipeData.title,
          image: recipeData.image,
          prep: recipeData.prep,
          cook: recipeData.cook,
          serving: recipeData.serving,
          categoryId: recipeData.categoryId,
          categoryName: categoryName,
          ingredients: recipeData.ingredients,
          steps: recipeData.steps,
          author: recipeData.author,
          createdAt: recipeData.createdAt?.toDate?.() ?? null,
          comments: comments,          
        });
      } catch (err) {
        console.error("❌ Error fetching recipe:", err);
        setError("Error fetching recipe");
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) return <div className="text-center text-red-600 mt-4">{error}</div>;
  if (!recipe) return <div className="text-center text-plum mt-4">Loading...</div>;

  return (
    <>
      <h2 className="text-3xl font-bold m-4 text-center text-green uppercase">
        {recipe.title}
      </h2>

      <div className="text-center mt-4">
        <p className="text-gradient-pink-end font-semibold mb-2 sm:p-2">
          Ready to cook up something amazing? Let’s dive into the delicious details!
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 m-6">
        <div className="text-muted-foreground p-4 rounded-lg shadow-md text-grayDark">
          <p><strong>Prep Time:</strong> {recipe.prep}</p>
          <p><strong>Cook Time:</strong> {recipe.cook}</p>
          <p><strong>Servings:</strong> {recipe.serving}</p>
          <p><strong>Category:</strong> {recipe.categoryName}</p>
          <p><strong>Author:</strong> {recipe.author || "Anonymous"}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-4 m-4">
        <div className="w-full md:w-2/5 h-144 flex-shrink-0 mt-12 border rounded-lg">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover rounded-lg shadow-custom-light"
          />
        </div>

        <div className="flex-grow">
          <h2 className="font-bold text-lg text-plum mt-2 mb-2">Ingredients</h2>
          <ul className="list-disc text-muted-foreground  bg-plum bg-opacity-10 p-10 rounded-lg">
            {recipe.ingredients.map((item, idx) =>
              item.trim() ? (
                <li key={idx} className="mb-4 font-medium">{item}</li>
              ) : null
            )}
          </ul>
        </div>
      </div>

      <div className="mx-12">
        <h2 className="font-bold text-lg mt-4 mb-2 text-plum">Steps</h2>
        <ol className="list-decimal list-inside font-bold text-muted-foreground bg-secondary bg-opacity-10 p-10 rounded-lg">
          {recipe.steps.map((step, idx) =>
            step.trim() ? <li key={idx} className="mb-4">{step}</li> : null
          )}
        </ol>
      </div>

      <div>
        <h2 className="font-bold text-lg mt-4 mb-2 text-plum text-center">
          Comments
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4 p-4">
          <div className="w-full md:w-2/5">
            {recipe.comments.length > 0 ? (
              recipe.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-4 border-accent primary m-4 p-4 shadow-custom-light rounded-lg"
                >
                  {comment.text}
                </div>
              ))
            ) : (
              <p className="text-center text-lg primary">
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
