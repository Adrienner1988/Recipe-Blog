import { useState, FormEvent } from "react";
import { collection, addDoc, Timestamp, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Recipe , Comment } from "../types";

interface AddCommentProps {
  id: string;
  setRecipe: React.Dispatch<React.SetStateAction<(Recipe & { comments: Comment[]; categoryName?: string }) | null>>;
}

const AddComment = ({ id, setRecipe }: AddCommentProps) => {
  const [text, setText] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!text.trim()) return;

    try {
      const recipeRef = doc(db, "recipe", id);
      const commentRef = collection(recipeRef, "comments");

      await addDoc(commentRef, {
        text,
        created_at: Timestamp.now(),
      });

      setText("");

      // Re-fetch recipe and comments
      const recipeSnap = await getDoc(recipeRef);
      const commentSnap = await getDocs(commentRef);

      const recipeData = recipeSnap.data();
      const comments = commentSnap.docs.map((doc) => ({
        ...(doc.data() as Comment),
      }));

      if (recipeData) {
        setRecipe({
          id,
          title: recipeData.title,
          image: recipeData.image,
          prep: recipeData.prep,
          cook: recipeData.cook,
          serving: recipeData.serving,
          categoryId: recipeData.categoryId,
          categoryName: recipeData.categoryName,
          ingredients: recipeData.ingredients,
          steps: recipeData.steps,
          author: recipeData.author,
          createdAt: recipeData.createdAt?.toDate?.() ?? null,
          comments: comments, 
        });
      }
      
      
      

      alert("Thank you for the rating this recipe!");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Rating not submitted, please try again.");
    }
  };

  return (
    <div className="bg-lightPlum bg-opacity-5 p-10 shadow-custom-light">
      <h2>Tried this recipe? Leave your comment here!</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="comment-text"
          id="comment-text"
          placeholder="Let everyone know your thoughts about this recipe ✨"
          required
        ></textarea>
        <button
          type="submit"
          name="sub-btn"
          id="sub-btn"
          className="border-none bg-darkPlum rounded-xl p-2 uppercase text-green transition-all duration-500 hover:text-grayLight cursor-pointer"
        >
          Share Your Thoughts!
        </button>
      </form>
    </div>
  );
};

export default AddComment;
