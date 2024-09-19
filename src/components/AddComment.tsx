import { useState, FormEvent } from "react";

interface Comment {
  text: string;
  recipe: number;
}

interface AddCommentProps {
  pk: any;
  setRecipe: (recipe: any) => void;
}

const AddComment = ({ pk, setRecipe }: AddCommentProps) => {
  const [text, setText] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const commentData: Comment = {
      text,
      recipe: pk,
    };

    console.log(commentData);

    try {
      const addComment = await fetch(
        "http://127.0.0.1:8000/api/recipes/add-comment/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentData),
        }
      );

      if (addComment.ok) {
        setText("");
        const refetchComments = await fetch(
          `http://127.0.0.1:8000/api/recipes/${pk}/`
        );
        const updatedComments = await refetchComments.json();
        setRecipe(updatedComments);
        alert("Thank you for the rating this recipe!");
      } else {
        alert("Rating not submitted, please try again.");
      }
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  return (
    <>
      <div className="bg-lightPlum bg-opacity-5 p-10">
        <h2>Tried this recipe? Leave your comment here!</h2>
        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className=""
        >
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
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
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddComment;
