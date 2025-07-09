import { useState, FormEvent } from "react";
import { collection, addDoc, Timestamp, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Recipe, Comment } from "../types";
import Button from "./Button";
import { toast } from "react-toastify";

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
      setText("");
      toast.success("🎉 Thanks for rating this recipe!");
      console.log("Comment submitted successfully");
    } catch (error) {
      toast.error("🚫 Rating not submitted. Please try again.");
      console.error("Error submitting comment:", error);
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
        <Button
          type="submit"
        >
          Share Your Thoughts!
        </Button>
      </form>
    </div>
  );
};

export default AddComment;
